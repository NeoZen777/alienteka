"use client"
import { useEffect, useState } from 'react'
import { formatRelativeTime, getInitials } from '@/lib/utils'
import { CommentForm } from './CommentForm'
import type { Comment as CommentType } from '@/types'
import { useAuth } from '@/hooks/useAuth'

interface Author {
  id: string
  username: string
  avatar?: string | null
}
type CommentItem = CommentType & { replies?: CommentType[] }

export function CommentList({ articleId }: { articleId: string }) {
  const [comments, setComments] = useState<CommentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { user } = useAuth()

  const load = async (p = page) => {
    setLoading(true)
    const res = await fetch(`/api/comments?articleId=${articleId}&page=${p}`)
    const data = await res.json()
    setComments(data.data || [])
    if (data.pagination) {
      setTotalPages(data.pagination.totalPages)
      setPage(data.pagination.page)
    }
    setLoading(false)
  }

  useEffect(() => { load(1) }, [articleId])

  const addNew = (c: CommentItem) => {
    if (c.replies) c.replies = []
    if (c && c['parentId']) {
      // If backend returned parentId we could insert, but we keep simple; reload.
      load();
    } else {
      setComments(prev => [c, ...prev])
    }
    setReplyTo(null)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-orbitron text-green-400">💬 Comentarios</h3>
  {/* Show form only to authenticated users; CommentForm handles auth UI */}
  <CommentForm articleId={articleId} onCreated={addNew} />
      {loading && <p className="text-green-300 animate-pulse">Cargando...</p>}
      {!loading && comments.length === 0 && <p className="text-green-500 text-sm">Sé el primero en comentar.</p>}
      <ul className="space-y-4">
        {comments.map(c => (
          <li key={c.id} className="border border-green-800 rounded p-3 bg-black/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-black text-xs font-bold">
                {c.author?.avatar ? <img src={c.author.avatar} alt={c.author.username} className="w-8 h-8 rounded-full" /> : getInitials(c.author?.username ?? 'Anon')}
              </div>
              <div className="flex-1">
                <span className="text-green-300 text-sm font-semibold">{c.author?.username ?? 'Anon'}</span>
                <span className="text-green-600 text-xs ml-2">{formatRelativeTime(c.createdAt)}</span>
              </div>
              <button onClick={() => setReplyTo(replyTo === c.id ? null : c.id)} className="text-green-400 text-xs hover:underline">Responder</button>
            </div>
            <p className="text-green-200 text-sm whitespace-pre-wrap mb-2">{c.content}</p>
            <div className="flex items-center gap-3 text-xs text-green-500 mb-2">
              <VoteButtons commentId={c.id} />
              <span>↑ {c['upvotes'] ?? 0} / ↓ {c['downvotes'] ?? 0}</span>
            </div>
            {replyTo === c.id && (
              <div className="mt-2 pl-4 border-l border-green-800">
                <CommentForm articleId={articleId} parentId={c.id} onCreated={addNew} />
              </div>
            )}
            {c.replies && c.replies.length > 0 && (
              <ul className="mt-3 pl-4 space-y-3 border-l border-green-900">
                {c.replies.map(r => (
                  <li key={r.id} className="bg-black/40 p-2 rounded border border-green-900">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-green-700 flex items-center justify-center text-black text-[10px] font-bold">
                        {r.author?.avatar ? <img src={r.author.avatar} alt={r.author.username} className="w-6 h-6 rounded-full" /> : getInitials(r.author?.username ?? 'Anon')}
                      </div>
                      <span className="text-green-300 text-xs font-semibold">{r.author?.username ?? 'Anon'}</span>
                      <span className="text-green-600 text-[10px] ml-1">{formatRelativeTime(r.createdAt)}</span>
                    </div>
                    <p className="text-green-200 text-xs whitespace-pre-wrap">{r.content}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <div className="flex gap-2 justify-center pt-2">
          <button disabled={page===1} onClick={()=>load(page-1)} className="px-2 py-1 text-xs border border-green-700 rounded disabled:opacity-30">Prev</button>
          <span className="text-green-400 text-xs">{page} / {totalPages}</span>
          <button disabled={page===totalPages} onClick={()=>load(page+1)} className="px-2 py-1 text-xs border border-green-700 rounded disabled:opacity-30">Next</button>
        </div>
      )}
    </div>
  )
}

function VoteButtons({ commentId }: { commentId: string }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [state, setState] = useState<{ upvotes: number; downvotes: number } | null>(null)
  const act = async (vote: 'up' | 'down') => {
    setLoading(true)
    const res = await fetch(`/api/comments?commentId=${commentId}&vote=${vote}`, { method: 'PATCH' })
    const data = await res.json()
    setLoading(false)
    if (res.ok) setState({ upvotes: data.data.upvotes, downvotes: data.data.downvotes })
  }
  return (
    <div className="flex items-center gap-1">
      <button onClick={()=>act('up')} disabled={loading} className="text-green-400 hover:text-green-300">▲</button>
      <button onClick={()=>act('down')} disabled={loading} className="text-green-400 hover:text-green-300">▼</button>
      {state && <span className="text-green-500">{state.upvotes - state.downvotes}</span>}
    </div>
  )
}
