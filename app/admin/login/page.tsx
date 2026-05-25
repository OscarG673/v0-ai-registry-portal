import AdminLoginForm from '@/components/AdminLoginForm'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Admin Login - AI Model Registry',
  description: 'Admin login page',
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Admin Portal</h1>
          <p className="mt-2 text-slate-600">Sign in to review and manage submissions</p>
        </div>

        <AdminLoginForm />

        <div className="mt-6 text-center">
          <Link href="/">
            <Button variant="ghost">← Back to Registry</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
