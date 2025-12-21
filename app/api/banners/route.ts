import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Fetch schools that have banner images
    const { data, error } = await supabase
      .from('schools')
      .select('id, name, banner_url, logo_url')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json([])
    }

    // Transform to match Banner interface - use banner_url or logo_url
    const banners = (data || [])
      .filter(school => school.banner_url || school.logo_url)
      .map(school => ({
        id: school.id,
        title: school.name,
        image_url: school.banner_url || school.logo_url
      }))

    return NextResponse.json(banners)
  } catch (error) {
    console.error('Error fetching banners:', error)
    return NextResponse.json([])
  }
}
