import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from("event_registrations")
      .select(`
        *,
        events (
          title,
          date
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch registrations:", error);
      return NextResponse.json(
        { error: "Failed to fetch registrations" },
        { status: 500 }
      );
    }

    return NextResponse.json({ registrations: data });
  } catch (error: any) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
