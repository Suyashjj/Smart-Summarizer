import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// Initialize Razorpay with your credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { planId, amount } = body;
    
    // Validate amount based on plan ID
    let validAmount = amount;
    if (planId === 'basic' && amount !== 149) {
      validAmount = 149; // Ensure basic plan is always 149
    } else if (planId === 'pro' && amount !== 249) {
      validAmount = 249; // Ensure pro plan is always 249
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: validAmount * 100, // Amount in paisa
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    });

    // Return order ID to client
    return NextResponse.json({ 
      orderId: order.id,
      status: 200 
    });
  } catch (error) {
    console.error("Error creating order:", error);
    
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}