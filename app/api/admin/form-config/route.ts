import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { cookies } from 'next/headers'

const getSql = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  return neon(process.env.DATABASE_URL)
}

async function getAdminFromSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  if (!session) return null
  try {
    return JSON.parse(session)
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const admin = await getAdminFromSession()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sql = getSql()
    
    const result = await sql`
      SELECT id, field_key, field_label, field_type, step_number, is_required, is_enabled, placeholder, help_text, display_order, updated_at
      FROM form_configuration
      ORDER BY step_number, display_order
    `

    return NextResponse.json({ fields: result })
  } catch (error) {
    console.error('Fetch admin form config error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch form configuration' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const admin = await getAdminFromSession()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { field_key, is_enabled, is_required } = await request.json()

    if (!field_key) {
      return NextResponse.json({ error: 'Field key is required' }, { status: 400 })
    }

    const sql = getSql()

    const updates: string[] = []
    
    if (typeof is_enabled === 'boolean') {
      await sql`
        UPDATE form_configuration 
        SET is_enabled = ${is_enabled}, updated_at = NOW(), updated_by_id = ${admin.id}
        WHERE field_key = ${field_key}
      `
    }

    if (typeof is_required === 'boolean') {
      await sql`
        UPDATE form_configuration 
        SET is_required = ${is_required}, updated_at = NOW(), updated_by_id = ${admin.id}
        WHERE field_key = ${field_key}
      `
    }

    const result = await sql`
      SELECT id, field_key, field_label, is_required, is_enabled
      FROM form_configuration
      WHERE field_key = ${field_key}
    `

    return NextResponse.json({ success: true, field: result[0] })
  } catch (error) {
    console.error('Update form config error:', error)
    return NextResponse.json(
      { error: 'Failed to update form configuration' },
      { status: 500 }
    )
  }
}
