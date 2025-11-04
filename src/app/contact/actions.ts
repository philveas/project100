'use server';

import { z } from 'zod';
import type { FormState } from './types';

const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  company: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  telephone: z.string().optional(),
  projectAddress: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  gdprConsent: z.literal('on', {
    errorMap: () => ({ message: 'You must agree to the privacy policy.' }),
  }),
});

// ✅ Use your working Firebase Cloud Function endpoint
const FUNCTION_URL =
  process.env.NEXT_PUBLIC_CONTACT_FUNCTION_URL ??
  'https://handlecontactform-503507204027.europe-west2.run.app';

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

  try {
    const response = await fetch(FUNCTION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validated.data),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Server responded with ${response.status}: ${text}`);
    }

    return {
      status: 'success',
      message: '✅ Thank you for your message! We will get back to you shortly.',
      success: true,
    };
  } catch (err) {
    console.error('Error submitting contact form:', err);
    return {
      status: 'error',
      message: '❌ Error submitting your form. Please try again later.',
      success: false,
    };
  }
}
