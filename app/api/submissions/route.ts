import { NextRequest, NextResponse } from 'next/server'
import { createSubmission } from '@/lib/db'
import { sendSubmissionConfirmation } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const {
      submitter_name,
      submitter_email,
      model_name,
      model_description,
      category,
      license_type,
      source_url,
      documentation_url,
      capabilities,
      additional_info,
    } = data

    // Validation
    if (!submitter_name || !submitter_email || !model_name) {
      return NextResponse.json(
        { error: 'Name, email, and model name are required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(submitter_email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const submission = await createSubmission({
      submitter_name,
      submitter_email,
      model_name,
      model_description,
      category,
      license_type,
      source_url,
      documentation_url,
      capabilities,
      additional_info,
    })

    // Send confirmation email (non-blocking - don't fail submission if email fails)
    sendSubmissionConfirmation(submitter_name, submitter_email, model_name).catch((err) => {
      console.error('Email send failed:', err)
    })

    return NextResponse.json(
      { success: true, submission },
      { status: 201 }
    )
  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    const { getSubmissionsByEmail } = await import('@/lib/db')
    const submissions = await getSubmissionsByEmail(email)

    return NextResponse.json({ submissions }, { status: 200 })
  } catch (error) {
    console.error('Get submissions error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve submissions' },
      { status: 500 }
    )
  }
}
