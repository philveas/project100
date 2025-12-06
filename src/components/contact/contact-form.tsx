'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

import type { FormState } from '@/app/contact/types';
import { submitContactForm } from '@/app/contact/actions'; // Import the server action
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

// ----------------------
// Validation schema
// ----------------------
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  company: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  telephone: z.string().optional(),
  projectAddress: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  gdprConsent: z.literal('on', { errorMap: () => ({ message: 'You must agree to the privacy policy.' }) }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// ----------------------
// Default form state
// ----------------------
const initialState: FormState = {
  status: 'idle',
  message: '',
  success: false,
  errors: {},
};

// ----------------------
// Submit button
// ----------------------
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      size="lg"
      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
    >
      {pending ? <Loader2 className="animate-spin" /> : 'Send Message'}
    </Button>
  );
}

// ----------------------
// Contact form
// ----------------------
export function ContactForm() {
  // 💡 CHANGE: Use useFormState to manage state and invoke the server action
  const [state, action] = useActionState(submitContactForm, initialState);
  
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  });

  // Mirror GDPR checkbox value manually (since shadcn Checkbox is custom)
  const [gdprChecked, setGdprChecked] = useState(false);

  // REMOVED: The temporary 'formAction' function has been removed.

  // Handle server action result with toast and form reset
  useEffect(() => {
    // Show toast message based on server action result
    if (state.message && state.status !== 'idle') {
      toast({
        title: state.status === 'success' ? 'Success' : 'Error',
        description: state.message,
        variant: state.status === 'error' ? 'destructive' : 'default',
      });
    }

    // Reset logic when state changes to success
    if (state.status === 'success') {
      formRef.current?.reset();
      reset();
      setGdprChecked(false);
    }
  }, [state, reset, toast]);

  // Merge client and server errors 
  const allErrors: Record<string, string[]> = {
    ...Object.fromEntries(
      Object.entries(errors).map(([k, v]) => [k, v?.message ? [String(v.message)] : []])
    ),
    ...(state.errors ?? {}),
  };

  return (
    // 💡 CHANGE: Replaced onSubmit={formAction} with action={action} to call the server action
    <form ref={formRef} action={action} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register('name')} placeholder="Your Name" aria-invalid={!!allErrors.name?.length} />
          {allErrors.name?.[0] && <p className="text-sm text-destructive">{allErrors.name[0]}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" {...register('company')} placeholder="Your Company Name" aria-invalid={!!allErrors.company?.length} />
          {allErrors.company?.[0] && <p className="text-sm text-destructive">{allErrors.company[0]}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} placeholder="your.email@example.com" aria-invalid={!!allErrors.email?.length} />
          {allErrors.email?.[0] && <p className="text-sm text-destructive">{allErrors.email[0]}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="telephone">Telephone</Label>
          <Input id="telephone" type="tel" {...register('telephone')} placeholder="Your Phone Number" aria-invalid={!!allErrors.telephone?.length} />
          {allErrors.telephone?.[0] && <p className="text-sm text-destructive">{allErrors.telephone[0]}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectAddress">Project Address</Label>
        <Input id="projectAddress" {...register('projectAddress')} placeholder="Enter Project Address" aria-invalid={!!allErrors.projectAddress?.length} />
        {allErrors.projectAddress?.[0] && <p className="text-sm text-destructive">{allErrors.projectAddress[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" {...register('message')} placeholder="How can we help?" rows={5} aria-invalid={!!allErrors.message?.length} />
        {allErrors.message?.[0] && <p className="text-sm text-destructive">{allErrors.message[0]}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="gdprConsent" checked={gdprChecked} onCheckedChange={(v) => setGdprChecked(Boolean(v))} />
          <Label htmlFor="gdprConsent" className="text-sm font-light text-muted-foreground">
            I agree to the <Link href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</Link>.
          </Label>
        </div>
        <input type="hidden" name="gdprConsent" value={gdprChecked ? 'on' : ''} />
        {allErrors.gdprConsent?.[0] && <p className="text-sm text-destructive">{allErrors.gdprConsent[0]}</p>}
      </div>

      {state.message && state.status !== 'idle' && (
        <p className={state.status === 'error' ? 'text-sm text-destructive' : 'text-sm text-green-700'}>
          {state.message}
        </p>
      )}

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}