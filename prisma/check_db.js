// Prints first rows from categories and articles for verification
require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const categories = await prisma.category.findMany({ take: 10, orderBy: { name: 'asc' } })
  const articles = await prisma.article.findMany({ take: 10, orderBy: { createdAt: 'desc' } })

  console.log(JSON.stringify({ categories, articles }, null, 2))
}

main()
  .catch((e) => {
    console.error('ERROR', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
