import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getRequestUser } from '@/lib/auth'

export async function GET(request: Request) {
  // Avoid using internal cookie/headers runtime helpers to prevent TS issues in the build pipeline.
  // We rely on createRouteHandlerClient({ cookies }) to read the Supabase session cookie on the server.
  const supabase = createRouteHandlerClient({ cookies })
  const result = await supabase.auth.getUser()
  const directUser = result.data.user
  const helperUser = await getRequestUser(request)

  // Minimal debug info, avoid any/ts-ignore usage
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization')

  return NextResponse.json({
    cookieUser: directUser || null,
    helperUser: helperUser || null,
    cookies: [],
    hasAuthHeader: !!authHeader,
    authHeaderPreview: authHeader ? authHeader.slice(0, 16) + '...' : null,
    error: result.error?.message || null,
  })
}