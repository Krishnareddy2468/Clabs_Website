import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

// Helper function to calculate event status based on date
function calculateEventStatus(eventDate: string): string {
  const now = new Date()
  const event = new Date(eventDate)
  
  // Reset time to compare only dates
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const eventDay = new Date(event.getFullYear(), event.getMonth(), event.getDate())
  
  if (eventDay.getTime() > today.getTime()) {
    return 'upcoming'
  } else if (eventDay.getTime() === today.getTime()) {
    return 'ongoing'
  } else {
    return 'completed'
  }
}

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

    // Calculate actual available seats and update status for each event
    const eventsWithCorrectSeats = await Promise.all(
      (data || []).map(async (event) => {
        const { count } = await supabase
          .from('event_registrations')
          .select('*', { count: 'exact', head: true })
          .eq('event_id', event.id)
          .eq('payment_status', 'completed')
        
        const registeredCount = count || 0
        const actualAvailableSeats = event.total_seats - registeredCount
        
        // Calculate correct status based on date
        const correctStatus = calculateEventStatus(event.date)
        
        // Update status in database if it's different
        if (event.status !== correctStatus) {
          await supabase
            .from('events')
            .update({ status: correctStatus })
            .eq('id', event.id)
        }
        
        return {
          ...event,
          status: correctStatus,
          available_seats: actualAvailableSeats
        }
      })
    )

    console.log('Fetched events with corrected seats:', eventsWithCorrectSeats)
    return NextResponse.json(eventsWithCorrectSeats)
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
