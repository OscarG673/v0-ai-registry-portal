'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SubmissionReview from '@/components/SubmissionReview'

interface ModelSubmission {
  id: number
  submitter_name: string
  submitter_email: string
  model_name: string
  model_description: string | null
  category: string | null
  submitted_at: string
  status: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [submissions, setSubmissions] = useState<ModelSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<ModelSubmission | null>(null)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/submissions')
      if (response.status === 401) {
        router.push('/admin/login')
        return
      }
      const data = await response.json()
      setSubmissions(data.submissions || [])
    } catch (error) {
      console.error('Failed to fetch submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/')
  }

  const handleReviewComplete = () => {
    setSelectedSubmission(null)
    fetchSubmissions()
  }

  if (selectedSubmission) {
    return (
      <SubmissionReview
        submission={selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
        onReviewComplete={handleReviewComplete}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Pending Submissions</h2>
            <p className="text-slate-600">Review and approve or reject model submissions</p>
          </div>

          {loading ? (
            <Card>
              <CardContent className="pt-6 text-center text-slate-600">
                Loading submissions...
              </CardContent>
            </Card>
          ) : submissions.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-slate-600">
                No pending submissions
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <Card
                  key={submission.id}
                  className="cursor-pointer transition-shadow hover:shadow-lg"
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{submission.model_name}</CardTitle>
                        <CardDescription>
                          Submitted by {submission.submitter_name} ({submission.submitter_email})
                        </CardDescription>
                      </div>
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                        {submission.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-sm text-slate-600">
                      {submission.model_description || 'No description provided'}
                    </p>
                    <div className="mt-4 flex gap-4 text-xs text-slate-500">
                      {submission.category && <span>Category: {submission.category}</span>}
                      <span>
                        Submitted:{' '}
                        {new Date(submission.submitted_at).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
