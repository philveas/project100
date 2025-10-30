'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import type { FormState } from './types';

const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  company: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  telephone: z.string().optional(),
  projectAddress: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  gdprConsent: z.literal('on', { errorMap: () => ({ message: 'You must agree to the privacy policy.' }) }),
});

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendConfirmationEmail(data: z.infer<typeof schema>) {
  try {
    await resend.emails.send({
      from: 'Veas Acoustics <info@veasacoustics.com>',
      to: [data.email],
      subject: 'Thank you for contacting Veas Acoustics',
      html: `
        <p>Hi ${data.name},</p>
        <p>Thank you for reaching out to Veas Acoustics. We’ve received your enquiry and will get back to you shortly.</p>
        <p>Best regards,<br>Phil @ Veas Acoustics</p>
      `,
    });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

async function sendNotificationEmail(data: z.infer<typeof schema>) {
  try {
    await resend.emails.send({
      from: 'Veas Acoustics <info@veasacoustics.com>',
      to: ['phil@veasacoustics.com'],
      subject: 'New enquiry from Veas Acoustics website',
      html: `
        <h2>New Enquiry Received</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Company:</strong> ${data.company ?? '—'}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telephone:</strong> ${data.telephone ?? '—'}</p>
        <p><strong>Project Address:</strong> ${data.projectAddress ?? '—'}</p>
        <p><strong>Message:</strong><br>${data.message}</p>
      `,
    });
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
}

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validated = schema.safeParse({
    name: formData.get('name'),
    company: formData.get('company'),
    email: formData.get('email'),
    telephone: formData.get('telephone'),
    projectAddress: formData.get('projectAddress'),
    message: formData.get('message'),
    gdprConsent: formData.get('gdprConsent'),
  });

  if (!validated.success) {
    return {
      status: 'error',
      message: 'Error: Please check the form fields.',
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;

  // Send both emails and log to Google Sheets
  await Promise.all([
    sendConfirmationEmail(data),
    sendNotificationEmail(data),
    logToGoogleSheets(data),
  ]);

  return {
    status: 'success',
    message: 'Thank you for your message! We will get back to you shortly.',
    success: true,
  };
}

// Function to log the submission to your Google Sheet
async function logToGoogleSheets(data: z.infer<typeof schema>) {
  const url = process.env.GAS_WEBAPP_URL;
  const token = process.env.GAS_SHARED_SECRET;
  if (!url || !token) {
    console.warn('Missing GAS_WEBAPP_URL or GAS_SHARED_SECRET');
    return;
  }

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, data }),
    });
  } catch (error) {
    console.error('Error sending to Google Sheets:', error);
  }
}
