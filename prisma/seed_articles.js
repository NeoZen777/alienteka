/* eslint-disable no-console */
require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')
const crypto = require('crypto')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding articles...')

  // Ensure there's at least one category
  const category = await prisma.category.findFirst()
  if (!category) {
    throw new Error('No categories found; run db:seed first')
  }

  // Upsert an author by email
  const authorEmail = 'seed@alienteka.local'
  const author = await prisma.user.upsert({
    where: { email: authorEmail },
    update: { lastActive: new Date() },
    create: {
      id: crypto.randomUUID(),
      username: 'seed_author',
      email: authorEmail,
      fullName: 'Seed Author',
      role: 'CONTRIBUTOR',
    },
  })

  // Sample articles data
  const samples = [
    {
      title: 'El Caso Roswell — Un Resumen Crítico',
      slug: 'el-caso-roswell-un-resumen-critico',
      excerpt: 'Un repaso de la evidencia y las inconsistencias del famoso caso de 1947.',
      content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Roswell ha sido objeto de debate por décadas...' }] }] },
      tags: ['roswell', 'historia'],
    },
    {
      title: 'Análisis de los Videos UAP del Pentágono',
      slug: 'analisis-videos-uap-pentagono',
      excerpt: 'Revisión científica del material publicado por el gobierno.',
      content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Los videos muestran fenómenos aéreos no identificados...' }] }] },
      tags: ['uap', 'videos', 'ciencia'],
    },
    {
      title: 'Luces sobre Londres: Testimonios y Datos',
      slug: 'luces-sobre-londres-testimonios-datos',
      excerpt: 'Compilación de reportes de testigos y análisis de credibilidad.',
      content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Múltiples observadores reportaron luces inusuales...' }] }] },
      tags: ['luces', 'reportes'],
    }
  ]

  for (const s of samples) {
    // check if article exists
    const existing = await prisma.article.findUnique({ where: { slug: s.slug } })
    if (existing) {
      console.log('Article exists, skipping:', s.slug)
      continue
    }

    const created = await prisma.article.create({
      data: {
        title: s.title,
        slug: s.slug,
        excerpt: s.excerpt,
        content: s.content,
        tags: s.tags,
        status: 'PUBLISHED',
        authorId: author.id,
        categoryId: category.id,
        publishedAt: new Date(),
      },
    })
    console.log('Created article:', created.slug)
  }

  console.log('Article seeding done')
}

main()
  .catch((e) => {
    console.error('ERROR', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
