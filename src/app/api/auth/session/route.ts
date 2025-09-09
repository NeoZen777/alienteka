import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import { getRequestUser } from '@/lib/auth'

export async function GET(request: Request) {
  const cookieStore = cookies()
  // @ts-ignore - getAll exists in Next 13/14 runtime
  const rawCookies = typeof cookieStore.getAll === 'function' ? cookieStore.getAll() : []
  const allCookies = rawCookies.map((c: any) => ({ name: c.name, valuePreview: (c.value || '').slice(0, 10) + '...' }))
  const hdrs = headers()
  // @ts-ignore
  const authHeader = typeof hdrs.get === 'function' ? (hdrs.get('authorization') || hdrs.get('Authorization')) : null

  const supabase = createRouteHandlerClient({ cookies })
  const result = await supabase.auth.getUser()
  const directUser = result.data.user
  const helperUser = await getRequestUser(request)

  return NextResponse.json({
    cookieUser: directUser || null,
    helperUser: helperUser || null,
    cookies: allCookies,
    hasAuthHeader: !!authHeader,
    authHeaderPreview: authHeader ? authHeader.slice(0, 16) + '...' : null,
    error: result.error?.message || null,
  })
}