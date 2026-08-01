import type { NextRequest } from "next/server";
import { Resend } from "resend";
import { MerchInquiryEmail } from "@/app/components/MerchInquiryEmail";
import { clientKey, rateLimit, sweep } from "@/app/lib/rateLimit";

const resend = new Resend(process.env.RESEND_API);

const MERCH_TO = "cecile.gardens@gmail.com";

// See /api/send — Resend's shared sender until a domain is verified.
const from = process.env.MAIL_FROM ?? "Cecile Gardens <onboarding@resend.dev>";

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API) {
      return Response.json({ error: "Email is not configured." }, { status: 500 });
    }

    sweep();
    const limit = rateLimit(`merch:${clientKey(request)}`);
    if (!limit.allowed) {
      return Response.json(
        { error: "Too many enquiries. Please try again later." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
      );
    }

    const body = await request.json().catch(() => null);

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const size = typeof body?.size === "string" ? body.size.trim() : "";
    const quantity = Number(body?.quantity) || 1;
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!name || !email || !size) {
      return Response.json(
        { error: "Name, email and size are required." },
        { status: 400 },
      );
    }

    if (!isEmail(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (quantity < 1 || quantity > 20) {
      return Response.json({ error: "Invalid quantity." }, { status: 400 });
    }

    if (message.length > 2000) {
      return Response.json({ error: "Message is too long." }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from,
      to: [MERCH_TO],
      replyTo: email,
      subject: `Merch enquiry — ${size} × ${quantity} from ${name}`,
      react: MerchInquiryEmail({ name, email, size, quantity, message }),
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ id: data?.id, remaining: limit.remaining });
  } catch {
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
