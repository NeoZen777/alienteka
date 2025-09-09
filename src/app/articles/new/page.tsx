"use client"

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RichTextEditor } from '@/components/articles/RichTextEditor'

export default function NewArticlePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState<unknown>({ type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Nuevo artículo' }] }] })
  const [categoryId, setCategoryId] = useState('')
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
  const [tags, setTags] = useState<string>('')
  const [coverImage, setCoverImage] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [featured, setFeatured] = useState(false)

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
  body: JSON.stringify({ title, excerpt, content, categoryId, status: 'PUBLISHED', tags: tags.split(',').map(t=>t.trim()).filter(Boolean), coverImage: coverImage || null, metaTitle: metaTitle || null, metaDescription: metaDescription || null, featured }),
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
          <RichTextEditor value={content} onChange={setContent} />
          <input value={tags} onChange={(e)=>setTags(e.target.value)} placeholder="Tags separadas por coma (ej: ovni, avistamiento)" className="w-full p-2 bg-black border border-green-700 rounded" />
          <input value={coverImage} onChange={(e)=>setCoverImage(e.target.value)} placeholder="URL de imagen de portada (opcional)" className="w-full p-2 bg-black border border-green-700 rounded" />
          <input value={metaTitle} onChange={(e)=>setMetaTitle(e.target.value)} placeholder="Meta Title (SEO opcional)" className="w-full p-2 bg-black border border-green-700 rounded" />
          <textarea value={metaDescription} onChange={(e)=>setMetaDescription(e.target.value)} placeholder="Meta Description (SEO opcional)" rows={2} className="w-full p-2 bg-black border border-green-700 rounded text-sm" />
          <label className="flex items-center gap-2 text-green-300 text-sm">
            <input type="checkbox" checked={featured} onChange={(e)=>setFeatured(e.target.checked)} className="accent-green-600" />
            Destacado
          </label>
          <Button type="submit" disabled={saving} className="bg-green-600 hover:bg-green-700 text-black">
            {saving ? 'Guardando...' : 'Publicar'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
