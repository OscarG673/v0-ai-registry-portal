import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedAdmin } from '@/lib/auth'
import { getSubmissionById, approveSubmission, rejectSubmission } from '@/lib/db'
import { sendApprovalNotification, sendRejectionNotification } from '@/lib/email'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAuthenticatedAdmin()
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { action, reason } = await request.json()
    const { id } = await params
    const submissionId = parseInt(id)

    if (!submissionId || isNaN(submissionId)) {
      return NextResponse.json(
        { error: 'Invalid submission ID' },
        { status: 400 }
      )
    }

    const submission = await getSubmissionById(submissionId)
    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      )
    }

    if (action === 'approve') {
      const result = await approveSubmission(submissionId, admin.id)
      await sendApprovalNotification(
        submission.submitter_name,
        submission.submitter_email,
        submission.model_name
      )
      return NextResponse.json(
        { success: true, submission: result.submission, model: result.model },
        { status: 200 }
      )
    } else if (action === 'reject') {
      if (!reason) {
        return NextResponse.json(
          { error: 'Rejection reason is required' },
          { status: 400 }
        )
      }

      const updatedSubmission = await rejectSubmission(submissionId, admin.id, reason)
      await sendRejectionNotification(
        submission.submitter_name,
        submission.submitter_email,
        submission.model_name,
        reason
      )
      return NextResponse.json(
        { success: true, submission: updatedSubmission },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Review error:', error)
    return NextResponse.json(
      { error: 'Failed to process review' },
      { status: 500 }
    )
  }
}
