import AISystemRegistrationForm from '@/components/AISystemRegistrationForm'
import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'

export const metadata = {
  title: 'Registro de Sistema IA | Portal ANIA',
  description: 'Registre su sistema de Inteligencia Artificial en el Registro Nacional de El Salvador conforme a la LFIAT',
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Inicio
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Registro de Sistema de IA
              </h1>
              <p className="text-muted-foreground">
                Registro Nacional - ANIA El Salvador
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Complete el formulario para registrar su sistema de Inteligencia Artificial 
            conforme a la Ley de Fomento a la Inteligencia Artificial y Tecnologias (LFIAT). 
            Al finalizar recibira su numero de registro unico.
          </p>
        </div>

        <AISystemRegistrationForm />
      </div>
    </main>
  )
}
