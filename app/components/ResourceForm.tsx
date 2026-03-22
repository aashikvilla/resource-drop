'use client'

import { useState } from 'react'
import { supabase, Tag, TAG_COLORS } from '@/lib/supabase'

const TAGS: Tag[] = ['design', 'product', 'tech', 'career', 'general']

type Props = {
  onResourceAdded: () => void
}

export default function ResourceForm({ onResourceAdded }: Props) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [tag, setTag] = useState<Tag>('general')
  const [submittedBy, setSubmittedBy] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!title.trim() || !url.trim() || !submittedBy.trim()) {
      setError('All fields are required.')
      return
    }

    let normalizedUrl = url.trim()
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = 'https://' + normalizedUrl
    }

    setLoading(true)
    const { error: insertError } = await supabase.from('resources').insert({
      title: title.trim(),
      url: normalizedUrl,
      tag,
      submitted_by: submittedBy.trim(),
    })

    setLoading(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    setTitle('')
    setUrl('')
    setTag('general')
    setSubmittedBy('')
    onResourceAdded()
  }

  const inputClass =
    'w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors'

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 space-y-4">
      <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Drop a resource</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className={inputClass}
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select
          value={tag}
          onChange={e => setTag(e.target.value as Tag)}
          className={`${inputClass} cursor-pointer`}
        >
          {TAGS.map(t => (
            <option key={t} value={t} className="bg-zinc-900 capitalize">
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Your name"
          value={submittedBy}
          onChange={e => setSubmittedBy(e.target.value)}
          className={inputClass}
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  )
}
