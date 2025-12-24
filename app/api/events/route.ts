import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching events:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('Fetched events:', data)
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Exception fetching events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, date, location, image_url, amount } = await request.json()

    console.log('Creating event:', { title, description, date, location, image_url, amount })

    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('events')
      .insert([{ title, description, date, location, image_url, amount: amount || 0 }])
      .select()
      .single()

    if (error) {
      console.error('Error creating event:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('Created event:', data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Exception creating event:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}

// PUT - Update an event
export async function PUT(request: NextRequest) {
  const body = await request.json()

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('events')
    .update({
      title: body.title,
      description: body.description,
      date: body.date,
      image: body.image,
    })
    .eq('id', body.id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0])
}

// DELETE - Delete an event
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Event ID required' }, { status: 400 })
  }

  const supabase = createServiceClient()
  const { error } = await supabase.from('events').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
