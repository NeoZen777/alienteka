import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
// Accept only the subset of fields actually used to avoid forcing callers to cast.
type ArticleCardData = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  createdAt: Date
  publishedAt: Date | null
}

export default function ArticleCard({ article }: { article: ArticleCardData }) {
  return (
    <Link href={`/articles/${article.slug}`}>
      <Card className="p-4 bg-black/80 border-2 border-green-600 hover:border-green-400 transition-colors shadow-[0_0_15px_rgba(0,255,0,0.2)]">
        <div className="flex items-start gap-4">
          {article.coverImage && (
            <Image src={article.coverImage} alt={article.title} width={96} height={96} className="w-24 h-24 object-contain rounded" />
          )}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-green-400 font-orbitron">{article.title}</h3>
            {article.excerpt && (
              <p className="text-green-300 text-sm mt-1 line-clamp-2">{article.excerpt}</p>
            )}
            <div className="text-green-500 text-xs mt-2">{new Date(article.publishedAt ?? article.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
