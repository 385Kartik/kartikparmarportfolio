import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to Kartik (notification)
    await transporter.sendMail({
      from: `"KARTIK Portfolio" <${process.env.SMTP_USER}>`,
      to: '385.kartik.p@gmail.com',
      replyTo: email,
      subject: `🚀 New Portfolio Inquiry from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 1px solid #1a1a2e; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 4px;">KARTIK</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 12px; letter-spacing: 2px;">NEW TRANSMISSION RECEIVED</p>
          </div>
          <div style="padding: 32px;">
            <div style="margin-bottom: 24px;">
              <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 4px;">Sender</p>
              <p style="color: #ffffff; font-size: 18px; margin: 0;">${name}</p>
            </div>
            <div style="margin-bottom: 24px;">
              <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 4px;">Email</p>
              <p style="color: #3b82f6; font-size: 16px; margin: 0;">${email}</p>
            </div>
            <div style="margin-bottom: 24px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
              <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px;">Message</p>
              <p style="color: #d1d5db; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="padding: 16px 32px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
            <p style="color: #4b5563; font-size: 11px; margin: 0;">KARTIK PORTFOLIO SYSTEM // SECURE TRANSMISSION</p>
          </div>
        </div>
      `,
    });

    // Auto-reply to the sender
    await transporter.sendMail({
      from: `"Kartik Parmar" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}! 🙌`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 1px solid #1a1a2e; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 4px;">KARTIK PARMAR</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 12px; letter-spacing: 2px;">FULL-STACK DEVELOPER & ENTREPRENEUR</p>
          </div>
          <div style="padding: 32px;">
            <p style="color: #d1d5db; font-size: 16px; line-height: 1.7; margin: 0 0 16px;">
              Hey ${name}! 👋
            </p>
            <p style="color: #d1d5db; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
              Thanks for reaching out through my portfolio. I've received your message and will get back to you within 24 hours.
            </p>
            <p style="color: #d1d5db; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
              In the meantime, feel free to check out my work:
            </p>
            <div style="margin: 24px 0; display: flex; gap: 12px;">
              <a href="https://github.com/385Kartik" style="display: inline-block; padding: 10px 20px; background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); border-radius: 8px; color: #3b82f6; text-decoration: none; font-size: 13px;">GitHub</a>
              <a href="https://www.linkedin.com/in/parmarkartik385/" style="display: inline-block; padding: 10px 20px; background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); border-radius: 8px; color: #3b82f6; text-decoration: none; font-size: 13px;">LinkedIn</a>
            </div>
            <p style="color: #9ca3af; font-size: 14px; line-height: 1.6; margin: 0;">
              Best,<br>
              <strong style="color: white;">Kartik Parmar</strong><br>
              <span style="color: #6b7280;">Full-Stack Developer | Founder @ KARTIK</span>
            </p>
          </div>
          <div style="padding: 16px 32px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
            <p style="color: #4b5563; font-size: 11px; margin: 0;">+91 9619410050 • 385.kartik.p@gmail.com • Mira Road, Mumbai</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
}
