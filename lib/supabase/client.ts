'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not configured')
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}
