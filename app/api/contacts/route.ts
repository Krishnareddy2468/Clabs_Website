import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createServiceClient()

    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Failed to fetch contacts:", error)
      return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
    }

    return NextResponse.json({ contacts: data })
  } catch (error: any) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch contacts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    const { data, error } = await supabase
      .from("contacts")
      .insert([
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone?.trim() || null,
          message: message.trim(),
          status: "unread",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Failed to save contact:", error)
      return NextResponse.json({ error: "Failed to save contact" }, { status: 500 })
    }

    // TODO: Send email notification to clabs2023@gmail.com
    // You can integrate an email service like Resend, SendGrid, or Nodemailer here

    return NextResponse.json({ success: true, contact: data })
  } catch (error: any) {
    console.error("Error processing contact:", error)
    return NextResponse.json({ error: error.message || "Failed to process contact" }, { status: 500 })
  }
}
