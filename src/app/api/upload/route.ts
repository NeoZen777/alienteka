import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { supabaseAdmin } from '@/lib/supabase'

// Max file size 5MB
const MAX_SIZE = 5 * 1024 * 1024
const ALLOWED_PREFIXES = ['image/']

export async function POST(req: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Service role no configurada' }, { status: 500 })
  }

  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'Archivo requerido (file)' }, { status: 400 })

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Archivo excede 5MB' }, { status: 400 })
    }
    if (!ALLOWED_PREFIXES.some(p => file.type.startsWith(p))) {
      return NextResponse.json({ error: 'Tipo de archivo no permitido' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const path = `users/${user.id}/${Date.now()}-${safeName}`

    const { error: uploadError } = await supabaseAdmin.storage.from('uploads').upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    })
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

    const { data: publicData } = supabaseAdmin.storage.from('uploads').getPublicUrl(path)
    return NextResponse.json({ url: publicData.publicUrl, path })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Error interno'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export const runtime = 'nodejs'