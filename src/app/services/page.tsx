// src/app/services/page.tsx
import { redirect } from 'next/navigation';

/**
 * Temporary redirect for /services
 * Redirects visitors to the homepage until
 * the Services Overview page is built.
 */
export default function ServicesRedirectPage() {
  redirect('/');
}
