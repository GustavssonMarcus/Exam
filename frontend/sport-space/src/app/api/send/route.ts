import { NextRequest, NextResponse } from 'next/server';
import { EmailTemplate } from '@/app/components/emailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // Läs in data från förfrågan
    const body = await req.json();

    const { to, subject, firstName, message } = body;

    if (!to || !subject || !firstName || !message) {
      return NextResponse.json(
        { error: 'Alla fält (to, subject, firstName, message) är obligatoriska.' },
        { status: 400 }
      );
    }

    // Skicka e-post via Resend
    const data = await resend.emails.send({
      from: 'SportSpace <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: subject,
      react: EmailTemplate({ firstName, message }),
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Ett fel inträffade vid skickandet av e-post.' },
      { status: 500 }
    );
  }
}
