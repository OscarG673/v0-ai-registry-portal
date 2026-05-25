import { NextRequest, NextResponse } from 'next/server'
import { getModelById } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const modelId = parseInt(id)

    if (!modelId || isNaN(modelId)) {
      return NextResponse.json(
        { error: 'Invalid model ID' },
        { status: 400 }
      )
    }

    const model = await getModelById(modelId)
    if (!model) {
      return NextResponse.json(
        { error: 'Model not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ model }, { status: 200 })
  } catch (error) {
    console.error('Get model error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve model' },
      { status: 500 }
    )
  }
}
