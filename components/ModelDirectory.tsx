'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AIModel {
  id: number
  name: string
  description: string | null
  category: string | null
  tags: string[] | null
  created_at: string
}

export default function ModelDirectory() {
  const [models, setModels] = useState<AIModel[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('')

  useEffect(() => {
    fetchModels()
  }, [search, category])

  const fetchModels = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (category) params.append('category', category)

      const response = await fetch(`/api/models?${params}`)
      const data = await response.json()
      setModels(data.models || [])
    } catch (error) {
      console.error('Failed to fetch models:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and filter */}
      <div className="space-y-4">
        <Input
          placeholder="Search models by name or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Models grid */}
      {loading ? (
        <div className="text-center text-slate-600">Loading models...</div>
      ) : models.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-slate-600">
            No models found. Be the first to submit one!
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {models.map((model) => (
            <Link key={model.id} href={`/models/${model.id}`}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{model.name}</CardTitle>
                  {model.category && (
                    <CardDescription className="text-xs">
                      Category: {model.category}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-slate-600">
                    {model.description || 'No description provided'}
                  </p>
                  {model.tags && model.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {model.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
