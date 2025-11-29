import { NextResponse } from "next/server";

const webhookEndpoint = process.env.STRIPE_WEBHOOK_ENDPOINT;

export async function POST(request: Request) {
  if (!webhookEndpoint) {
    return NextResponse.json(
      { error: "Stripe webhook endpoint not configured." },
      { status: 500 }
    );
  }

  try {
    const body = await request.text();
    const headersList = Object.fromEntries(request.headers.entries());

    const response = await fetch(webhookEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headersList,
      },
      body,
    });

    if (!response.ok) {
      throw new Error(`Webhook forward failed: ${response.status}`);
    }

    return NextResponse.json({ forwarded: true });
  } catch (error) {
    console.error("Webhook forward error:", error);
    return NextResponse.json({ error: "Forward failed" }, { status: 500 });
  }
}