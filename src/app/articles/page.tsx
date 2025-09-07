import { demoArticles } from '@/lib/data'
import ArticleCard from '@/components/articles/ArticleCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artículos | ALIENTEKA',
}

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-400 font-orbitron mb-6">📚 Artículos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoArticles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    </div>
  )
}
