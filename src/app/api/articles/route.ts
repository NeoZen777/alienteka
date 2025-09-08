import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { slugify } from '@/lib/utils'

export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { title, excerpt, content, categoryId, tags = [], status = 'PUBLISHED', coverImage, metaTitle, metaDescription, featured = false } = body

  if (!title || !categoryId || !content) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const slug = slugify(title)

  try {
    const created = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        categoryId,
        authorId: user.id,
        tags,
        status,
        coverImage,
        metaTitle,
        metaDescription,
        featured,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      },
    })
    return NextResponse.json({ id: created.id, slug: created.slug })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
