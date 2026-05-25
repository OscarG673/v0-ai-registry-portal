import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const getSql = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  return neon(process.env.DATABASE_URL)
}

async function generateRegistryId(): Promise<string> {
  const sql = getSql()
  const year = new Date().getFullYear()
  
  // Get next sequence value
  const result = await sql`SELECT nextval('registry_id_seq') as seq`
  const seq = result[0].seq
  
  // Format: SV-YYYY-NNN (e.g., SV-2026-001)
  const paddedSeq = String(seq).padStart(3, '0')
  return `SV-${year}-${paddedSeq}`
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const sql = getSql()

    // Validate required fields
    const requiredFields = [
      'deployer_name',
      'nit',
      'contact_email',
      'system_name',
      'purpose_description',
      'sector',
      'geographic_scope',
      'risk_tier',
      'tier_justification',
      'compliance_pathway',
      'capabilities_description',
      'data_handling_practices',
      'incident_response_plan',
    ]

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate HIGH risk additional fields
    if (data.risk_tier === 'HIGH') {
      if (!data.hitl_safeguards) {
        return NextResponse.json(
          { error: 'HITL safeguards required for HIGH risk tier' },
          { status: 400 }
        )
      }
      if (!data.right_to_challenge) {
        return NextResponse.json(
          { error: 'Right to challenge mechanism required for HIGH risk tier' },
          { status: 400 }
        )
      }
    }

    // Validate consent checkboxes
    if (!data.art5_principles_accepted || !data.audit_summary_consent || !data.change_notification_commitment) {
      return NextResponse.json(
        { error: 'All consent checkboxes must be accepted' },
        { status: 400 }
      )
    }

    // Generate unique registry ID
    const registryId = await generateRegistryId()

    // Insert into database
    const result = await sql`
      INSERT INTO ai_system_registrations (
        registry_id,
        deployer_name,
        nit,
        contact_email,
        developer_name,
        system_name,
        system_version,
        purpose_description,
        sector,
        geographic_scope,
        risk_tier,
        tier_justification,
        compliance_pathway,
        hitl_safeguards,
        right_to_challenge,
        capabilities_description,
        performance_metrics,
        data_handling_practices,
        incident_response_plan,
        art5_principles_accepted,
        audit_summary_consent,
        change_notification_commitment
      ) VALUES (
        ${registryId},
        ${data.deployer_name},
        ${data.nit},
        ${data.contact_email},
        ${data.developer_name || null},
        ${data.system_name},
        ${data.system_version || null},
        ${data.purpose_description},
        ${data.sector},
        ${data.geographic_scope},
        ${data.risk_tier},
        ${data.tier_justification},
        ${data.compliance_pathway},
        ${data.hitl_safeguards || null},
        ${data.right_to_challenge || null},
        ${data.capabilities_description},
        ${data.performance_metrics || null},
        ${data.data_handling_practices},
        ${data.incident_response_plan},
        ${data.art5_principles_accepted},
        ${data.audit_summary_consent},
        ${data.change_notification_commitment}
      )
      RETURNING id, registry_id, submitted_at
    `

    return NextResponse.json({
      success: true,
      registry_id: result[0].registry_id,
      id: result[0].id,
      submitted_at: result[0].submitted_at,
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Failed to create registration' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const sql = getSql()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    let result
    if (status) {
      result = await sql`
        SELECT id, registry_id, deployer_name, system_name, sector, risk_tier, status, submitted_at
        FROM ai_system_registrations
        WHERE status = ${status}
        ORDER BY submitted_at DESC
      `
    } else {
      result = await sql`
        SELECT id, registry_id, deployer_name, system_name, sector, risk_tier, status, submitted_at
        FROM ai_system_registrations
        ORDER BY submitted_at DESC
      `
    }

    return NextResponse.json({ registrations: result })
  } catch (error) {
    console.error('Fetch registrations error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    )
  }
}
