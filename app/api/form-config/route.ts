import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const getSql = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  return neon(process.env.DATABASE_URL)
}

export async function GET() {
  try {
    const sql = getSql()
    
    const result = await sql`
      SELECT field_key, field_label, field_type, step_number, is_required, is_enabled, placeholder, help_text, options, display_order
      FROM form_configuration
      ORDER BY step_number, display_order
    `

    return NextResponse.json({ fields: result })
  } catch (error) {
    console.error('Fetch form config error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch form configuration' },
      { status: 500 }
    )
  }
}
