import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedAdmin } from '@/lib/auth'
import { getPendingSubmissions } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin()
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const page = parseInt(request.nextUrl.searchParams.get('page') || '1')
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    const submissions = await getPendingSubmissions(limit, offset)

    return NextResponse.json(
      { submissions, page, limit },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get pending submissions error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve submissions' },
      { status: 500 }
    )
  }
}
