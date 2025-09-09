import { createClient } from '@supabase/supabase-js'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

// Use auth-helpers browser client on the client so sessions are saved to HTTP cookies
export const supabase = typeof window !== 'undefined'
  ? createBrowserSupabaseClient()
  : createClient(supabaseUrl, supabaseKey)

// Server-side client with service role key (optional for admin operations)
export const supabaseAdmin = process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  : null
