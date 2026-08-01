import type { NextRequest } from 'next/server';
import { EmailTemplate } from '@/app/components/EmailTemplate';
import { Resend } from 'resend';
import { clientKey, rateLimit, sweep } from '@/app/lib/rateLimit';

const resend = new Resend(process.env.RESEND_API);

const contactTo = 'cecile.gardens@gmail.com';

// Without a verified domain, Resend only accepts `onboarding@resend.dev` as the
// sender, and only delivers it to the Resend account owner's address — which is
// contactTo here. Set MAIL_FROM once a domain is verified to send branded mail.
const from = process.env.MAIL_FROM ?? 'Cecile Gardens <onboarding@resend.dev>';

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API) {
      return Response.json({ error: 'Email is not configured.' }, { status: 500 });
    }

    sweep();
    const limit = rateLimit(`contact:${clientKey(request)}`);
    if (!limit.allowed) {
      return Response.json(
        { error: 'Too many messages. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
      );
    }

    const body = await request.json().catch(() => null);

    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !message) {
      return Response.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (!isEmail(email)) {
      return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (message.length > 5000) {
      return Response.json({ error: 'Message is too long.' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from,
      to: [contactTo],
      replyTo: email,
      subject: `Inquiry from ${name}`,
      react: EmailTemplate({ name, email, message }),
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ id: data?.id });
  } catch {
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
