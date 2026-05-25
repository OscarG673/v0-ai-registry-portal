import { NextRequest, NextResponse } from 'next/server'
import { createAdminUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Check if REGISTRATION_ENABLED is set to allow registration
    const registrationEnabled = process.env.ALLOW_ADMIN_REGISTRATION === 'true'
    if (!registrationEnabled) {
      return NextResponse.json(
        { error: 'Registration is disabled' },
        { status: 403 }
      )
    }

    const { username, password, email } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    const admin = await createAdminUser(username, password, email)

    return NextResponse.json(
      { success: true, admin: { id: admin.id, username: admin.username, email: admin.email } },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Registration error:', error)
    if (error.message?.includes('duplicate key')) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
