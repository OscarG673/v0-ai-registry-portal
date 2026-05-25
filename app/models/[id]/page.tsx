import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AIModel {
  id: number
  name: string
  description: string | null
  category: string | null
  license_type: string | null
  source_url: string | null
  documentation_url: string | null
  capabilities: string[] | null
  tags: string[] | null
  created_at: string
}

async function getModel(id: string): Promise<AIModel | null> {
  try {
    const response = await fetch(`${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/models/${id}`)
    if (!response.ok) return null
    const data = await response.json()
    return data.model
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const model = await getModel(id)
  return {
    title: model?.name ? `${model.name} - AI Model Registry` : 'Model Not Found',
    description: model?.description || 'AI Model',
  }
}

export default async function ModelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const model = await getModel(id)

  if (!model) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            <Link href="/">
              <Button variant="ghost">← Back</Button>
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-6 text-center text-slate-600">
              Model not found
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="ghost">← Back to Registry</Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-slate-900">{model.name}</h1>
            <div className="mt-4 flex flex-wrap gap-4">
              {model.category && (
                <div className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                  {model.category}
                </div>
              )}
              {model.license_type && (
                <div className="rounded-lg bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                  {model.license_type}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {model.description && (
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-slate-700">{model.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Capabilities */}
          {model.capabilities && model.capabilities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {model.capabilities.map((capability, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 text-green-600">✓</span>
                      <span className="text-slate-700">{capability}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          {model.tags && model.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {model.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Links */}
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {model.source_url && (
                <div>
                  <a
                    href={model.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                  >
                    View Source Code →
                  </a>
                </div>
              )}
              {model.documentation_url && (
                <div>
                  <a
                    href={model.documentation_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-300"
                  >
                    Read Documentation →
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
