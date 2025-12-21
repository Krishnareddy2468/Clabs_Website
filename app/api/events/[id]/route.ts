import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const { title, description, date, location, image_url, amount } = await request.json()

    console.log('Updating event:', { id, title, description, date, location, image_url, amount })

    const { data, error } = await supabase
      .from("events")
      .update({ title, description, date, location, image_url, amount: amount || 0 })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error('Error updating event:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('Updated event:', data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Exception updating event:', error)
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    console.log('Deleting event:', id)
    
    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id)

    if (error) {
      console.error('Error deleting event:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Exception deleting event:', error)
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
}
