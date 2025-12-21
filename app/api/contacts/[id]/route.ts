import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const { status } = await request.json()

  const { data, error } = await supabase
    .from("contact_responses")
    .update({ status })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
