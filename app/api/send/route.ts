import type { NextRequest } from 'next/server';
import { EmailTemplate } from '@/app/components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API);

const domain = process.env.DOMAIN_NAME;
const contactTo = process.env.CONTACT_TO_EMAIL;

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API || !domain || !contactTo) {
      return Response.json({ error: 'Email is not configured.' }, { status: 500 });
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
      from: `Cecile <contact@${domain}>`,
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
