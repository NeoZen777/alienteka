"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

interface CommentFormProps {
  articleId: string
  parentId?: string
  onCreated?: (c: any) => void
  className?: string
}

export function CommentForm({ articleId, parentId, onCreated, className }: CommentFormProps) {
  const { user, loading } = useAuth()
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert('Debes iniciar sesión para comentar')
      return
    }
    if (!content.trim()) return
    setSubmitting(true)
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, articleId, parentId }),
    })
    const data = await res.json()
    setSubmitting(false)
    if (res.ok) {
      setContent('')
      onCreated?.(data.data)
    } else {
      alert(data.error || 'Error')
    }
  }

  if (loading) return <p className="text-green-300 text-sm">Comprobando sesión…</p>

  if (!user) {
    return (
      <div className={className}>
        <p className="text-green-300 text-sm">Inicia sesión para poder comentar.</p>
        <div className="mt-2 flex gap-2">
          <Link href="/auth/login" className="text-sm px-3 py-1 rounded bg-green-600 text-black">Iniciar sesión</Link>
          <Link href="/auth/register" className="text-sm px-3 py-1 rounded border border-green-600 text-green-200">Registrarse</Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className={"space-y-2 "+(className||'')}> 
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder="Escribe un comentario..."
        className="w-full p-2 bg-black/60 border border-green-700 rounded text-green-200 text-sm"
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={submitting || !content.trim()} className="bg-green-600 hover:bg-green-700 text-black px-4 py-1 h-auto">
          {submitting ? 'Enviando...' : 'Comentar'}
        </Button>
      </div>
    </form>
  )
}
