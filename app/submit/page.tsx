import Link from 'next/link'
import { Button } from '@/components/ui/button'
import SubmitModelForm from '@/components/SubmitModelForm'

export const metadata = {
  title: 'Submit a Model - AI Model Registry',
  description: 'Submit your AI model to the registry',
}

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="ghost">← Back to Registry</Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Submit Your AI Model</h1>
            <p className="mt-2 text-slate-600">
              Share your AI model with the community. Our team will review your submission and it will be published if approved.
            </p>
          </div>

          <SubmitModelForm />
        </div>
      </main>
    </div>
  )
}
