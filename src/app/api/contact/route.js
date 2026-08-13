import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'bkgetmom@gmail.com';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    const emailSubject = subject?.trim() ? `${subject} — Portfolio Contact` : `New portfolio contact from ${name}`;

    // Premium dark-themed HTML email layout
    const emailHtml = `
      <div style="background-color: #05050a; padding: 30px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc; max-width: 600px; margin: 0 auto; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <div style="background: linear-gradient(135deg, #00f2fe 0%, #7f00ff 100%); padding: 2px; border-radius: 12px; margin-bottom: 25px;">
          <div style="background-color: #0d0d19; padding: 20px; border-radius: 10px; text-align: center;">
            <h2 style="margin: 0; font-size: 22px; font-weight: 800; color: #00f2fe; letter-spacing: -0.01em;">New Portfolio Message</h2>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #94a3b8;">Incoming contact request from your portfolio website</p>
          </div>
        </div>
        
        <div style="background-color: #0c0c16; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 24px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; width: 100px; font-weight: 600;">Sender</td>
              <td style="padding: 6px 0; font-size: 15px; color: #f8fafc; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Email</td>
              <td style="padding: 6px 0; font-size: 15px; color: #00f2fe; font-weight: 500;">
                <a href="mailto:${email}" style="color: #00f2fe; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Subject</td>
              <td style="padding: 6px 0; font-size: 15px; color: #cbd5e1;">${subject || '(none)'}</td>
            </tr>
          </table>
        </div>
        
        <div style="background-color: #0c0c16; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 24px;">
          <h3 style="margin: 0 0 12px 0; font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Message Content</h3>
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #cbd5e1; white-space: pre-wrap;">${message.replace(/\n/g, '<br/>')}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #64748b; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px;">
          Sent from Biruk Getaneh's Data Engineering Portfolio
        </div>
      </div>
    `;

    // Strategy 1: Check Resend
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: emailSubject,
        html: emailHtml,
      });
      return NextResponse.json({ success: true, method: 'resend' });
    }

    // Strategy 2: Check Gmail SMTP / Custom Nodemailer
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '465'),
        secure: process.env.EMAIL_SECURE !== 'false', // true for 465, false for 587
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${name} (Portfolio)" <${process.env.EMAIL_USER}>`,
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: emailSubject,
        html: emailHtml,
      });
      return NextResponse.json({ success: true, method: 'smtp' });
    }

    // Default: Not Configured
    return NextResponse.json(
      { error: 'Email service not configured. Please set RESEND_API_KEY (for Resend) or EMAIL_USER and EMAIL_PASS (for SMTP/Gmail) in Vercel settings.' },
      { status: 500 }
    );

  } catch (error) {
    console.error('Contact email error:', error);
    return NextResponse.json(
      { error: error.message || 'Unable to send message. Please try again later.' },
      { status: 500 }
    );
  }
}