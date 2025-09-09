"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

export function RichTextViewer({ content }: { content: unknown }) {
  const editor = useEditor({ editable: false, extensions: [StarterKit], content: content as any, immediatelyRender: false })
  useEffect(()=>()=>{editor?.destroy()},[editor])
  return <div className="prose prose-invert max-w-none"><EditorContent editor={editor} /></div>
}
