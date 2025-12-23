import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
	try {
		const supabase = await createServerClient()
		const { data, error } = await supabase
			.from("team_members")
			.select("*")
			.order("display_order", { ascending: true })

		if (error) throw error

		return NextResponse.json(data || [])
	} catch (error) {
		console.error("Error fetching team members:", error)
		return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 })
	}
}

export async function POST(request: Request) {
	try {
		const supabase = await createServerClient()
		const body = await request.json()

		const { data, error } = await supabase
			.from("team_members")
			.insert([body])
			.select()

		if (error) throw error

		return NextResponse.json(data[0])
	} catch (error) {
		console.error("Error creating team member:", error)
		return NextResponse.json({ error: "Failed to create team member" }, { status: 500 })
	}
}
