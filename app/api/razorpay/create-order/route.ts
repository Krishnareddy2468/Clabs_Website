import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: NextRequest) {
  try {
    // Check if Razorpay credentials are configured
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("Razorpay credentials missing");
      return NextResponse.json(
        { error: "Razorpay configuration is missing" },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const { amount, currency = "INR", receipt, notes } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const options = {
      amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
      currency,
      receipt,
      notes,
    };

    console.log("Creating Razorpay order with options:", { ...options, notes: "..." });
    const order = await razorpay.orders.create(options);
    console.log("Order created successfully:", order.id);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    console.error("Error details:", {
      message: error.message,
      description: error.error?.description,
      code: error.error?.code,
    });
    
    return NextResponse.json(
      { 
        error: error.error?.description || error.message || "Failed to create order",
        code: error.error?.code 
      },
      { status: 500 }
    );
  }
}
