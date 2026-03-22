'use client'

import { useState } from 'react'
import ResourceForm from './components/ResourceForm'
import ResourceFeed from './components/ResourceFeed'

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Resource Drop</h1>
          <p className="mt-1 text-sm text-zinc-500">Share useful links with the team.</p>
        </header>

        <ResourceForm onResourceAdded={() => setRefreshKey(k => k + 1)} />

        <div className="mt-8">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            Latest drops
          </h2>
          <ResourceFeed refreshKey={refreshKey} />
        </div>
      </div>
    </main>
  )
}
