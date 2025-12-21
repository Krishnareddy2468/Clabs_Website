import { createClient } from '@supabase/supabase-js'
import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    const { data, error } = await supabase
      .from('schools')
      .select('id, name, logo_url, banner_url')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json([])
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching schools:', error)
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const { name, logo_url, banner_url } = await request.json()

    console.log('Creating school:', { name, logo_url, banner_url })

    const { data, error } = await supabase
      .from("schools")
      .insert([{ name, logo_url, banner_url }])
      .select()
      .single()

    if (error) {
      console.error('Error creating school:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('Created school:', data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Exception creating school:', error)
    return NextResponse.json({ error: 'Failed to create school' }, { status: 500 })
  }
}
