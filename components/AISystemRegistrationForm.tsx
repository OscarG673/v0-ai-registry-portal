'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Loader2,
  Building2,
  Bot,
  Shield,
  Cpu,
  FileCheck,
  HelpCircle,
  ExternalLink
} from 'lucide-react'

const SECTORES = [
  { value: 'salud', label: 'Salud' },
  { value: 'finanzas', label: 'Finanzas y Banca' },
  { value: 'educacion', label: 'Educacion' },
  { value: 'gobierno', label: 'Gobierno y Sector Publico' },
  { value: 'transporte', label: 'Transporte y Logistica' },
  { value: 'energia', label: 'Energia y Servicios Publicos' },
  { value: 'comercio', label: 'Comercio y E-commerce' },
  { value: 'manufactura', label: 'Manufactura e Industria' },
  { value: 'agricultura', label: 'Agricultura y Agroindustria' },
  { value: 'telecomunicaciones', label: 'Telecomunicaciones' },
  { value: 'legal', label: 'Servicios Legales' },
  { value: 'rrhh', label: 'Recursos Humanos' },
  { value: 'seguridad', label: 'Seguridad' },
  { value: 'medios', label: 'Medios y Entretenimiento' },
  { value: 'otro', label: 'Otro' },
]

const ALCANCE_GEOGRAFICO = [
  { value: 'municipal', label: 'Municipal' },
  { value: 'departamental', label: 'Departamental' },
  { value: 'nacional', label: 'Nacional' },
  { value: 'centroamerica', label: 'Centroamerica' },
  { value: 'latinoamerica', label: 'Latinoamerica' },
  { value: 'internacional', label: 'Internacional' },
]

interface FormData {
  // Seccion 1: Informacion de la Entidad
  nombre_entidad: string
  nit: string
  email_contacto: string
  telefono: string
  nombre_desarrollador: string
  
  // Seccion 2: Informacion del Sistema IA
  nombre_sistema: string
  version: string
  descripcion_proposito: string
  sector: string
  alcance_geografico: string
  
  // Seccion 3: Clasificacion de Riesgo
  nivel_riesgo: string
  justificacion_riesgo: string
  via_cumplimiento: string
  salvaguardas_humanas: string
  mecanismo_impugnacion: string
  
  // Seccion 4: Especificaciones Tecnicas
  capacidades_sistema: string
  metricas_rendimiento: string
  
  // Seccion 5: Seguridad y Datos
  manejo_datos: string
  plan_incidentes: string
  
  // Seccion 6: Declaraciones y Consentimiento
  acepta_principios_eticos: boolean
  acepta_auditoria: boolean
  acepta_notificacion_cambios: boolean
}

const initialFormData: FormData = {
  nombre_entidad: '',
  nit: '',
  email_contacto: '',
  telefono: '',
  nombre_desarrollador: '',
  nombre_sistema: '',
  version: '',
  descripcion_proposito: '',
  sector: '',
  alcance_geografico: '',
  nivel_riesgo: '',
  justificacion_riesgo: '',
  via_cumplimiento: '',
  salvaguardas_humanas: '',
  mecanismo_impugnacion: '',
  capacidades_sistema: '',
  metricas_rendimiento: '',
  manejo_datos: '',
  plan_incidentes: '',
  acepta_principios_eticos: false,
  acepta_auditoria: false,
  acepta_notificacion_cambios: false,
}

const PASOS = [
  { 
    id: 1, 
    titulo: 'Entidad', 
    descripcion: 'Informacion de su organizacion',
    icon: Building2 
  },
  { 
    id: 2, 
    titulo: 'Sistema IA', 
    descripcion: 'Detalles del sistema',
    icon: Bot 
  },
  { 
    id: 3, 
    titulo: 'Riesgo', 
    descripcion: 'Clasificacion y cumplimiento',
    icon: Shield 
  },
  { 
    id: 4, 
    titulo: 'Tecnico', 
    descripcion: 'Capacidades del sistema',
    icon: Cpu 
  },
  { 
    id: 5, 
    titulo: 'Declaraciones', 
    descripcion: 'Consentimiento final',
    icon: FileCheck 
  },
]

export default function AISystemRegistrationForm() {
  const [pasoActual, setPasoActual] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [registryId, setRegistryId] = useState<string | null>(null)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validarPaso = (paso: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    switch (paso) {
      case 1:
        if (!formData.nombre_entidad.trim()) newErrors.nombre_entidad = 'Este campo es requerido'
        if (!formData.nit.trim()) newErrors.nit = 'Este campo es requerido'
        if (!formData.email_contacto.trim()) {
          newErrors.email_contacto = 'Este campo es requerido'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_contacto)) {
          newErrors.email_contacto = 'Ingrese un email valido'
        }
        break
      case 2:
        if (!formData.nombre_sistema.trim()) newErrors.nombre_sistema = 'Este campo es requerido'
        if (!formData.descripcion_proposito.trim()) newErrors.descripcion_proposito = 'Este campo es requerido'
        if (!formData.sector) newErrors.sector = 'Seleccione un sector'
        if (!formData.alcance_geografico) newErrors.alcance_geografico = 'Seleccione el alcance'
        break
      case 3:
        if (!formData.nivel_riesgo) newErrors.nivel_riesgo = 'Seleccione un nivel de riesgo'
        if (!formData.justificacion_riesgo.trim()) newErrors.justificacion_riesgo = 'Este campo es requerido'
        if (!formData.via_cumplimiento) newErrors.via_cumplimiento = 'Seleccione una via de cumplimiento'
        if (formData.nivel_riesgo === 'ALTO') {
          if (!formData.salvaguardas_humanas.trim()) newErrors.salvaguardas_humanas = 'Requerido para riesgo ALTO'
          if (!formData.mecanismo_impugnacion.trim()) newErrors.mecanismo_impugnacion = 'Requerido para riesgo ALTO'
        }
        break
      case 4:
        if (!formData.capacidades_sistema.trim()) newErrors.capacidades_sistema = 'Este campo es requerido'
        if (!formData.manejo_datos.trim()) newErrors.manejo_datos = 'Este campo es requerido'
        break
      case 5:
        if (!formData.acepta_principios_eticos) newErrors.acepta_principios_eticos = 'Debe aceptar los principios eticos'
        if (!formData.acepta_auditoria) newErrors.acepta_auditoria = 'Debe aceptar la auditoria'
        if (!formData.acepta_notificacion_cambios) newErrors.acepta_notificacion_cambios = 'Debe aceptar notificar cambios'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSiguiente = () => {
    if (validarPaso(pasoActual)) {
      setPasoActual((prev) => Math.min(prev + 1, 5))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleAnterior = () => {
    setPasoActual((prev) => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async () => {
    if (!validarPaso(5)) return

    setLoading(true)
    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployer_name: formData.nombre_entidad,
          nit: formData.nit,
          contact_email: formData.email_contacto,
          developer_name: formData.nombre_desarrollador,
          system_name: formData.nombre_sistema,
          system_version: formData.version,
          purpose_description: formData.descripcion_proposito,
          sector: formData.sector,
          geographic_scope: formData.alcance_geografico,
          risk_tier: formData.nivel_riesgo,
          tier_justification: formData.justificacion_riesgo,
          compliance_pathway: formData.via_cumplimiento,
          hitl_safeguards: formData.salvaguardas_humanas,
          right_to_challenge: formData.mecanismo_impugnacion,
          capabilities_description: formData.capacidades_sistema,
          performance_metrics: formData.metricas_rendimiento,
          data_handling_practices: formData.manejo_datos,
          incident_response_plan: formData.plan_incidentes,
          art5_principles_accepted: formData.acepta_principios_eticos,
          audit_summary_consent: formData.acepta_auditoria,
          change_notification_commitment: formData.acepta_notificacion_cambios,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setRegistryId(data.registry_id)
      } else {
        alert(data.error || 'Error al enviar el registro')
      }
    } catch {
      alert('Ocurrio un error. Por favor intente de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  // Pantalla de exito
  if (registryId) {
    return (
      <Card className="mx-auto max-w-2xl border-0 shadow-lg">
        <CardContent className="flex flex-col items-center gap-6 py-12">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">Registro Exitoso</h2>
            <p className="mt-2 text-muted-foreground">
              Su sistema de IA ha sido registrado correctamente en el Registro Nacional.
            </p>
          </div>
          <div className="w-full max-w-sm rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 px-8 py-6 text-center">
            <p className="text-sm font-medium text-muted-foreground">Su Numero de Registro</p>
            <p className="mt-2 font-mono text-3xl font-bold text-primary">{registryId}</p>
          </div>
          <div className="max-w-md space-y-2 text-center text-sm text-muted-foreground">
            <p>
              Guarde este numero para futuras referencias. Recibira un correo de confirmacion en{' '}
              <span className="font-medium text-foreground">{formData.email_contacto}</span>
            </p>
            <p>
              La ANIA revisara su solicitud y le notificara el estado de su registro.
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => window.print()} variant="outline">
              Imprimir Comprobante
            </Button>
            <Button onClick={() => window.location.href = '/'}>
              Volver al Inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Indicador de Progreso */}
      <nav aria-label="Progreso del formulario" className="hidden sm:block">
        <ol className="flex items-center justify-between">
          {PASOS.map((paso, index) => {
            const Icon = paso.icon
            return (
              <li key={paso.id} className="flex flex-1 items-center">
                <button
                  type="button"
                  onClick={() => {
                    if (paso.id < pasoActual) setPasoActual(paso.id)
                  }}
                  disabled={paso.id > pasoActual}
                  className="flex flex-col items-center gap-2 disabled:cursor-not-allowed"
                >
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all',
                      pasoActual > paso.id
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : pasoActual === paso.id
                          ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                          : 'border-muted bg-muted/50 text-muted-foreground'
                    )}
                  >
                    {pasoActual > paso.id ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className={cn(
                      'text-sm font-medium',
                      pasoActual >= paso.id ? 'text-foreground' : 'text-muted-foreground'
                    )}>
                      {paso.titulo}
                    </p>
                  </div>
                </button>
                {index < PASOS.length - 1 && (
                  <div
                    className={cn(
                      'mx-4 h-1 flex-1 rounded-full transition-colors',
                      pasoActual > paso.id ? 'bg-emerald-500' : 'bg-muted'
                    )}
                  />
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Indicador movil */}
      <div className="flex items-center justify-between sm:hidden">
        <span className="text-sm text-muted-foreground">
          Paso {pasoActual} de {PASOS.length}
        </span>
        <span className="font-medium">{PASOS[pasoActual - 1].titulo}</span>
      </div>

      {/* Formulario */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b bg-muted/30 pb-6">
          <div className="flex items-center gap-3">
            {(() => {
              const Icon = PASOS[pasoActual - 1].icon
              return <Icon className="h-6 w-6 text-primary" />
            })()}
            <div>
              <CardTitle className="text-xl">{PASOS[pasoActual - 1].titulo}</CardTitle>
              <CardDescription>{PASOS[pasoActual - 1].descripcion}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Paso 1: Informacion de la Entidad */}
          {pasoActual === 1 && (
            <>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex gap-3">
                  <HelpCircle className="h-5 w-5 shrink-0 text-blue-600" />
                  <p className="text-sm text-blue-800">
                    Ingrese la informacion de la organizacion o persona que opera el sistema de IA. 
                    Esta informacion sera utilizada por la ANIA para el registro oficial.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nombre_entidad">
                    Nombre de la Entidad <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="nombre_entidad"
                    placeholder="Ej: Mi Empresa S.A. de C.V."
                    value={formData.nombre_entidad}
                    onChange={(e) => updateField('nombre_entidad', e.target.value)}
                    className={cn(
                      'h-11',
                      errors.nombre_entidad && 'border-destructive focus-visible:ring-destructive'
                    )}
                  />
                  {errors.nombre_entidad && (
                    <p className="text-sm text-destructive">{errors.nombre_entidad}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nit">
                    NIT <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="nit"
                    placeholder="Ej: 0614-123456-101-0"
                    value={formData.nit}
                    onChange={(e) => updateField('nit', e.target.value)}
                    className={cn(
                      'h-11',
                      errors.nit && 'border-destructive focus-visible:ring-destructive'
                    )}
                  />
                  {errors.nit && <p className="text-sm text-destructive">{errors.nit}</p>}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email_contacto">
                    Correo Electronico <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email_contacto"
                    type="email"
                    placeholder="contacto@empresa.com"
                    value={formData.email_contacto}
                    onChange={(e) => updateField('email_contacto', e.target.value)}
                    className={cn(
                      'h-11',
                      errors.email_contacto && 'border-destructive focus-visible:ring-destructive'
                    )}
                  />
                  {errors.email_contacto && (
                    <p className="text-sm text-destructive">{errors.email_contacto}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Telefono (Opcional)</Label>
                  <Input
                    id="telefono"
                    placeholder="Ej: 2222-3333"
                    value={formData.telefono}
                    onChange={(e) => updateField('telefono', e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombre_desarrollador">
                  Nombre del Desarrollador (Si es diferente al operador)
                </Label>
                <Input
                  id="nombre_desarrollador"
                  placeholder="Ej: Empresa Desarrolladora de IA"
                  value={formData.nombre_desarrollador}
                  onChange={(e) => updateField('nombre_desarrollador', e.target.value)}
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">
                  Complete solo si el desarrollador del sistema es diferente a quien lo opera.
                </p>
              </div>
            </>
          )}

          {/* Paso 2: Informacion del Sistema IA */}
          {pasoActual === 2 && (
            <>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex gap-3">
                  <HelpCircle className="h-5 w-5 shrink-0 text-blue-600" />
                  <p className="text-sm text-blue-800">
                    Describa el sistema de Inteligencia Artificial que desea registrar. 
                    Proporcione informacion clara sobre su proposito y ambito de aplicacion.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nombre_sistema">
                    Nombre del Sistema <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="nombre_sistema"
                    placeholder="Ej: AsistenteIA Pro"
                    value={formData.nombre_sistema}
                    onChange={(e) => updateField('nombre_sistema', e.target.value)}
                    className={cn(
                      'h-11',
                      errors.nombre_sistema && 'border-destructive focus-visible:ring-destructive'
                    )}
                  />
                  {errors.nombre_sistema && (
                    <p className="text-sm text-destructive">{errors.nombre_sistema}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="version">Version (Opcional)</Label>
                  <Input
                    id="version"
                    placeholder="Ej: 1.0.0"
                    value={formData.version}
                    onChange={(e) => updateField('version', e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion_proposito">
                  Descripcion y Proposito <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="descripcion_proposito"
                  placeholder="Describa que hace su sistema de IA, para que se utiliza y como funciona..."
                  rows={4}
                  value={formData.descripcion_proposito}
                  onChange={(e) => updateField('descripcion_proposito', e.target.value)}
                  className={cn(
                    errors.descripcion_proposito && 'border-destructive focus-visible:ring-destructive'
                  )}
                />
                {errors.descripcion_proposito && (
                  <p className="text-sm text-destructive">{errors.descripcion_proposito}</p>
                )}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sector">
                    Sector <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.sector}
                    onValueChange={(value) => updateField('sector', value)}
                  >
                    <SelectTrigger 
                      className={cn(
                        'h-11',
                        errors.sector && 'border-destructive focus:ring-destructive'
                      )}
                    >
                      <SelectValue placeholder="Seleccione el sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTORES.map((sector) => (
                        <SelectItem key={sector.value} value={sector.value}>
                          {sector.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.sector && <p className="text-sm text-destructive">{errors.sector}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alcance_geografico">
                    Alcance Geografico <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.alcance_geografico}
                    onValueChange={(value) => updateField('alcance_geografico', value)}
                  >
                    <SelectTrigger 
                      className={cn(
                        'h-11',
                        errors.alcance_geografico && 'border-destructive focus:ring-destructive'
                      )}
                    >
                      <SelectValue placeholder="Seleccione el alcance" />
                    </SelectTrigger>
                    <SelectContent>
                      {ALCANCE_GEOGRAFICO.map((alcance) => (
                        <SelectItem key={alcance.value} value={alcance.value}>
                          {alcance.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.alcance_geografico && (
                    <p className="text-sm text-destructive">{errors.alcance_geografico}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Paso 3: Clasificacion de Riesgo */}
          {pasoActual === 3 && (
            <>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex gap-3">
                  <HelpCircle className="h-5 w-5 shrink-0 text-blue-600" />
                  <div className="space-y-2">
                    <p className="text-sm text-blue-800">
                      Clasifique el nivel de riesgo de su sistema segun el impacto potencial en las personas.
                      La ANIA podra revisar y ajustar esta clasificacion.
                    </p>
                    <a 
                      href="https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/2020-2029/2024/12/E81CF.PDF" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Conocer mas sobre la clasificacion de riesgo
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>
                  Nivel de Riesgo <span className="text-destructive">*</span>
                </Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { 
                      value: 'BAJO', 
                      label: 'Riesgo Bajo', 
                      desc: 'Impacto minimo en personas',
                      color: 'border-emerald-200 bg-emerald-50 hover:border-emerald-400',
                      activeColor: 'border-emerald-500 bg-emerald-100 ring-2 ring-emerald-500/20'
                    },
                    { 
                      value: 'MEDIO', 
                      label: 'Riesgo Medio', 
                      desc: 'Impacto moderado, supervision estandar',
                      color: 'border-amber-200 bg-amber-50 hover:border-amber-400',
                      activeColor: 'border-amber-500 bg-amber-100 ring-2 ring-amber-500/20'
                    },
                    { 
                      value: 'ALTO', 
                      label: 'Riesgo Alto', 
                      desc: 'Impacto significativo, requisitos adicionales',
                      color: 'border-red-200 bg-red-50 hover:border-red-400',
                      activeColor: 'border-red-500 bg-red-100 ring-2 ring-red-500/20'
                    },
                    { 
                      value: 'SANDBOX', 
                      label: 'Sandbox ANIA', 
                      desc: 'Ambiente de pruebas controlado',
                      color: 'border-violet-200 bg-violet-50 hover:border-violet-400',
                      activeColor: 'border-violet-500 bg-violet-100 ring-2 ring-violet-500/20'
                    },
                  ].map((tier) => (
                    <button
                      key={tier.value}
                      type="button"
                      onClick={() => updateField('nivel_riesgo', tier.value)}
                      className={cn(
                        'flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all',
                        formData.nivel_riesgo === tier.value ? tier.activeColor : tier.color,
                        errors.nivel_riesgo && !formData.nivel_riesgo && 'border-destructive'
                      )}
                    >
                      <span className="font-semibold">{tier.label}</span>
                      <span className="text-sm text-muted-foreground">{tier.desc}</span>
                    </button>
                  ))}
                </div>
                {errors.nivel_riesgo && <p className="text-sm text-destructive">{errors.nivel_riesgo}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="justificacion_riesgo">
                  Justificacion del Nivel de Riesgo <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="justificacion_riesgo"
                  placeholder="Explique por que considera que su sistema tiene este nivel de riesgo..."
                  rows={3}
                  value={formData.justificacion_riesgo}
                  onChange={(e) => updateField('justificacion_riesgo', e.target.value)}
                  className={cn(
                    errors.justificacion_riesgo && 'border-destructive focus-visible:ring-destructive'
                  )}
                />
                {errors.justificacion_riesgo && (
                  <p className="text-sm text-destructive">{errors.justificacion_riesgo}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="via_cumplimiento">
                  Via de Cumplimiento <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.via_cumplimiento}
                  onValueChange={(value) => updateField('via_cumplimiento', value)}
                >
                  <SelectTrigger 
                    className={cn(
                      'h-11',
                      errors.via_cumplimiento && 'border-destructive focus:ring-destructive'
                    )}
                  >
                    <SelectValue placeholder="Seleccione la via de cumplimiento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="autocertificacion">Autocertificacion</SelectItem>
                    <SelectItem value="auditoria-tercero">Auditoria por Tercero</SelectItem>
                    <SelectItem value="sandbox-ania">Sandbox ANIA</SelectItem>
                  </SelectContent>
                </Select>
                {errors.via_cumplimiento && (
                  <p className="text-sm text-destructive">{errors.via_cumplimiento}</p>
                )}
              </div>

              {/* Campos adicionales para Riesgo Alto */}
              {formData.nivel_riesgo === 'ALTO' && (
                <div className="space-y-6 rounded-lg border border-red-200 bg-red-50/50 p-4">
                  <p className="text-sm font-medium text-red-800">
                    Campos adicionales requeridos para sistemas de Alto Riesgo:
                  </p>
                  
                  <div className="space-y-2">
                    <Label htmlFor="salvaguardas_humanas">
                      Salvaguardas de Supervision Humana <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="salvaguardas_humanas"
                      placeholder="Describa como se garantiza la supervision humana en las decisiones del sistema..."
                      rows={3}
                      value={formData.salvaguardas_humanas}
                      onChange={(e) => updateField('salvaguardas_humanas', e.target.value)}
                      className={cn(
                        'bg-white',
                        errors.salvaguardas_humanas && 'border-destructive focus-visible:ring-destructive'
                      )}
                    />
                    {errors.salvaguardas_humanas && (
                      <p className="text-sm text-destructive">{errors.salvaguardas_humanas}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mecanismo_impugnacion">
                      Mecanismo de Impugnacion <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="mecanismo_impugnacion"
                      placeholder="Describa como pueden los usuarios impugnar o apelar las decisiones del sistema..."
                      rows={3}
                      value={formData.mecanismo_impugnacion}
                      onChange={(e) => updateField('mecanismo_impugnacion', e.target.value)}
                      className={cn(
                        'bg-white',
                        errors.mecanismo_impugnacion && 'border-destructive focus-visible:ring-destructive'
                      )}
                    />
                    {errors.mecanismo_impugnacion && (
                      <p className="text-sm text-destructive">{errors.mecanismo_impugnacion}</p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Paso 4: Especificaciones Tecnicas y Datos */}
          {pasoActual === 4 && (
            <>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex gap-3">
                  <HelpCircle className="h-5 w-5 shrink-0 text-blue-600" />
                  <p className="text-sm text-blue-800">
                    Proporcione informacion tecnica sobre las capacidades del sistema y 
                    como maneja los datos. No necesita incluir detalles confidenciales.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacidades_sistema">
                  Capacidades del Sistema <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="capacidades_sistema"
                  placeholder="Describa que puede hacer su sistema (entradas, salidas, funciones principales)..."
                  rows={4}
                  value={formData.capacidades_sistema}
                  onChange={(e) => updateField('capacidades_sistema', e.target.value)}
                  className={cn(
                    errors.capacidades_sistema && 'border-destructive focus-visible:ring-destructive'
                  )}
                />
                {errors.capacidades_sistema && (
                  <p className="text-sm text-destructive">{errors.capacidades_sistema}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="metricas_rendimiento">
                  Metricas de Rendimiento (Opcional)
                </Label>
                <Textarea
                  id="metricas_rendimiento"
                  placeholder="Si tiene metricas de precision, equidad u otras, incluyalas aqui..."
                  rows={3}
                  value={formData.metricas_rendimiento}
                  onChange={(e) => updateField('metricas_rendimiento', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="manejo_datos">
                  Manejo de Datos <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="manejo_datos"
                  placeholder="Describa que tipo de datos utiliza el sistema y como los protege..."
                  rows={4}
                  value={formData.manejo_datos}
                  onChange={(e) => updateField('manejo_datos', e.target.value)}
                  className={cn(
                    errors.manejo_datos && 'border-destructive focus-visible:ring-destructive'
                  )}
                />
                {errors.manejo_datos && (
                  <p className="text-sm text-destructive">{errors.manejo_datos}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Conforme a la Ley de Proteccion de Datos Personales de El Salvador.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan_incidentes">
                  Plan de Respuesta a Incidentes (Opcional)
                </Label>
                <Textarea
                  id="plan_incidentes"
                  placeholder="Si tiene un plan para manejar incidentes o fallas del sistema, describalo brevemente..."
                  rows={3}
                  value={formData.plan_incidentes}
                  onChange={(e) => updateField('plan_incidentes', e.target.value)}
                />
              </div>
            </>
          )}

          {/* Paso 5: Declaraciones y Consentimiento */}
          {pasoActual === 5 && (
            <>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex gap-3">
                  <HelpCircle className="h-5 w-5 shrink-0 text-blue-600" />
                  <p className="text-sm text-blue-800">
                    Para completar el registro, debe aceptar los siguientes compromisos 
                    conforme a la Ley de Fomento a la Inteligencia Artificial (LFIAT).
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div 
                  className={cn(
                    'flex items-start gap-4 rounded-lg border p-4 transition-colors',
                    formData.acepta_principios_eticos ? 'border-emerald-200 bg-emerald-50' : 'border-border',
                    errors.acepta_principios_eticos && !formData.acepta_principios_eticos && 'border-destructive'
                  )}
                >
                  <Checkbox
                    id="acepta_principios_eticos"
                    checked={formData.acepta_principios_eticos}
                    onCheckedChange={(checked) => updateField('acepta_principios_eticos', checked === true)}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="acepta_principios_eticos" className="cursor-pointer font-medium">
                      Principios de Uso Etico y Responsable
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Declaro que el sistema de IA sera utilizado de manera etica y responsable, 
                      conforme a los principios establecidos en la LFIAT, respetando los derechos 
                      fundamentales de las personas.
                    </p>
                  </div>
                </div>

                <div 
                  className={cn(
                    'flex items-start gap-4 rounded-lg border p-4 transition-colors',
                    formData.acepta_auditoria ? 'border-emerald-200 bg-emerald-50' : 'border-border',
                    errors.acepta_auditoria && !formData.acepta_auditoria && 'border-destructive'
                  )}
                >
                  <Checkbox
                    id="acepta_auditoria"
                    checked={formData.acepta_auditoria}
                    onCheckedChange={(checked) => updateField('acepta_auditoria', checked === true)}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="acepta_auditoria" className="cursor-pointer font-medium">
                      Consentimiento de Auditoria
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Acepto que la ANIA pueda solicitar informacion adicional o realizar 
                      auditorias del sistema registrado para verificar el cumplimiento de 
                      la normativa vigente.
                    </p>
                  </div>
                </div>

                <div 
                  className={cn(
                    'flex items-start gap-4 rounded-lg border p-4 transition-colors',
                    formData.acepta_notificacion_cambios ? 'border-emerald-200 bg-emerald-50' : 'border-border',
                    errors.acepta_notificacion_cambios && !formData.acepta_notificacion_cambios && 'border-destructive'
                  )}
                >
                  <Checkbox
                    id="acepta_notificacion_cambios"
                    checked={formData.acepta_notificacion_cambios}
                    onCheckedChange={(checked) => updateField('acepta_notificacion_cambios', checked === true)}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="acepta_notificacion_cambios" className="cursor-pointer font-medium">
                      Compromiso de Notificacion de Cambios
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Me comprometo a notificar a la ANIA cualquier cambio significativo 
                      en el sistema dentro de los 30 dias siguientes a su implementacion.
                    </p>
                  </div>
                </div>
              </div>

              {(errors.acepta_principios_eticos || errors.acepta_auditoria || errors.acepta_notificacion_cambios) && (
                <p className="text-sm text-destructive">
                  Debe aceptar todas las declaraciones para continuar.
                </p>
              )}

              {/* Resumen antes de enviar */}
              <div className="rounded-lg border bg-muted/30 p-4">
                <h4 className="font-medium">Resumen del Registro</h4>
                <dl className="mt-3 grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Entidad:</dt>
                    <dd className="font-medium">{formData.nombre_entidad}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Sistema:</dt>
                    <dd className="font-medium">{formData.nombre_sistema}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Sector:</dt>
                    <dd className="font-medium">
                      {SECTORES.find(s => s.value === formData.sector)?.label || '-'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Nivel de Riesgo:</dt>
                    <dd className="font-medium">{formData.nivel_riesgo || '-'}</dd>
                  </div>
                </dl>
              </div>
            </>
          )}

          {/* Botones de navegacion */}
          <div className="flex items-center justify-between border-t pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={handleAnterior}
              disabled={pasoActual === 1}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>

            {pasoActual < 5 ? (
              <Button type="button" onClick={handleSiguiente} className="gap-2">
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="gap-2 bg-emerald-600 hover:bg-emerald-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Enviar Registro
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
