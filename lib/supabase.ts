import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Resource = {
  id: string
  title: string
  url: string
  tag: string
  submitted_by: string
  created_at: string
}

export type Tag = 'design' | 'product' | 'tech' | 'career' | 'general'

export const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  design:  { bg: 'bg-pink-500/20',   text: 'text-pink-400' },
  product: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
  tech:    { bg: 'bg-blue-500/20',   text: 'text-blue-400' },
  career:  { bg: 'bg-green-500/20',  text: 'text-green-400' },
  general: { bg: 'bg-zinc-500/20',   text: 'text-zinc-400' },
}
