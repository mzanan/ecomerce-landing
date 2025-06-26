import { Resend } from "resend";
import { COMPANY } from "./socials";

interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface EmailConfig {
  apiKey: string;
  fromEmail: string;
  toEmail: string;
}

export function validateEmailConfig(): EmailConfig {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable');
  }

  return { 
    apiKey, 
    fromEmail: COMPANY.email.from, 
    toEmail: COMPANY.email.noReply 
  };
}

export function generateContactEmailTemplate(data: ContactEmailData): string {
  const { name, email, subject, message } = data;
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
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
  const resend = new Resend(config.apiKey);
  
  const emailPayload = {
    from: config.fromEmail,
    to: [config.toEmail],
    replyTo: data.email,
    subject: `Contact Form: ${data.subject}`,
    html: generateContactEmailTemplate(data),
  };

  const { data: emailData, error } = await resend.emails.send(emailPayload);

  if (error) {
    console.error('❌ Resend error details:', {
      error,
      errorType: typeof error,
      errorKeys: Object.keys(error),
      errorMessage: error.message,
      errorName: error.name,
      fullError: JSON.stringify(error, null, 2)
    });
    
    throw new Error(`Failed to send email: ${JSON.stringify(error)}`);
  }

  console.log('✅ Email sent successfully:', emailData);
  return emailData;
} 