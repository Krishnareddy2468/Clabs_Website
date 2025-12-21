import { supabase } from './lib/supabase'

async function testConnection() {
  console.log('Testing Supabase connection...')
  console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('Key configured:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  
  // Test connection
  const { data, error } = await supabase
    .from('events')
    .select('count')
    .limit(1)
  
  if (error) {
    console.error('❌ Connection error:', error.message)
    console.log('\n📋 Next steps:')
    console.log('1. Go to https://app.supabase.com/project/_/sql')
    console.log('2. Click "New query"')
    console.log('3. Copy the contents of supabase-setup.sql')
    console.log('4. Paste and click "Run"')
  } else {
    console.log('✅ Connected successfully!')
    console.log('Data:', data)
  }
}

testConnection()
