import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { supabaseAdmin } from './supabase'

export async function getRequestUser(request: Request) {
  // Try cookie session first
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    if (user) return user
  } catch {
    // ignore
  }
  // Fallback: Authorization Bearer token
  const auth = request.headers.get('authorization') || request.headers.get('Authorization')
  if (auth?.startsWith('Bearer ')) {
    const token = auth.slice(7)
    if (supabaseAdmin) {
      try {
        const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
        if (!error && user) return user
      } catch {
        // ignore
      }
    }
  }
  return null
}