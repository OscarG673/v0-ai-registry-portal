import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, FileText, Search, Building2, ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata = {
  title: 'Portal de Registro de IA | ANIA El Salvador',
  description: 'Registro Nacional de Sistemas de Inteligencia Artificial - Agencia Nacional de Inteligencia Artificial de El Salvador',
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">Portal ANIA</h1>
                <p className="text-xs text-slate-500">El Salvador</p>
              </div>
            </div>
            <nav className="flex items-center gap-2">
              <Link href="/consulta">
                <Button variant="ghost" size="sm">Consultar Registro</Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="ghost" size="sm">Administracion</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              Registro Nacional de IA
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Registro de Sistemas de{' '}
              <span className="text-primary">Inteligencia Artificial</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Plataforma oficial para el registro de sistemas de IA en El Salvador, 
              conforme a la Ley de Fomento a la Inteligencia Artificial y Tecnologias (LFIAT).
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="gap-2 px-8">
                  Registrar Sistema de IA
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/consulta">
                <Button size="lg" variant="outline" className="gap-2">
                  <Search className="h-4 w-4" />
                  Consultar Registro
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-foreground">Como Funciona</h2>
            <p className="mt-2 text-muted-foreground">
              Proceso simple para registrar su sistema de IA
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="relative border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
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
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
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
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
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
      <section className="border-y bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Sobre la LFIAT
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
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
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Beneficios del Registro
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
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
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
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
          <Card className="border-0 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-xl">
            <CardContent className="flex flex-col items-center gap-6 py-12 text-center">
              <Building2 className="h-12 w-12 opacity-90" />
              <div>
                <h2 className="text-2xl font-bold">Listo para Registrar su Sistema?</h2>
                <p className="mt-2 opacity-90">
                  El proceso toma aproximadamente 10-15 minutos
                </p>
              </div>
              <Link href="/register">
                <Button size="lg" variant="secondary" className="gap-2">
                  Iniciar Registro
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          <p>
            Agencia Nacional de Inteligencia Artificial (ANIA) - El Salvador
          </p>
          <p className="mt-1">
            Conforme a la Ley de Fomento a la Inteligencia Artificial y Tecnologias (LFIAT)
          </p>
        </div>
      </footer>
    </div>
  )
}
