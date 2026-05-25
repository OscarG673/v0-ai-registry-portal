import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Search, Building2, ArrowRight, CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Portal de Registro de IA | ANIA El Salvador',
  description: 'Registro Nacional de Sistemas de Inteligencia Artificial - Agencia Nacional de Inteligencia Artificial de El Salvador',
}

export default function Page() {
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
                <Link href="/" className="block rounded-md bg-white/10 px-4 py-2 text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/register" className="block rounded-md px-4 py-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white">
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

      {/* Hero Section with Image */}
      <section className="relative h-[400px] overflow-hidden bg-navy-dark sm:h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2832&auto=format&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60" />
        </div>
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Registro Nacional de Sistemas de{' '}
              <span className="text-accent">Inteligencia Artificial</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Plataforma oficial para el registro de sistemas de IA en El Salvador, 
              conforme a la Ley de Fomento a la Inteligencia Artificial y Tecnologias (LFIAT).
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="w-full gap-2 bg-white text-navy hover:bg-white/90 sm:w-auto">
                  Registrar Sistema de IA
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/consulta">
                <Button size="lg" variant="outline" className="w-full gap-2 border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto">
                  <Search className="h-4 w-4" />
                  Consultar Registro
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Carousel Dots */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          <span className="h-3 w-3 rounded-full bg-white" />
          <span className="h-3 w-3 rounded-full bg-white/40" />
          <span className="h-3 w-3 rounded-full bg-white/40" />
        </div>
      </section>

      {/* Avisos Section */}
      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center justify-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            <h2 className="text-center text-2xl font-bold uppercase tracking-wider text-foreground">
              Avisos
            </h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-t-4 border-t-primary transition-shadow hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Mar 2025</span>
                  <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Nuevo</span>
                </div>
                <CardTitle className="mt-2 text-lg">Apertura del Registro Nacional</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  La ANIA informa que el Registro Nacional de IA esta oficialmente disponible para desarrolladores y operadores de sistemas de IA.
                </CardDescription>
                <Link href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  Leer mas <ChevronRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-accent transition-shadow hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Mar 2025</span>
                </div>
                <CardTitle className="mt-2 text-lg">LFIAT Entra en Vigencia</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  La Ley de Fomento a la Inteligencia Artificial y Tecnologias entro en vigor el 11 de marzo de 2025.
                </CardDescription>
                <Link href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  Leer mas <ChevronRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-emerald-500 transition-shadow hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Feb 2025</span>
                </div>
                <CardTitle className="mt-2 text-lg">Guia de Clasificacion de Riesgo</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Consulte la guia oficial para determinar el nivel de riesgo de su sistema de IA segun los criterios de la LFIAT.
                </CardDescription>
                <Link href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  Leer mas <ChevronRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold uppercase tracking-wider text-foreground">Como Funciona</h2>
            <p className="mt-2 text-muted-foreground">
              Proceso simple para registrar su sistema de IA
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="relative border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                  <FileText className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">1. Complete el Formulario</CardTitle>
                <CardDescription>
                  Proporcione informacion basica sobre su organizacion y el sistema de IA que desea registrar.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">2. Clasificacion de Riesgo</CardTitle>
                <CardDescription>
                  Determine el nivel de riesgo de su sistema y seleccione la via de cumplimiento apropiada.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-white">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">3. Obtenga su Registro</CardTitle>
                <CardDescription>
                  Reciba su numero de registro unico (SV-YYYY-NNN) y certificado de inscripcion.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section id="normativa" className="border-y bg-navy text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">
                Sobre la LFIAT
              </h2>
              <p className="mt-4 leading-relaxed text-white/80">
                La Ley de Fomento a la Inteligencia Artificial y Tecnologias (LFIAT) 
                entro en vigor el 11 de marzo de 2025, estableciendo el marco regulatorio 
                para el desarrollo y uso responsable de la IA en El Salvador.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Registro Nacional de desarrolladores y operadores de IA',
                  'Criterios de seguridad para sistemas con datos sensibles',
                  'Uso etico y responsable de la Inteligencia Artificial',
                  'Proteccion de datos personales bajo supervision de ANIA',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="#" className="mt-6 inline-flex items-center gap-2 text-accent hover:underline">
                <ExternalLink className="h-4 w-4" />
                Descargar texto completo de la LFIAT
              </Link>
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                Beneficios del Registro
              </h2>
              <p className="mt-4 leading-relaxed text-white/80">
                Los desarrolladores y operadores inscritos en el Registro Nacional 
                de IA pueden acceder a diversos beneficios establecidos por la ley.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Acceso a datos de dominio abierto para investigacion',
                  'Exencion de responsabilidad por uso indebido de terceros',
                  'Acceso a laboratorios y centros de investigacion de IA',
                  'Soporte y orientacion de la ANIA',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="border-0 bg-gradient-to-r from-navy to-navy-light text-white shadow-xl">
            <CardContent className="flex flex-col items-center gap-6 py-12 text-center">
              <Building2 className="h-12 w-12 opacity-90" />
              <div>
                <h2 className="text-2xl font-bold">Listo para Registrar su Sistema?</h2>
                <p className="mt-2 text-white/80">
                  El proceso toma aproximadamente 10-15 minutos
                </p>
              </div>
              <Link href="/register">
                <Button size="lg" variant="secondary" className="gap-2 bg-white text-navy hover:bg-white/90">
                  Iniciar Registro
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

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
