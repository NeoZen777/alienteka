require('dotenv').config({ path: '.env.local' })
const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
if (!url || !anon) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(url, anon)

const samplePath = path.join(__dirname, 'upload-sample.txt')
fs.writeFileSync(samplePath, 'Upload test from local script at ' + new Date().toISOString())

async function run() {
  try {
    const fileBuffer = fs.readFileSync(samplePath)
  const dest = `test-uploads/${Date.now()}-upload-sample.txt`
    console.log('Uploading to', dest)
  const { data, error } = await supabase.storage.from('uploads').upload(dest, fileBuffer, { upsert: false })
    if (error) {
      console.error('Upload error:', error)
      process.exit(2)
    }
  console.log('Upload success:', data)
  const pub = supabase.storage.from('uploads').getPublicUrl(dest)
    console.log('Public URL:', pub.data.publicUrl)
  } catch (err) {
    console.error('Exception:', err)
    process.exit(3)
  }
}

run()
