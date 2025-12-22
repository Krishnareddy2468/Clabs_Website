import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const { status } = await request.json()
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from("contacts")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Failed to update contact:", error);
      return NextResponse.json(
        { error: "Failed to update contact" },
        { status: 500 }
      );
    }

    return NextResponse.json({ contact: data });
  } catch (error: any) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update contact" },
      { status: 500 }
    );
  }
}
