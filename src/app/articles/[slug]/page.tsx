import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export async function generateStaticParams() {
  const articles: { slug: string }[] = await prisma.article.findMany({ select: { slug: true } })
  return articles.map((a) => ({ slug: a.slug }))
}

export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const article = await prisma.article.findUnique({ where: { slug } })
  if (!article) return notFound()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-400 font-orbitron mb-4">{article.title}</h1>
      {article.excerpt && <p className="text-green-300 mb-6">{article.excerpt}</p>}
      <article className="prose prose-invert max-w-none">
        <pre className="bg-black/60 p-4 rounded border border-green-700 text-green-200 overflow-auto">
{JSON.stringify(article.content, null, 2)}
        </pre>
      </article>
    </div>
  )
}
