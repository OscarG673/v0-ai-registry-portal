'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SubmitModelForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    submitter_name: '',
    submitter_email: '',
    model_name: '',
    model_description: '',
    category: '',
    license_type: '',
    source_url: '',
    documentation_url: '',
    capabilities: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const capabilities = formData.capabilities
        .split('\n')
        .map((c) => c.trim())
        .filter((c) => c)

      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          capabilities,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        alert(`Error: ${error.error}`)
        return
      }

      setSubmitted(true)
      setTimeout(() => {
        router.push('/')
      }, 3000)
    } catch (error) {
      alert('Failed to submit model. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6 text-center">
          <h2 className="text-xl font-semibold text-green-900">Thank you for your submission!</h2>
          <p className="mt-2 text-green-700">
            We&apos;ve sent a confirmation email to {formData.submitter_email}. Our team will review your submission and get back to you shortly.
          </p>
          <p className="mt-4 text-sm text-green-600">Redirecting you back to the registry...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Submitter Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">Your Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Name *</label>
                <Input
                  type="text"
                  name="submitter_name"
                  value={formData.submitter_name}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Email *</label>
                <Input
                  type="email"
                  name="submitter_email"
                  value={formData.submitter_email}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Model Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">Model Information</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700">Model Name *</label>
              <Input
                type="text"
                name="model_name"
                value={formData.model_name}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Description *</label>
              <textarea
                name="model_description"
                value={formData.model_description}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-sans text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Describe your model, its purpose, and capabilities..."
              />
            </div>
          </div>

          {/* Model Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">Model Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-sans text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  <option value="NLP">NLP</option>
                  <option value="Vision">Vision</option>
                  <option value="Speech">Speech</option>
                  <option value="Multimodal">Multimodal</option>
                  <option value="Code">Code</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">License Type</label>
                <Input
                  type="text"
                  name="license_type"
                  value={formData.license_type}
                  onChange={handleChange}
                  placeholder="e.g., MIT, Apache 2.0, CC BY-SA"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* URLs */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">Resources</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700">Source Code URL</label>
              <Input
                type="url"
                name="source_url"
                value={formData.source_url}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Documentation URL</label>
              <Input
                type="url"
                name="documentation_url"
                value={formData.documentation_url}
                onChange={handleChange}
                placeholder="https://docs.example.com"
                className="mt-1"
              />
            </div>
          </div>

          {/* Capabilities */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">Capabilities</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                List key capabilities (one per line)
              </label>
              <textarea
                name="capabilities"
                value={formData.capabilities}
                onChange={handleChange}
                rows={4}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Example: Text classification&#10;Example: Multi-language support&#10;Example: GPU acceleration"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Model'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
