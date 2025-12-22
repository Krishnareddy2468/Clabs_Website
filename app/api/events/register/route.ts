import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const {
      eventId,
      studentName,
      fatherName,
      schoolCollege,
      class: studentClass,
      mobileNumber,
      aadhaarNumber,
      city,
      state,
      amountPaid,
      paymentStatus,
    } = await request.json();

    // Validate required fields
    if (!eventId || !studentName || !mobileNumber) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Check if seats are available
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("available_seats, title")
      .eq("id", eventId)
      .single();

    if (eventError || !event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    if (event.available_seats <= 0) {
      return NextResponse.json(
        { error: "No seats available for this event" },
        { status: 400 }
      );
    }

    // Insert registration
    const { data: registration, error: registrationError } = await supabase
      .from("event_registrations")
      .insert([
        {
          event_id: eventId,
          student_name: studentName,
          father_name: fatherName,
          school_college: schoolCollege,
          class: studentClass,
          mobile_number: mobileNumber,
          aadhaar_number: aadhaarNumber,
          city,
          state,
          amount_paid: amountPaid,
          payment_status: paymentStatus,
        },
      ])
      .select()
      .single();

    if (registrationError) {
      console.error("Failed to save registration:", registrationError);
      return NextResponse.json(
        { error: "Failed to save registration" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      registrationId: registration.id,
      message: "Registration successful",
    });
  } catch (error: any) {
    console.error("Error processing registration:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process registration" },
      { status: 500 }
    );
  }
}
