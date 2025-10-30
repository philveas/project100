'use client';

import React, { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

import { submitContactForm } from '@/app/contact/actions';
import type { FormState } from '@/app/contact/types'; // ✅ shared type
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  company: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  telephone: z.string().optional(),
  projectAddress: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  // server actions receive "on" for checked checkboxes
  gdprConsent: z.literal('on', { errorMap: () => ({ message: 'You must agree to the privacy policy.' }) }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const initialState: FormState = {
  status: 'idle',
  message: '',
  success: false,
  errors: {},
};

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

export function ContactForm() {
  // ✅ useActionState now aligned with server action type
  const [state, formAction] = useActionState<FormState, FormData>(submitContactForm, initialState);
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

  // The shadcn/ui Checkbox does not submit a value by itself. Mirror it to a hidden input.
  const [gdprChecked, setGdprChecked] = useState(false);

  useEffect(() => {
    if (state.message) {
      if (state.status === 'success' || state.success) {
        toast({ title: 'Success!', description: state.message });
        formRef.current?.reset();
        reset();
        setGdprChecked(false);
      } else if (state.status === 'error') {
        toast({ title: 'Error', description: state.message, variant: 'destructive' });
      }
    }
  }, [state, toast, reset]);

  // merge client-side zod errors + server-side errors
  const allErrors: Record<string, string[]> = {
    ...Object.fromEntries(
      Object.entries(errors).map(([k, v]) => [k, v?.message ? [String(v.message)] : []])
    ),
    ...(state.errors ?? {}),
  };

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
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
          {/* shadcn Checkbox is not a native input; mirror its state to a hidden input */}
          <Checkbox id="gdprConsent" checked={gdprChecked} onCheckedChange={(v) => setGdprChecked(Boolean(v))} />
          <Label htmlFor="gdprConsent" className="text-sm font-light text-muted-foreground">
            I agree to the <Link href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</Link>.
          </Label>
        </div>
        {/* Hidden form control that the server action reads */}
        <input type="hidden" name="gdprConsent" value={gdprChecked ? 'on' : ''} />
        {allErrors.gdprConsent?.[0] && <p className="text-sm text-destructive">{allErrors.gdprConsent[0]}</p>}
      </div>

      {/* Global status */}
      {state.message && (
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
