// lib/constants.ts
// Derive homepage SERVICES from the authoritative catalog.
import { services } from "@/lib/services";

export const SERVICES = services.map((s) => ({
    name: s.title,
    slug: s.slug,
    // FIX: Conditionally set href to '/' if the slug is 'home', otherwise use the standard /services/{slug} route.
    href: s.slug === 'home' ? '/' : `/services/${s.slug}`,
    description: s.cardDescription, // short card copy for homepage
    iconName: s.iconName,           // optional (if you render icons by name)
}));