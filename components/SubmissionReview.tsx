'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface ModelSubmission {
  id: number
  submitter_name: string
  submitter_email: string
  model_name: string
  model_description: string | null
  category: string | null
  license_type: string | null
  source_url: string | null
  documentation_url: string | null
  capabilities: string[] | null
  submitted_at: string
}

interface SubmissionReviewProps {
  submission: ModelSubmission
  onClose: () => void
  onReviewComplete: () => void
}

export default function SubmissionReview({
  submission,
  onClose,
  onReviewComplete,
}: SubmissionReviewProps) {
  const [loading, setLoading] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject' | null>(null)

  const handleApprove = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/submissions/${submission.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' }),
      })

      if (!response.ok) {
        alert('Failed to approve submission')
        return
      }

      alert('Submission approved! Model has been published.')
      onReviewComplete()
    } catch (error) {
      alert('Error approving submission')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/submissions/${submission.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reject',
          reason: rejectionReason,
        }),
      })

      if (!response.ok) {
        alert('Failed to reject submission')
        return
      }

      alert('Submission rejected. Notification sent to submitter.')
      onReviewComplete()
    } catch (error) {
      alert('Error rejecting submission')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <Button variant="ghost" onClick={onClose}>
            ← Back
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Submission Details */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{submission.model_name}</h1>
            <p className="mt-2 text-slate-600">
              Submitted by {submission.submitter_name} ({submission.submitter_email})
            </p>
          </div>

          {/* Description */}
          {submission.model_description && (
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-slate-700">
                  {submission.model_description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Details Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {submission.category && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">{submission.category}</p>
                </CardContent>
              </Card>
            )}
            {submission.license_type && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">License Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">{submission.license_type}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* URLs */}
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {submission.source_url && (
                <div>
                  <p className="text-sm font-medium text-slate-700">Source Code:</p>
                  <a
                    href={submission.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {submission.source_url}
                  </a>
                </div>
              )}
              {submission.documentation_url && (
                <div>
                  <p className="text-sm font-medium text-slate-700">Documentation:</p>
                  <a
                    href={submission.documentation_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {submission.documentation_url}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Capabilities */}
          {submission.capabilities && submission.capabilities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {submission.capabilities.map((capability, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 text-green-600">✓</span>
                      <span className="text-slate-700">{capability}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Review Actions */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>Review Submission</CardTitle>
              <CardDescription>Approve or reject this submission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviewAction === 'reject' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Rejection Reason *
                    </label>
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Explain why this submission is being rejected..."
                      rows={4}
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-sans text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleReject}
                      disabled={loading || !rejectionReason.trim()}
                      variant="destructive"
                    >
                      {loading ? 'Rejecting...' : 'Confirm Rejection'}
                    </Button>
                    <Button
                      onClick={() => {
                        setReviewAction(null)
                        setRejectionReason('')
                      }}
                      variant="outline"
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleApprove}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {loading ? 'Processing...' : '✓ Approve'}
                  </Button>
                  <Button
                    onClick={() => setReviewAction('reject')}
                    disabled={loading}
                    variant="outline"
                    className="text-red-600 hover:bg-red-50"
                  >
                    ✗ Reject
                  </Button>
                  <Button onClick={onClose} variant="ghost" disabled={loading}>
                    Cancel Review
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
