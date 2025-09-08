/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding...')

  // Categories
  const categories = [
    { name: 'Casos Históricos', slug: 'casos-historicos', description: 'Casos OVNI clásicos y documentados' },
    { name: 'Análisis Científico', slug: 'analisis-cientifico', description: 'Estudios y evidencia' },
    { name: 'Encuentros Cercanos', slug: 'encuentros-cercanos', description: 'CE1, CE2, CE3, CE4' },
  ]
  for (const c of categories) {
    await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c })
  }

  const authorId = process.env.SEED_AUTHOR_ID // opcional: UUID de un usuario de Supabase ya existente
  if (authorId) {
    const cat = await prisma.category.findFirst()
    if (cat) {
      await prisma.article.upsert({
        where: { slug: 'primer-articulo' },
        update: {},
        create: {
          title: 'Primer Artículo',
          slug: 'primer-articulo',
          excerpt: 'Contenido inicial de prueba',
          content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Hola ALIENTEKA' }] }] },
          tags: ['inicio'],
          status: 'PUBLISHED',
          authorId,
          categoryId: cat.id,
          publishedAt: new Date(),
        },
      })
    }
  }

  console.log('Seed completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
