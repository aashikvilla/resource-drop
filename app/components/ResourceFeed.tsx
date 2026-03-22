'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase, Resource } from '@/lib/supabase'
import ResourceCard from './ResourceCard'

export default function ResourceFeed({ refreshKey }: { refreshKey: number }) {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchResources = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setResources(data ?? [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchResources()
  }, [fetchResources, refreshKey])

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 animate-pulse">
            <div className="h-4 bg-zinc-800 rounded w-3/4 mb-3" />
            <div className="h-3 bg-zinc-800 rounded w-1/4" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <p className="text-red-400 text-sm">Failed to load resources: {error}</p>
  }

  if (resources.length === 0) {
    return (
      <p className="text-zinc-500 text-sm text-center py-12">
        No resources yet. Be the first to drop one.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {resources.map(r => (
        <ResourceCard key={r.id} resource={r} />
      ))}
    </div>
  )
}
