const dotenv = require('dotenv')
dotenv.config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !anon) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(url, anon)

async function run() {
  try {
  console.log('Checking bucket "uploads" by trying to list first item...')
  const res = await supabase.storage.from('uploads').list('', { limit: 1 })
    console.log('Result:')
    console.dir(res, { depth: null })

    if (res.error) {
      console.error('ERROR:', res.error.message || res.error)
      process.exit(2)
    }

    if (Array.isArray(res.data)) {
      console.log('Bucket exists and is accessible. Items count (fetched):', res.data.length)
    } else {
      console.log('Unexpected response:', res.data)
    }
  } catch (err) {
    console.error('Exception:', err.message || err)
    process.exit(3)
  }
}

run()
