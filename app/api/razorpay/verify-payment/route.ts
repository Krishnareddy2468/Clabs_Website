import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData,
      eventDetails,
    } = await request.json();

    // Verify payment signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Payment verified successfully - save registration to database
    const supabase = createServiceClient();
    
    const { data: registration, error: registrationError } = await supabase
      .from("event_registrations")
      .insert([
        {
          event_id: eventDetails.id,
          student_name: formData.name,
          father_name: formData.fatherName,
          school_college: formData.schoolOrCollege,
          class: formData.class,
          mobile_number: formData.mobileNumber,
          aadhaar_number: formData.aadhaarNumber,
          city: formData.city,
          state: formData.state,
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          amount_paid: eventDetails.amount,
          payment_status: "completed",
        },
      ])
      .select()
      .single();

    if (registrationError) {
      console.error("Failed to save registration:", registrationError);
      console.error("Registration error details:", {
        message: registrationError.message,
        details: registrationError.details,
        hint: registrationError.hint,
        code: registrationError.code,
      });
      return NextResponse.json(
        { 
          error: "Payment verified but failed to save registration. Please contact support.",
          errorCode: registrationError.code,
          errorDetails: registrationError.message
        },
        { status: 500 }
      );
    }

    // Also store in contacts as backup (optional)
    const message = `Event Registration: ${eventDetails.title}\n\n` +
      `Name: ${formData.name}\n` +
      `Father's Name: ${formData.fatherName}\n` +
      `School/College: ${formData.schoolOrCollege}\n` +
      `Class: ${formData.class}\n` +
      `Mobile: ${formData.mobileNumber}\n` +
      `Aadhaar: ${formData.aadhaarNumber}\n` +
      `City: ${formData.city}\n` +
      `State: ${formData.state}\n\n` +
      `Payment Details:\n` +
      `Order ID: ${razorpay_order_id}\n` +
      `Payment ID: ${razorpay_payment_id}\n` +
      `Amount: ₹${eventDetails.amount}`;

    const contactResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/contacts`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: `${formData.mobileNumber}@registration.event`,
          phone: formData.mobileNumber,
          message: message,
        }),
      }
    );

    if (!contactResponse.ok) {
      console.error("Failed to store backup in contacts");
    }

    return NextResponse.json({
      success: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      registrationId: registration.id,
    });
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: error.message || "Failed to verify payment" },
      { status: 500 }
    );
  }
}
