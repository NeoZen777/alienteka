"use client"
import { useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useAuth } from '@/hooks/useAuth'

interface Props {
  value: unknown
  onChange: (json: unknown) => void
}

export function RichTextEditor({ value, onChange }: Props) {
  const { user, loading } = useAuth()

  const editor = useEditor({
    extensions: [StarterKit],
    content: value as any,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON())
    },
    // avoid SSR hydration mismatches
    immediatelyRender: false,
  })

  // Basic image upload handler (prompts file input)
  const uploadImage = async () => {
    if (!user) {
      alert('Necesitas iniciar sesión para subir imágenes')
      return
    }
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      const path = `articles/${Date.now()}-${file.name}`
  const form = new FormData()
  form.append('file', file)
  const res = await fetch('/api/upload', { method: 'POST', body: form })
  const data = await res.json()
  if (!res.ok) { alert(data.error || 'Error subiendo imagen'); return }
  editor?.chain().focus().setParagraph().insertContent(`<img src="${data.url}" alt="image" />`).run()
    }
    input.click()
  }

  useEffect(() => {
    return () => { editor?.destroy() }
  }, [editor])

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 text-xs">
        <button type="button" onClick={()=>editor?.chain().focus().toggleBold().run()} className="px-2 py-1 border border-green-700 rounded hover:bg-green-700/20">B</button>
        <button type="button" onClick={()=>editor?.chain().focus().toggleItalic().run()} className="px-2 py-1 border border-green-700 rounded hover:bg-green-700/20 italic">I</button>
        <button type="button" onClick={()=>editor?.chain().focus().toggleBulletList().run()} className="px-2 py-1 border border-green-700 rounded hover:bg-green-700/20">• Lista</button>
        <button type="button" onClick={()=>editor?.chain().focus().toggleHeading({level:2}).run()} className="px-2 py-1 border border-green-700 rounded hover:bg-green-700/20">H2</button>
        <button type="button" onClick={uploadImage} disabled={!user} title={!user ? 'Inicia sesión para subir imágenes' : 'Subir imagen'} className="px-2 py-1 border border-green-700 rounded hover:bg-green-700/20 disabled:opacity-40">Imagen</button>
      </div>
      {!user && <p className="text-xs text-yellow-400">Inicia sesión para poder subir imágenes al artículo.</p>}
      <div className="rounded border border-green-800 bg-black/60 min-h-[220px] p-3 prose prose-invert max-w-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
