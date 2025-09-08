import ArticleCard from '@/components/articles/ArticleCard'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Artículos | ALIENTEKA',
}

export default async function ArticlesPage() {
  const articles: { id: string; title: string; slug: string; excerpt?: string; content: any; createdAt: Date; publishedAt?: Date }[] = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-400 font-orbitron mb-6">📚 Artículos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a as any} />
        ))}
      </div>
    </div>
  )
}
