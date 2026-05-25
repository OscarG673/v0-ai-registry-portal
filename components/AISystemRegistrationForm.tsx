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
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

const SECTORS = [
  'Healthcare',
  'Finance & Banking',
  'Education',
  'Government & Public Sector',
  'Transportation',
  'Energy & Utilities',
  'Retail & E-commerce',
  'Manufacturing',
  'Agriculture',
  'Telecommunications',
  'Legal Services',
  'Human Resources',
  'Security & Defense',
  'Entertainment & Media',
  'Other',
]

const GEOGRAPHIC_SCOPES = [
  'Local (Municipal)',
  'Regional (Departmental)',
  'National',
  'Central America',
  'Latin America',
  'International',
]

interface FormData {
  // Section 1: Entity Info
  deployer_name: string
  nit: string
  contact_email: string
  developer_name: string
  // Section 2: System Overview
  system_name: string
  system_version: string
  purpose_description: string
  sector: string
  geographic_scope: string
  // Section 3: Risk & Compliance
  risk_tier: string
  tier_justification: string
  compliance_pathway: string
  hitl_safeguards: string
  right_to_challenge: string
  // Section 4: Technical
  capabilities_description: string
  performance_metrics: string
  // Section 5: Operational & Safety
  data_handling_practices: string
  incident_response_plan: string
  // Section 6: Transparency & Consent
  art5_principles_accepted: boolean
  audit_summary_consent: boolean
  change_notification_commitment: boolean
}

const initialFormData: FormData = {
  deployer_name: '',
  nit: '',
  contact_email: '',
  developer_name: '',
  system_name: '',
  system_version: '',
  purpose_description: '',
  sector: '',
  geographic_scope: '',
  risk_tier: '',
  tier_justification: '',
  compliance_pathway: '',
  hitl_safeguards: '',
  right_to_challenge: '',
  capabilities_description: '',
  performance_metrics: '',
  data_handling_practices: '',
  incident_response_plan: '',
  art5_principles_accepted: false,
  audit_summary_consent: false,
  change_notification_commitment: false,
}

const STEPS = [
  { id: 1, title: 'Entity Info', description: 'Organization details' },
  { id: 2, title: 'System Overview', description: 'AI system details' },
  { id: 3, title: 'Risk & Compliance', description: 'Risk assessment' },
  { id: 4, title: 'Technical', description: 'Technical specifications' },
  { id: 5, title: 'Operational & Safety', description: 'Safety measures' },
  { id: 6, title: 'Transparency', description: 'Consent & commitments' },
]

export default function AISystemRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
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

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    switch (step) {
      case 1:
        if (!formData.deployer_name.trim()) newErrors.deployer_name = 'Required'
        if (!formData.nit.trim()) newErrors.nit = 'Required'
        if (!formData.contact_email.trim()) newErrors.contact_email = 'Required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email)) {
          newErrors.contact_email = 'Invalid email'
        }
        break
      case 2:
        if (!formData.system_name.trim()) newErrors.system_name = 'Required'
        if (!formData.purpose_description.trim()) newErrors.purpose_description = 'Required'
        if (!formData.sector) newErrors.sector = 'Required'
        if (!formData.geographic_scope) newErrors.geographic_scope = 'Required'
        break
      case 3:
        if (!formData.risk_tier) newErrors.risk_tier = 'Required'
        if (!formData.tier_justification.trim()) newErrors.tier_justification = 'Required'
        if (!formData.compliance_pathway) newErrors.compliance_pathway = 'Required'
        if (formData.risk_tier === 'HIGH') {
          if (!formData.hitl_safeguards.trim()) newErrors.hitl_safeguards = 'Required for HIGH risk'
          if (!formData.right_to_challenge.trim()) newErrors.right_to_challenge = 'Required for HIGH risk'
        }
        break
      case 4:
        if (!formData.capabilities_description.trim()) newErrors.capabilities_description = 'Required'
        break
      case 5:
        if (!formData.data_handling_practices.trim()) newErrors.data_handling_practices = 'Required'
        if (!formData.incident_response_plan.trim()) newErrors.incident_response_plan = 'Required'
        break
      case 6:
        if (!formData.art5_principles_accepted) newErrors.art5_principles_accepted = 'Must accept'
        if (!formData.audit_summary_consent) newErrors.audit_summary_consent = 'Must accept'
        if (!formData.change_notification_commitment) newErrors.change_notification_commitment = 'Must accept'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6))
    }
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(6)) return

    setLoading(true)
    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setRegistryId(data.registry_id)
      } else {
        alert(data.error || 'Failed to submit registration')
      }
    } catch {
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (registryId) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="flex flex-col items-center gap-6 py-12">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">Registration Submitted!</h2>
            <p className="mt-2 text-muted-foreground">
              Your AI system has been registered successfully.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/50 px-8 py-4 text-center">
            <p className="text-sm text-muted-foreground">Your Registry ID</p>
            <p className="mt-1 font-mono text-2xl font-bold text-primary">{registryId}</p>
          </div>
          <p className="max-w-md text-center text-sm text-muted-foreground">
            Please save this ID for your records. You will receive a confirmation email at{' '}
            <span className="font-medium">{formData.contact_email}</span> with further instructions.
          </p>
          <Button onClick={() => window.location.href = '/'} variant="outline">
            Return to Home
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Progress Steps */}
      <nav aria-label="Progress">
        <ol className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <li key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors',
                    currentStep > step.id
                      ? 'border-primary bg-primary text-primary-foreground'
                      : currentStep === step.id
                        ? 'border-primary bg-background text-primary'
                        : 'border-muted bg-background text-muted-foreground'
                  )}
                >
                  {currentStep > step.id ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="hidden text-center sm:block">
                  <p className={cn(
                    'text-xs font-medium',
                    currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                    {step.title}
                  </p>
                </div>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    'mx-2 h-0.5 flex-1',
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>{STEPS[currentStep - 1].title}</CardTitle>
          <CardDescription>{STEPS[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Entity Info */}
          {currentStep === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="deployer_name">
                  Deployer Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="deployer_name"
                  placeholder="Organization or company name"
                  value={formData.deployer_name}
                  onChange={(e) => updateField('deployer_name', e.target.value)}
                  className={errors.deployer_name ? 'border-destructive' : ''}
                />
                {errors.deployer_name && (
                  <p className="text-sm text-destructive">{errors.deployer_name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nit">
                  NIT (Tax ID) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="nit"
                  placeholder="e.g., 0614-123456-101-0"
                  value={formData.nit}
                  onChange={(e) => updateField('nit', e.target.value)}
                  className={errors.nit ? 'border-destructive' : ''}
                />
                {errors.nit && <p className="text-sm text-destructive">{errors.nit}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_email">
                  Contact Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contact_email"
                  type="email"
                  placeholder="contact@company.com"
                  value={formData.contact_email}
                  onChange={(e) => updateField('contact_email', e.target.value)}
                  className={errors.contact_email ? 'border-destructive' : ''}
                />
                {errors.contact_email && (
                  <p className="text-sm text-destructive">{errors.contact_email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="developer_name">Developer Name (Optional)</Label>
                <Input
                  id="developer_name"
                  placeholder="Third-party developer, if applicable"
                  value={formData.developer_name}
                  onChange={(e) => updateField('developer_name', e.target.value)}
                />
              </div>
            </>
          )}

          {/* Step 2: System Overview */}
          {currentStep === 2 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="system_name">
                  System Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="system_name"
                  placeholder="Name of your AI system"
                  value={formData.system_name}
                  onChange={(e) => updateField('system_name', e.target.value)}
                  className={errors.system_name ? 'border-destructive' : ''}
                />
                {errors.system_name && (
                  <p className="text-sm text-destructive">{errors.system_name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="system_version">Version (Optional)</Label>
                <Input
                  id="system_version"
                  placeholder="e.g., 1.0.0, v2.3"
                  value={formData.system_version}
                  onChange={(e) => updateField('system_version', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose_description">
                  Purpose / Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="purpose_description"
                  placeholder="Describe the purpose and main functionality of your AI system..."
                  rows={4}
                  value={formData.purpose_description}
                  onChange={(e) => updateField('purpose_description', e.target.value)}
                  className={errors.purpose_description ? 'border-destructive' : ''}
                />
                {errors.purpose_description && (
                  <p className="text-sm text-destructive">{errors.purpose_description}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sector">
                    Sector <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.sector}
                    onValueChange={(value) => updateField('sector', value)}
                  >
                    <SelectTrigger className={errors.sector ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTORS.map((sector) => (
                        <SelectItem key={sector} value={sector}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.sector && <p className="text-sm text-destructive">{errors.sector}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="geographic_scope">
                    Geographic Scope <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.geographic_scope}
                    onValueChange={(value) => updateField('geographic_scope', value)}
                  >
                    <SelectTrigger className={errors.geographic_scope ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select scope" />
                    </SelectTrigger>
                    <SelectContent>
                      {GEOGRAPHIC_SCOPES.map((scope) => (
                        <SelectItem key={scope} value={scope}>
                          {scope}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.geographic_scope && (
                    <p className="text-sm text-destructive">{errors.geographic_scope}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Step 3: Risk & Compliance */}
          {currentStep === 3 && (
            <>
              <div className="space-y-4">
                <Label>
                  Risk Tier <span className="text-destructive">*</span>
                </Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { value: 'LOW', label: 'Low Risk', desc: 'Minimal impact on individuals' },
                    { value: 'MEDIUM', label: 'Medium Risk', desc: 'Moderate impact, standard oversight' },
                    { value: 'HIGH', label: 'High Risk', desc: 'Significant impact, enhanced requirements' },
                    { value: 'SANDBOX', label: 'Sandbox', desc: 'Experimental/testing environment' },
                  ].map((tier) => (
                    <button
                      key={tier.value}
                      type="button"
                      onClick={() => updateField('risk_tier', tier.value)}
                      className={cn(
                        'flex flex-col items-start rounded-lg border p-4 text-left transition-colors',
                        formData.risk_tier === tier.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50',
                        errors.risk_tier && !formData.risk_tier ? 'border-destructive' : ''
                      )}
                    >
                      <span className="font-medium">{tier.label}</span>
                      <span className="text-sm text-muted-foreground">{tier.desc}</span>
                    </button>
                  ))}
                </div>
                {errors.risk_tier && <p className="text-sm text-destructive">{errors.risk_tier}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tier_justification">
                  Tier Justification <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="tier_justification"
                  placeholder="Explain why this risk tier is appropriate for your system..."
                  rows={3}
                  value={formData.tier_justification}
                  onChange={(e) => updateField('tier_justification', e.target.value)}
                  className={errors.tier_justification ? 'border-destructive' : ''}
                />
                {errors.tier_justification && (
                  <p className="text-sm text-destructive">{errors.tier_justification}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="compliance_pathway">
                  Compliance Pathway <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.compliance_pathway}
                  onValueChange={(value) => updateField('compliance_pathway', value)}
                >
                  <SelectTrigger className={errors.compliance_pathway ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select pathway" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self-certification">Self-Certification</SelectItem>
                    <SelectItem value="third-party-audit">Third-Party Audit</SelectItem>
                    <SelectItem value="ania-sandbox">ANIA Sandbox</SelectItem>
                  </SelectContent>
                </Select>
                {errors.compliance_pathway && (
                  <p className="text-sm text-destructive">{errors.compliance_pathway}</p>
                )}
              </div>

              {/* Conditional fields for HIGH risk */}
              {formData.risk_tier === 'HIGH' && (
                <div className="space-y-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    Additional requirements for High Risk systems
                  </p>

                  <div className="space-y-2">
                    <Label htmlFor="hitl_safeguards">
                      Human-in-the-Loop (HITL) Safeguards <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="hitl_safeguards"
                      placeholder="Describe the human oversight mechanisms in place..."
                      rows={3}
                      value={formData.hitl_safeguards}
                      onChange={(e) => updateField('hitl_safeguards', e.target.value)}
                      className={errors.hitl_safeguards ? 'border-destructive' : ''}
                    />
                    {errors.hitl_safeguards && (
                      <p className="text-sm text-destructive">{errors.hitl_safeguards}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="right_to_challenge">
                      Right to Challenge Mechanism <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="right_to_challenge"
                      placeholder="Describe how individuals can challenge AI decisions..."
                      rows={3}
                      value={formData.right_to_challenge}
                      onChange={(e) => updateField('right_to_challenge', e.target.value)}
                      className={errors.right_to_challenge ? 'border-destructive' : ''}
                    />
                    {errors.right_to_challenge && (
                      <p className="text-sm text-destructive">{errors.right_to_challenge}</p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Step 4: Technical */}
          {currentStep === 4 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="capabilities_description">
                  Capabilities / Inputs / Outputs <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="capabilities_description"
                  placeholder="Describe what the system does, what data it takes as input, and what outputs it produces..."
                  rows={5}
                  value={formData.capabilities_description}
                  onChange={(e) => updateField('capabilities_description', e.target.value)}
                  className={errors.capabilities_description ? 'border-destructive' : ''}
                />
                {errors.capabilities_description && (
                  <p className="text-sm text-destructive">{errors.capabilities_description}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="performance_metrics">
                  Performance / Fairness Metrics (Optional)
                </Label>
                <Textarea
                  id="performance_metrics"
                  placeholder="Describe any performance benchmarks, accuracy metrics, or fairness evaluations..."
                  rows={4}
                  value={formData.performance_metrics}
                  onChange={(e) => updateField('performance_metrics', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Include metrics such as accuracy rates, bias assessments, or fairness evaluations if available.
                </p>
              </div>
            </>
          )}

          {/* Step 5: Operational & Safety */}
          {currentStep === 5 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="data_handling_practices">
                  Data Handling Practices <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="data_handling_practices"
                  placeholder="Describe how data is collected, processed, stored, and protected..."
                  rows={4}
                  value={formData.data_handling_practices}
                  onChange={(e) => updateField('data_handling_practices', e.target.value)}
                  className={errors.data_handling_practices ? 'border-destructive' : ''}
                />
                {errors.data_handling_practices && (
                  <p className="text-sm text-destructive">{errors.data_handling_practices}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="incident_response_plan">
                  Incident Response Plan Summary <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="incident_response_plan"
                  placeholder="Summarize your plan for handling AI system failures, errors, or security incidents..."
                  rows={4}
                  value={formData.incident_response_plan}
                  onChange={(e) => updateField('incident_response_plan', e.target.value)}
                  className={errors.incident_response_plan ? 'border-destructive' : ''}
                />
                {errors.incident_response_plan && (
                  <p className="text-sm text-destructive">{errors.incident_response_plan}</p>
                )}
              </div>
            </>
          )}

          {/* Step 6: Transparency & Consent */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="rounded-lg border bg-muted/30 p-4">
                <h3 className="font-medium">Required Commitments</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Please review and accept the following commitments to complete your registration.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="art5_principles"
                    checked={formData.art5_principles_accepted}
                    onCheckedChange={(checked) =>
                      updateField('art5_principles_accepted', checked === true)
                    }
                    className={errors.art5_principles_accepted ? 'border-destructive' : ''}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="art5_principles" className="cursor-pointer font-medium">
                      Art. 5 LFIAT Principles Compliance
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      I confirm that this AI system complies with the principles established in
                      Article 5 of the LFIAT, including transparency, accountability, and
                      non-discrimination.
                    </p>
                    {errors.art5_principles_accepted && (
                      <p className="text-sm text-destructive">{errors.art5_principles_accepted}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="audit_consent"
                    checked={formData.audit_summary_consent}
                    onCheckedChange={(checked) =>
                      updateField('audit_summary_consent', checked === true)
                    }
                    className={errors.audit_summary_consent ? 'border-destructive' : ''}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="audit_consent" className="cursor-pointer font-medium">
                      Audit Summary Publication Consent
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      I consent to the publication of audit summaries and compliance reports as
                      required by the regulatory framework.
                    </p>
                    {errors.audit_summary_consent && (
                      <p className="text-sm text-destructive">{errors.audit_summary_consent}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="change_notification"
                    checked={formData.change_notification_commitment}
                    onCheckedChange={(checked) =>
                      updateField('change_notification_commitment', checked === true)
                    }
                    className={errors.change_notification_commitment ? 'border-destructive' : ''}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="change_notification" className="cursor-pointer font-medium">
                      30-Day Change Notification Commitment
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      I commit to notifying the registry of any significant changes to the AI
                      system within 30 days of implementation.
                    </p>
                    {errors.change_notification_commitment && (
                      <p className="text-sm text-destructive">
                        {errors.change_notification_commitment}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentStep < 6 ? (
              <Button type="button" onClick={handleNext}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Registration'
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
