import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email: string | undefined = body.email || undefined;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 3000,
            product_data: {
              name: "NMLS Prep — Full Access",
              description:
                "660+ practice questions, 10 lessons, 125Q mock exam. Lifetime access.",
            },
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/login?setup=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/#pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
