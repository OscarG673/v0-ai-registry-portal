import { NextRequest, NextResponse } from 'next/server'
import { getAllModels, searchModels } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const offset = (page - 1) * limit

    let models
    if (search) {
      models = await searchModels(search)
    } else if (category) {
      models = await getAllModels(category, limit, offset)
    } else {
      models = await getAllModels(undefined, limit, offset)
    }

    return NextResponse.json(
      { models, page, limit },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get models error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve models' },
      { status: 500 }
    )
  }
}
