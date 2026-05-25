import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { neon } from '@neondatabase/serverless'

export const metadata = {
  title: 'AI Registry | ANIA Portal',
  description: 'View registered AI systems in El Salvador National Registry',
}

async function getRegistrations() {
  if (!process.env.DATABASE_URL) {
    return []
  }
  
  try {
    const sql = neon(process.env.DATABASE_URL)
    const result = await sql`
      SELECT registry_id, deployer_name, system_name, sector, risk_tier, status, submitted_at
      FROM ai_system_registrations
      WHERE status = 'approved'
      ORDER BY submitted_at DESC
    `
    return result
  } catch (error) {
    console.error('Failed to fetch registrations:', error)
    return []
  }
}

function getRiskBadgeColor(tier: string) {
  switch (tier) {
    case 'LOW': return 'bg-emerald-100 text-emerald-800'
    case 'MEDIUM': return 'bg-amber-100 text-amber-800'
    case 'HIGH': return 'bg-red-100 text-red-800'
    case 'SANDBOX': return 'bg-violet-100 text-violet-800'
    default: return 'bg-slate-100 text-slate-800'
  }
}

export default async function RegistryPage() {
  const registrations = await getRegistrations()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-slate-900">ANIA Portal</h1>
              <p className="text-xs text-slate-500">El Salvador</p>
            </div>
            <nav className="flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="sm">Home</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register system</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            National AI registry
          </h1>
          <p className="mt-2 text-muted-foreground">
            Registered AI systems in El Salvador in accordance with LFIAT
          </p>
        </div>

        {registrations.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No approved registrations yet</p>
              <Link href="/register" className="mt-4 inline-block">
                <Button>Be the first to register</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {registrations.map((reg: { 
              registry_id: string
              deployer_name: string
              system_name: string
              sector: string
              risk_tier: string
              submitted_at: string
            }) => (
              <Card key={reg.registry_id} className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{reg.system_name}</CardTitle>
                      <CardDescription>{reg.deployer_name}</CardDescription>
                    </div>
                    <Badge className={getRiskBadgeColor(reg.risk_tier)}>
                      {reg.risk_tier}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Registry ID</span>
                      <span className="font-mono font-medium">{reg.registry_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sector</span>
                      <span className="capitalize">{reg.sector.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Registered</span>
                      <span>{new Date(reg.submitted_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          <p>National Agency for Artificial Intelligence (ANIA) - El Salvador</p>
        </div>
      </footer>
    </div>
  )
}
