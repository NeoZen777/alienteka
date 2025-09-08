"use client"

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function NewArticlePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Nuevo artículo"}]}]}')
  const [categoryId, setCategoryId] = useState('')
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])

  useEffect(() => {
    if (!loading && !user) router.replace('/auth/login')
  }, [loading, user, router])

  useEffect(() => {
    fetch('/api/categories').then((r) => r.json()).then(({ data }) => setCategories(data || [])).catch(() => {})
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, excerpt, content: JSON.parse(content), categoryId, status: 'PUBLISHED' }),
    })
    const data = await res.json()
    setSaving(false)
    if (res.ok) {
      router.replace(`/articles/${data.slug}`)
    } else {
      alert(data.error || 'Error al crear artículo')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-400 font-orbitron mb-6">📝 Nuevo Artículo</h1>
      <Card className="p-6 space-y-4 bg-black/80 border-2 border-green-600">
        <form onSubmit={submit} className="space-y-4">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" className="w-full p-2 bg-black border border-green-700 rounded" required />
          <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Resumen (opcional)" className="w-full p-2 bg-black border border-green-700 rounded" />
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full p-2 bg-black border border-green-700 rounded" required>
            <option value="" disabled>Selecciona categoría</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="w-full p-2 bg-black border border-green-700 rounded font-mono text-sm" />
          <Button type="submit" disabled={saving} className="bg-green-600 hover:bg-green-700 text-black">
            {saving ? 'Guardando...' : 'Publicar'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
