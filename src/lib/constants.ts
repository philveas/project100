// lib/constants.ts
// Derive homepage SERVICES from the authoritative catalog.
import { services } from "@/lib/services";

export const SERVICES = services.map((s) => ({
  name: s.title,
  slug: s.slug,
  href: `/services/${s.slug}`,
  description: s.cardDescription, // short card copy for homepage
  iconName: s.iconName,           // optional (if you render icons by name)
}));
