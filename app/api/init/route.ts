import { NextRequest, NextResponse } from 'next/server'
import { createAdminUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Only allow initialization if ALLOW_INIT is set to true
    if (process.env.ALLOW_INIT !== 'true') {
      return NextResponse.json(
        { error: 'Initialization not allowed' },
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

    const admin = await createAdminUser(username, password, email)

    return NextResponse.json(
      { success: true, admin },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Init error:', error)
    if (error.message?.includes('duplicate key')) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to initialize' },
      { status: 500 }
    )
  }
}
