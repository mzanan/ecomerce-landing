import nodemailer from 'nodemailer';
import { COMPANY } from "./socials";

interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  fromEmail: string;
  toEmail: string;
}

export function validateEmailConfig(): EmailConfig {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '465');
  const username = process.env.SMTP_USERNAME;
  const password = process.env.SMTP_PASSWORD;
  const fromEmail = process.env.SMTP_FROM_EMAIL;

  if (!host || !port || !username || !password || !fromEmail) {
    throw new Error('Missing SMTP environment variables');
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: {
      user: username,
      pass: password,
    },
    fromEmail,
    toEmail: COMPANY.email.noReply || fromEmail,
  };
}

export function generateContactEmailTemplate(data: ContactEmailData): string {
  const { name, email, subject, message } = data;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Email from Ecommerce Landing/title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="background: #000; color: #fff; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          <div style="padding: 30px;">
            <div style="margin-bottom: 20px;">
              <strong style="color: #555;">Name:</strong>
              <div style="margin-top: 5px; padding: 10px; background: #f8f9fa; border-radius: 5px;">${name}</div>
            </div>
            <div style="margin-bottom: 20px;">
              <strong style="color: #555;">Email:</strong>
              <div style="margin-top: 5px; padding: 10px; background: #f8f9fa; border-radius: 5px;">${email}</div>
            </div>
            <div style="margin-bottom: 20px;">
              <strong style="color: #555;">Subject:</strong>
              <div style="margin-top: 5px; padding: 10px; background: #f8f9fa; border-radius: 5px;">${subject}</div>
            </div>
            <div style="margin-bottom: 20px;">
              <strong style="color: #555;">Message:</strong>
              <div style="margin-top: 5px; padding: 15px; background: #f8f9fa; border-radius: 5px; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
          <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; border-radius: 0 0 8px 8px;">
            <p style="margin: 0; font-size: 14px;">This email was sent from the ${COMPANY.name} contact form.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function sendContactEmail(data: ContactEmailData, config: EmailConfig) {
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  const mailOptions = {
    from: config.fromEmail,
    to: config.toEmail,
    replyTo: data.email,
    subject: `Contact Form: ${data.subject}`,
    html: generateContactEmailTemplate(data),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ SMTP error details:', error);
    throw new Error(`Failed to send email: ${error}`);
  }
} 