import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

// GET /api/comments?articleId=...
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const articleId = searchParams.get('articleId')
  if (!articleId) return NextResponse.json({ error: 'articleId required' }, { status: 400 })
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = Math.min(50, parseInt(searchParams.get('limit') || '10', 10))
  const skip = (page - 1) * limit

  const [total, comments] = await Promise.all([
    prisma.comment.count({ where: { articleId, status: 'PUBLISHED', parentId: null } }),
    prisma.comment.findMany({
      where: { articleId, status: 'PUBLISHED', parentId: null },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        author: { select: { id: true, username: true, avatar: true } },
        replies: {
          where: { status: 'PUBLISHED' },
          orderBy: { createdAt: 'asc' },
          include: { author: { select: { id: true, username: true, avatar: true } } },
        },
      },
    }),
  ])

  return NextResponse.json({ data: comments, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } })
}

interface CommentCreatePayload {
  content: string
  articleId: string
  parentId?: string | null
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = (await request.json()) as CommentCreatePayload
  const { content, articleId, parentId } = body
  if (!content || !articleId) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        articleId,
        authorId: user.id,
        parentId: parentId || null,
        // status PENDING by default for moderation
      },
      include: { author: { select: { id: true, username: true, avatar: true } } },
    })
    return NextResponse.json({ data: comment })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// Voting (PATCH /api/comments?commentId=...&vote=up|down)
export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url)
  const commentId = searchParams.get('commentId')
  const vote = searchParams.get('vote') // 'up' | 'down'
  if (!commentId || !vote) return NextResponse.json({ error: 'commentId and vote required' }, { status: 400 })

  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (!['up', 'down'].includes(vote)) return NextResponse.json({ error: 'Invalid vote' }, { status: 400 })
  const value = vote === 'up' ? 1 : -1
  try {
    const existing = await prisma.commentVote.findUnique({ where: { userId_commentId: { userId: user.id, commentId } } })
    let deltaUp = 0
    let deltaDown = 0
    if (!existing) {
      await prisma.commentVote.create({ data: { userId: user.id, commentId, value } })
      if (value === 1) deltaUp = 1; else deltaDown = 1
    } else if (existing.value === value) {
      // remove vote (toggle off)
      await prisma.commentVote.delete({ where: { userId_commentId: { userId: user.id, commentId } } })
      if (value === 1) deltaUp = -1; else deltaDown = -1
    } else {
      await prisma.commentVote.update({ where: { userId_commentId: { userId: user.id, commentId } }, data: { value } })
      if (value === 1) { deltaUp = 1; deltaDown = -1 } else { deltaUp = -1; deltaDown = 1 }
    }
    const updated = await prisma.comment.update({ where: { id: commentId }, data: { upvotes: { increment: deltaUp }, downvotes: { increment: deltaDown } }, select: { id: true, upvotes: true, downvotes: true } })
    return NextResponse.json({ data: updated })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
