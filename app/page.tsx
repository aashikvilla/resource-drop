'use client'

import { useState } from 'react'
import ResourceForm from './components/ResourceForm'
import ResourceFeed from './components/ResourceFeed'
import { TAG_COLORS } from '@/lib/supabase'

const TAGS = ['design', 'product', 'tech', 'career', 'general'] as const

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [activeTag, setActiveTag] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Resource Drop</h1>
          <p className="mt-1 text-sm text-zinc-500">Share useful links with the team.</p>
        </header>

        <ResourceForm onResourceAdded={() => setRefreshKey(k => k + 1)} />

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Latest drops
            </h2>
            <div className="flex items-center gap-1.5 flex-wrap justify-end">
              <button
                onClick={() => setActiveTag(null)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeTag === null
                    ? 'bg-white text-black'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                All
              </button>
              {TAGS.map(tag => {
                const colors = TAG_COLORS[tag]
                const isActive = activeTag === tag
                return (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(isActive ? null : tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${
                      isActive
                        ? `${colors.bg} ${colors.text}`
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
          </div>
          <ResourceFeed refreshKey={refreshKey} activeTag={activeTag} />
        </div>
      </div>
    </main>
  )
}
