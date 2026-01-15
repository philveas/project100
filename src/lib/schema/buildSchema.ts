// src/lib/schema/buildSchema.ts

import { FirestoreSection } from "@/types/sections";

/* ----------------------------------------
 * HELPERS
 * ---------------------------------------- */

/** Accept real booleans and common spreadsheet / Firestore values */
function isTrue(v: any) {
  return v === true || v === "TRUE" || v === "true" || v === 1 || v === "1";
}

/**
 * Parse areaServed values.
 * - Single value: "United Kingdom" -> "United Kingdom"
 * - List (semicolon separated): "London; South East England" -> ["London", "South East England"]
 */
function parseAreaServed(v: any) {
  if (!v || typeof v !== "string") return undefined;

  const trimmed = v.trim();
  if (!trimmed) return undefined;

  if (trimmed.includes(";")) {
    const parts = trimmed
      .split(";")
      .map((p) => p.trim())
      .filter(Boolean);

    return parts.length > 0 ? parts : undefined;
  }

  return trimmed;
}

/* ----------------------------------------
 * ORGANIZATION (Home / Root)
 * ---------------------------------------- */
export function buildOrganizationSchema(root: FirestoreSection) {
  if (!root) return null;

  return {
    "@context": "https://schema.org",
    "@type": root.schemaType || "Organization",
    name: root.schemaProviderName,
    alternateName: root.schemaAlternateName,
    url: root.schemaProviderUrl,
    logo: root.schemaLogoUrl,

    contactPoint: root.schemaContactTel
      ? {
          "@type": "ContactPoint",
          telephone: root.schemaContactTel,
          contactType: root.schemaContactType || "customer service",
        }
      : undefined,

    address: root.schemaAddress
      ? {
          "@type": "PostalAddress",
          streetAddress: root.schemaAddress,
        }
      : undefined,

    areaServed: parseAreaServed(root.schemaAreaServed),
  };
}

/* ----------------------------------------
 * SERVICE (Service pages)
 * ---------------------------------------- */
export function buildServiceSchema(root: FirestoreSection) {
  if (!root) return null;

  const areaServed = parseAreaServed(
    root.schemaAreaServed || root.schemaEligibleRegion
  );

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: root.schemaServiceType,
    serviceType: root.schemaServiceType,

    provider: {
      "@type": root.schemaType || "ProfessionalService",
      name: root.schemaProviderName,
      url: root.schemaProviderUrl,
      logo: root.schemaLogoUrl,
      telephone: root.schemaContactTel,

      address: root.schemaAddress
        ? {
            "@type": "PostalAddress",
            streetAddress: root.schemaAddress,
          }
        : undefined,

      areaServed,
    },

    areaServed,

    offers: root.schemaOfferUrl
      ? {
          "@type": "Offer",
          url: root.schemaOfferUrl,
          priceCurrency: root.schemaPriceCurrency || "GBP",
        }
      : undefined,
  };
}

/* ----------------------------------------
 * LOCATION / LOCAL BUSINESS (Location pages)
 * ---------------------------------------- */
export function buildLocationSchema(root: FirestoreSection) {
  if (!root) return null;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: root.schemaProviderName,

    address: root.schemaAddress
      ? {
          "@type": "PostalAddress",
          streetAddress: root.schemaAddress,
        }
      : undefined,

    geo:
      root.geoLat && root.geoLng
        ? {
            "@type": "GeoCoordinates",
            latitude: root.geoLat,
            longitude: root.geoLng,
          }
        : undefined,

    areaServed: parseAreaServed(root.schemaAreaServed),
  };
}

/* ----------------------------------------
 * REVIEW (optional, spreadsheet controlled)
 * ---------------------------------------- */
export function buildReviewSchema(root: FirestoreSection) {
  if (!root || !isTrue(root.includeReview)) return null;

  // Guard against invalid review objects
  if (
    !root.rating ||
    !root.reviewerName ||
    !root.reviewBody ||
    !root.reviewDate
  ) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: root.rating,
      bestRating: "5",
    },
    author: {
      "@type": "Person",
      name: root.reviewerName,
    },
    reviewBody: root.reviewBody,
    datePublished: root.reviewDate,
    publisher: {
      "@type": "Organization",
      name: root.schemaProviderName,
      url: root.schemaProviderUrl,
    },
  };
}

/* ----------------------------------------
 * FAQ (from FAQ sections)
 * ---------------------------------------- */
export function buildFaqSchema(faqSections: FirestoreSection[]) {
  if (!faqSections || faqSections.length === 0) return null;

  const questions = faqSections
    .filter((f) => f.faqQuestion && f.faqAnswer)
    .map((f) => ({
      "@type": "Question",
      name: f.faqQuestion,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.faqAnswer,
      },
    }));

  if (questions.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions,
  };
}

/* ----------------------------------------
 * BREADCRUMBS
 * ---------------------------------------- */
export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  if (!items || items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
