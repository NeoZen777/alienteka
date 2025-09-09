import ArticleCard from '@/components/articles/ArticleCard'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

type ArticleListItem = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  createdAt: Date
  publishedAt: Date | null
}

export const metadata: Metadata = {
  title: 'Artículos | ALIENTEKA',
}

export default async function ArticlesPage() {
  const articles: ArticleListItem[] = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      createdAt: true,
      publishedAt: true,
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-green-400 font-orbitron">📚 Artículos</h1>
        <Link href="/articles/new" className="text-sm px-4 py-2 rounded bg-green-600 text-black font-semibold border border-green-400 hover:bg-green-500 transition">
          + Nuevo Artículo
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    </div>
  )
}
