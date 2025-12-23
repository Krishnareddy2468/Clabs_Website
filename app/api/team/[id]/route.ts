import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function PUT(
	request: Request,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const supabase = await createServerClient()
		const body = await request.json()
		const { id } = await context.params

		const { data, error } = await supabase
			.from("team_members")
			.update(body)
			.eq("id", id)
			.select()

		if (error) throw error

		return NextResponse.json(data[0])
	} catch (error) {
		console.error("Error updating team member:", error)
		return NextResponse.json({ error: "Failed to update team member" }, { status: 500 })
	}
}

export async function DELETE(
	request: Request,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const supabase = await createServerClient()
		const { id } = await context.params

		const { error } = await supabase.from("team_members").delete().eq("id", id)

		if (error) throw error

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error("Error deleting team member:", error)
		return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 })
	}
}
