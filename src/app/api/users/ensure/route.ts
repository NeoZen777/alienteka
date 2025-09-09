import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { prisma } from '@/lib/prisma'

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const username = (user.user_metadata?.username as string | undefined) || user.email?.split('@')[0] || 'user'

  await prisma.user.upsert({
    where: { id: user.id },
    update: {
      email: user.email ?? undefined,
      lastActive: new Date(),
    },
    create: {
      id: user.id,
      email: user.email ?? '',
      username,
      fullName: (user.user_metadata?.full_name as string | undefined) || undefined,
      avatar: (user.user_metadata?.avatar_url as string | undefined) || undefined,
      role: 'READER',
    },
  })

  return NextResponse.json({ ok: true })
}
