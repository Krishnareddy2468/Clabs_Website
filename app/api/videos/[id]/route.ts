import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, description, youtube_url, display_order, active } = await request.json();
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from("featured_videos")
      .update({
        title,
        description,
        youtube_url,
        display_order,
        active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      console.error("Failed to update video:", error);
      return NextResponse.json(
        { error: "Failed to update video" },
        { status: 500 }
      );
    }

    return NextResponse.json({ video: data });
  } catch (error: any) {
    console.error("Error updating video:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update video" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServiceClient();

    const { error } = await supabase
      .from("featured_videos")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("Failed to delete video:", error);
      return NextResponse.json(
        { error: "Failed to delete video" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting video:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete video" },
      { status: 500 }
    );
  }
}
