import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Simple raw query to validate DB connectivity
    const result = await prisma.$queryRaw`SELECT 1 as ok`
    return NextResponse.json({ ok: true, result })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
