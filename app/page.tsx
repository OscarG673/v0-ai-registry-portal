import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ModelDirectory from '@/components/ModelDirectory'

export const metadata = {
  title: 'AI Model Registry',
  description: 'Discover, explore, and contribute to the AI Model Registry',
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">AI Model Registry</h1>
              <p className="mt-1 text-sm text-slate-600">Discover and contribute AI models</p>
            </div>
            <div className="flex gap-4">
              <Link href="/register">
                <Button>Register AI System</Button>
              </Link>
              <Link href="/submit">
                <Button variant="outline">Submit a Model</Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="ghost">Admin</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Browse Models</h2>
          <p className="mb-8 text-slate-600">
            Explore a curated collection of AI models for various tasks and use cases.
          </p>
          <ModelDirectory />
        </div>
      </main>
    </div>
  )
}
