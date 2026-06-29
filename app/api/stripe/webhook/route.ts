import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createUser, getUserByEmail } from "@/lib/db";
import { sendSetupEmail } from "@/lib/email";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email =
      session.customer_email ||
      session.customer_details?.email ||
      null;

    if (email) {
      try {
        const existing = getUserByEmail(email.toLowerCase());
        if (!existing) {
          const { setupToken } = createUser(email.toLowerCase());
          await sendSetupEmail(email, setupToken);
        }
      } catch (error) {
        console.error("Failed to create user or send email:", error);
        return NextResponse.json(
          { error: "Internal error" },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
