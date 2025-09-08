import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const data = await prisma.sighting.findMany({
    select: {
      id: true,
      latitude: true,
      longitude: true,
      description: true,
      credibility: true,
      verified: true,
      location: true,
      sightingType: true,
      dateOccurred: true,
    },
    orderBy: { dateOccurred: 'desc' },
    take: 200,
  })

  return NextResponse.json({ data })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { location, latitude, longitude, dateOccurred, sightingType, description, credibility = 5, verified = false, reporterId, articleId, witnessCount = 1 } = body
  if (!location || latitude == null || longitude == null || !dateOccurred || !sightingType || !description) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }
  const created = await prisma.sighting.create({
    data: {
      location,
      latitude,
      longitude,
      dateOccurred: new Date(dateOccurred),
      sightingType,
      description,
      credibility,
      verified,
      reporterId: reporterId ?? null,
      articleId: articleId ?? null,
      witnessCount,
    },
  })
  return NextResponse.json({ id: created.id })
}
