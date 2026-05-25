import AISystemRegistrationForm from '@/components/AISystemRegistrationForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'AI System Registration | AI Registry Portal',
  description: 'Register your AI system with the national registry for LFIAT compliance',
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            AI System Registration
          </h1>
          <p className="mt-2 text-muted-foreground">
            Register your AI system with the national registry to comply with LFIAT regulations.
            Complete all sections to receive your unique Registry ID.
          </p>
        </div>

        <AISystemRegistrationForm />
      </div>
    </main>
  )
}
