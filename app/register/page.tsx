import AISystemRegistrationForm from '@/components/AISystemRegistrationForm'
import Link from 'next/link'
import { Search, Building2 } from 'lucide-react'

export const metadata = {
  title: 'Registro de Sistema IA | Portal ANIA',
  description: 'Registre su sistema de Inteligencia Artificial en el Registro Nacional de El Salvador conforme a la LFIAT',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="bg-navy-dark text-white/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="#" className="flex items-center gap-2 transition-colors hover:text-white">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Instituciones</span>
            </Link>
            <Link href="#" className="flex items-center gap-2 transition-colors hover:text-white">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Portal de Transparencia</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded px-2 py-1 hover:bg-white/10">EN</button>
            <span className="text-white/40">|</span>
            <button className="rounded bg-white/10 px-2 py-1 font-medium">ES</button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            {/* Title */}
            <div className="text-center sm:text-left">
              <p className="text-xs uppercase tracking-widest text-white/60">Agencia Nacional de</p>
              <h1 className="text-2xl font-bold tracking-tight">Inteligencia Artificial</h1>
              <p className="text-xs text-white/60">El Salvador</p>
            </div>

            {/* Search */}
            <div className="w-full max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar en el portal..."
                  className="h-10 w-full rounded-md border border-white/20 bg-white/10 px-4 pr-10 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                />
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t border-white/10 bg-navy-light">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ul className="flex flex-wrap items-center justify-center gap-1 py-2 text-sm font-medium sm:justify-start">
              <li>
                <Link href="/" className="block rounded-md px-4 py-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/register" className="block rounded-md bg-white/10 px-4 py-2 text-white">
                  Registrar IA
                </Link>
              </li>
              <li>
                <Link href="/consulta" className="block rounded-md px-4 py-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white">
                  Consultar Registro
                </Link>
              </li>
              <li>
                <Link href="#normativa" className="block rounded-md px-4 py-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white">
                  Normativa
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="block rounded-md px-4 py-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white">
                  Administracion
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <main className="bg-muted/30 py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Registro de Sistema de IA
            </h2>
            <p className="mt-2 text-muted-foreground">
              Complete el formulario para registrar su sistema de Inteligencia Artificial 
              conforme a la Ley de Fomento a la Inteligencia Artificial y Tecnologias (LFIAT). 
              Al finalizar recibira su numero de registro unico.
            </p>
          </div>

          <AISystemRegistrationForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy-dark py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div>
                <p className="font-bold">ANIA</p>
                <p className="text-xs text-white/60">El Salvador</p>
              </div>
              <p className="mt-4 text-sm text-white/60">
                Agencia Nacional de Inteligencia Artificial de El Salvador.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Enlaces Rapidos</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                <li><Link href="/register" className="hover:text-white">Registrar Sistema</Link></li>
                <li><Link href="/consulta" className="hover:text-white">Consultar Registro</Link></li>
                <li><Link href="#normativa" className="hover:text-white">Normativa</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Normativa</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                <li><Link href="#" className="hover:text-white">LFIAT</Link></li>
                <li><Link href="#" className="hover:text-white">Reglamentos</Link></li>
                <li><Link href="#" className="hover:text-white">Guias de Cumplimiento</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Contacto</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                <li>contacto@ania.gob.sv</li>
                <li>San Salvador, El Salvador</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/60">
            <p>
              Conforme a la Ley de Fomento a la Inteligencia Artificial y Tecnologias (LFIAT)
            </p>
            <p className="mt-1">
              2025 Agencia Nacional de Inteligencia Artificial (ANIA) - El Salvador
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
