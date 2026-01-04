import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServiceClient()
    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get('event_id')

    let query = supabase
      .from('event_feedback')
      .select('*')
      .order('created_at', { ascending: false })

    if (eventId) {
      query = query.eq('event_id', eventId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching event feedback:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Exception fetching event feedback:', error)
    return NextResponse.json({ error: 'Failed to fetch event feedback' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { event_id, name, email, phone, rating, feedback } = body

    // Validate required fields
    if (!event_id || !name || !email || !rating || !feedback) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    // Check if event exists and is completed
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('id, status')
      .eq('id', event_id)
      .single()

    if (eventError || !event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    if (event.status !== 'completed' && event.status !== 'ongoing') {
      return NextResponse.json(
        { error: 'Feedback can only be submitted for ongoing or completed events' },
        { status: 400 }
      )
    }

    // Insert feedback
    const { data, error } = await supabase
      .from('event_feedback')
      .insert([
        {
          event_id,
          name,
          email,
          phone: phone || null,
          rating,
          feedback,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating event feedback:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Exception creating event feedback:', error)
    return NextResponse.json({ error: 'Failed to create event feedback' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Feedback ID is required' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()
    const { error } = await supabase
      .from('event_feedback')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting event feedback:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Feedback deleted successfully' })
  } catch (error) {
    console.error('Exception deleting event feedback:', error)
    return NextResponse.json({ error: 'Failed to delete event feedback' }, { status: 500 })
  }
}
