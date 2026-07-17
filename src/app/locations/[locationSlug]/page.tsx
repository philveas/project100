// app/locations/[locationSlug]/page.tsx

// src/app/locations/[locationSlug]/page.tsx

import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getLocationBySlug, getSectionsByLocationKey } from "@/lib/firestore-client";
import { getPlaceholder, type ResolvedImage } from "@/lib/placeholders";
import { serializeForClient } from "@/lib/serializeForClient";
import type { FirestoreSection } from "@/types/sections";

import { componentMap, normaliseKind, isGroupedKind,} from "@/lib/sectionRegistry";

import {
  buildLocationSchema,
  buildFaqSchema,
  buildReviewSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema/buildSchema";

/* --------------------------------------------------
 * METADATA (NO SCHEMA HERE)
 * -------------------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locationSlug: string }>;
}): Promise<Metadata> {
  const { locationSlug } = await params;

  if (!locationSlug) redirect("/");
  if (locationSlug === "locations") redirect("/locations");

 
  const location = await getLocationBySlug(locationSlug);
  const sections = await getSectionsByLocationKey(location?.locationKey || locationSlug);

  // Prefer hero2, fallback hero
  const heroData = sections.find((s) => {
    const k = normaliseKind(s.kind);
    return k === "hero2" || k === "hero";
  });

  const folder = heroData?.folder ?? "home";
  const heroImageId = heroData?.imageIdDesktop;

  const heroImageUrl =
    typeof heroImageId === "string" && heroImageId.trim()
      ? `/images/${folder}/${heroImageId}.webp`
      : "/images/home/grass2.0.webp";

  const title =
    location?.metaTitle ||
    `${location?.locationName || locationSlug.replace(/-/g, " ")} Acoustic Consultancy`;

  const description =
    location?.metaDescription ||
    "Specialist acoustic engineering consultancy delivering planning and environmental noise services.";

  return {
    title: `${title} - Veas Acoustics`,
    description,
    alternates: {
      canonical: `https://www.veasacoustics.com/locations/${locationSlug}`,
    },
    openGraph: {
      title: `${title} - Veas Acoustics`,
      description,
      url: `https://www.veasacoustics.com/locations/${locationSlug}`,
      images: [
        {
          url: heroImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

/* --------------------------------------------------
 * MAIN PAGE (SCHEMA HERE)
 * -------------------------------------------------- */
export default async function LocationPage({
  params,
}: {
  params: Promise<{ locationSlug: string }>;
}) {
  const { locationSlug } = await params;

  if (!locationSlug) redirect("/");
  if (locationSlug === "locations") redirect("/locations");




  const location = await getLocationBySlug(locationSlug);
  const sections: FirestoreSection[] = await getSectionsByLocationKey(
    location?.locationKey || locationSlug
  );

  if (!location || sections.length === 0) redirect("/");

  const root = sections.find((s) => normaliseKind(s.kind) === "root");

  // ---------------------
  // SCHEMA BUILD
  // ---------------------
  const safeRoot = root ? serializeForClient(root) : null;
  const safeFaqSections = serializeForClient(
    sections.filter((s) => normaliseKind(s.kind) === "faq")
  );

  const locationSchema = safeRoot ? buildLocationSchema(safeRoot) : null;
  const reviewSchema = safeRoot ? buildReviewSchema(safeRoot) : null;
  const faqSchema = buildFaqSchema(safeFaqSections);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "https://www.veasacoustics.com/" },
    { name: "Locations", url: "https://www.veasacoustics.com/locations" },
    {
      name: location.locationName || locationSlug.replace(/-/g, " "),
      url: `https://www.veasacoustics.com/locations/${locationSlug}`,
    },
  ]);

  const schemas = [locationSchema, reviewSchema, faqSchema, breadcrumbSchema].filter(Boolean);

  // ---------------------
  // PAGE CONTENT
  // ---------------------
  const sorted = [...sections].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));

  const finalRender: { kind: string; data: any }[] = [];
  const used = new Set<string>();

  for (const sec of sorted) {
    const kind = normaliseKind(sec.kind);
    if (!kind) continue;

    // 🛡️ Tiny guard for unknown kinds (DEV ONLY)
    if (!componentMap[kind]) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[sections] Unknown kind "${sec.kind}" (normalised → "${kind}")`);
      }
      continue;
    }

    if (isGroupedKind(kind)) {
      if (used.has(kind)) continue;

      finalRender.push({
        kind,
        data: sorted.filter((s) => normaliseKind(s.kind) === kind),
      });

      used.add(kind);
    } else {
      finalRender.push({ kind, data: sec });
    }
  }

  // ---------------------
  // IMAGES
  // ---------------------
  const resolveImg = (d?: FirestoreSection) =>
    d?.imageIdDesktop ? getPlaceholder(String(d.imageIdDesktop)) : undefined;

  const fallback: ResolvedImage = {
    id: "fallback",
    description: "fallback",
    imageUrl: "/images/home/grass2.0.webp",
  };

  const heroImg = resolveImg(
    finalRender.find((x) => x.kind === "hero2")?.data ??
      finalRender.find((x) => x.kind === "hero")?.data
  );

  const ctaImg = resolveImg(finalRender.find((x) => x.kind === "cta")?.data);
  const leftImg = resolveImg(finalRender.find((x) => x.kind === "whatleftimage")?.data);

  // ---------------------
  // RENDER
  // ---------------------
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={`schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="flex flex-col">
        {finalRender.map((item, i) => {
          const Component = componentMap[item.kind];
          if (!Component) return null;

          const safeData = serializeForClient(item.data);
          const props: any = isGroupedKind(item.kind)
            ? { sections: safeData }
            : { section: safeData };

          if (item.kind === "hero" || item.kind === "hero2") props.image = heroImg ?? fallback;
          if (item.kind === "cta") props.image = ctaImg ?? fallback;
          if (item.kind === "whatleftimage") props.image = leftImg ?? fallback;

          return <Component key={`${item.kind}-${i}`} {...props} />;
        })}
      </div>
    </>
  );
}
