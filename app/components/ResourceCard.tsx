import { Resource, TAG_COLORS } from '@/lib/supabase'

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString()
}

export default function ResourceCard({ resource }: { resource: Resource }) {
  const colors = TAG_COLORS[resource.tag] ?? TAG_COLORS.general

  return (
    <div className="group bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-100 font-medium text-sm leading-snug hover:text-white hover:underline underline-offset-2 flex-1"
        >
          {resource.title}
        </a>
        <span
          className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full capitalize ${colors.bg} ${colors.text}`}
        >
          {resource.tag}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
        <span>{resource.submitted_by}</span>
        <span>·</span>
        <span>{relativeTime(resource.created_at)}</span>
      </div>
    </div>
  )
}
