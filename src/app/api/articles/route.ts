import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { slugify } from '@/lib/utils'
import type { Prisma } from '@prisma/client'
import type { ArticleStatus } from '@/types'

interface ArticleCreatePayload {
  title: string
  excerpt?: string | null
  content: Prisma.InputJsonValue
  categoryId: string
  tags?: string[]
  status?: ArticleStatus
  coverImage?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  featured?: boolean
}

export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = (await request.json()) as ArticleCreatePayload
  const { title, excerpt, content, categoryId, tags = [], status = 'PUBLISHED', coverImage, metaTitle, metaDescription, featured = false } = body
  const allowedStatus: ArticleStatus[] = ['DRAFT','PENDING','PUBLISHED','REJECTED','ARCHIVED']
  const finalStatus: ArticleStatus = allowedStatus.includes(status as ArticleStatus) ? (status as ArticleStatus) : 'PUBLISHED'

  if (!title || !categoryId || !content) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const slug = slugify(title)

  try {
    const created = await prisma.article.create({
      data: {
        title,
        slug,
  content: content as Prisma.InputJsonValue,
        excerpt,
        categoryId,
        authorId: user.id,
        tags,
  status: finalStatus,
        coverImage,
        metaTitle,
        metaDescription,
        featured,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      },
    })
    return NextResponse.json({ id: created.id, slug: created.slug })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
