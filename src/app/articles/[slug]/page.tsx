import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import React from 'react'

// Force dynamic rendering so the build does not prerender pages that require DB access
export const dynamic = 'force-dynamic'
import { CommentList } from '@/components/articles/CommentList'
import { formatDate } from '@/lib/utils'
import { RichTextViewer } from '@/components/articles/RichTextViewer'

export async function generateStaticParams() {
  // Return empty during build to avoid connecting to the database in static export.
  // The pages will be rendered dynamically at request time.
  return []
}

export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  let article = null
  try {
    article = await prisma.article.findUnique({ where: { slug }, include: { author: { select: { username: true } } } })
  } catch (e) {
    // If DB is unreachable during build/deploy, render a friendly placeholder.
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-orbitron text-green-400">Contenido temporalmente no disponible</h1>
        <p className="text-green-300">Nuestro servicio de base de datos no está accesible ahora mismo. Intenta recargar más tarde.</p>
      </div>
    )
  }
  if (!article) return notFound()

  // Basic renderer for stored JSON until Tiptap viewer component is added
  const jsonContent = article.content

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-green-400 font-orbitron mb-2">{article.title}</h1>
        <div className="text-xs text-green-500 flex gap-4">
          <span>Autor: {article.author?.username || 'Desconocido'}</span>
          {article.publishedAt && <span>Publicado: {formatDate(article.publishedAt)}</span>}
        </div>
        {article.excerpt && <p className="text-green-300 mt-4 text-lg">{article.excerpt}</p>}
        {article.coverImage && (
          <div className="mt-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={article.coverImage} alt={article.title} className="w-full max-h-[420px] object-cover rounded border border-green-800" />
          </div>
        )}
      </header>
      <article>
        <RichTextViewer content={jsonContent} />
      </article>
      <section>
        <CommentList articleId={article.id} />
      </section>
    </div>
  )
}
