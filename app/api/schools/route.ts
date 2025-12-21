import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("schools")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error('Error fetching schools:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('Fetched schools:', data)
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Exception fetching schools:', error)
    return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 })
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
