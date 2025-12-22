import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from("featured_videos")
      .select("*")
      .eq("active", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch videos:", error);
      return NextResponse.json(
        { error: "Failed to fetch videos" },
        { status: 500 }
      );
    }

    return NextResponse.json({ videos: data });
  } catch (error: any) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, youtube_url, display_order, active } = await request.json();

    if (!title || !youtube_url) {
      return NextResponse.json(
        { error: "Title and YouTube URL are required" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from("featured_videos")
      .insert([
        {
          title,
          description,
          youtube_url,
          display_order: display_order || 0,
          active: active !== false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Failed to create video:", error);
      return NextResponse.json(
        { error: "Failed to create video" },
        { status: 500 }
      );
    }

    return NextResponse.json({ video: data });
  } catch (error: any) {
    console.error("Error creating video:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create video" },
      { status: 500 }
    );
  }
}
