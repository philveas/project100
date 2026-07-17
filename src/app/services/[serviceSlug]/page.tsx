// src/app/services/[serviceSlug]/page.tsx

import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getServiceBySlug, getSectionsByServiceKey } from "@/lib/firestore-client";
import { getPlaceholder, type ResolvedImage } from "@/lib/placeholders";
import { serializeForClient } from "@/lib/serializeForClient";
import type { FirestoreSection, Service } from "@/types/sections";

import { componentMap, normaliseKind, isGroupedKind } from "@/lib/sectionRegistry";

import {
  buildServiceSchema,
  buildFaqSchema,
  buildReviewSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema/buildSchema";

export const runtime = "nodejs";

/* --------------------------------------------------
 * HELPERS
 * -------------------------------------------------- */
function toTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toOptionalMetaString(value: unknown): string | undefined {
  const s = toTrimmedString(value);
  return s ? s : undefined;
}

function stripImageExt(value: unknown): string {
  const s = toTrimmedString(value);
  return s.replace(/\.(webp|jpg|jpeg|png)$/i, "");
}

/* --------------------------------------------------
 * METADATA (NO SCHEMA HERE)
 * -------------------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const { serviceSlug: slug } = await params;

  if (!slug || slug === "home") redirect("/");

  const service: Service | null = await getServiceBySlug(slug);
  if (!service) redirect("/");

  const sections = await getSectionsByServiceKey(service.serviceKey || slug);

  // Prefer hero2, fallback to hero
  const heroData = sections.find((s) => {
    const k = normaliseKind(s.kind);
    return k === "hero2" || k === "hero";
  });

  const folder = toTrimmedString((heroData as any)?.folder) || "home";
  const heroImageIdRaw = (heroData as any)?.imageIdDesktop;

  const heroImageId = stripImageExt(heroImageIdRaw);

  const heroImageUrl = heroImageId
    ? `/images/${folder}/${heroImageId}.webp`
    : "/images/home/grass2.0.webp";

  const titleBase =
  toTrimmedString((service as any)?.metaTitle) ||
  toTrimmedString((service as any)?.title) ||
  slug.replace(/-/g, " ");


// ✅ FIX: force description to be string (never {})
const rawDescription =
  service.metaDescription ??
  service.cardDescription ??
  "Specialist acoustic engineering consultancy.";

const description =
  typeof rawDescription === "string"
    ? rawDescription.trim()
    : "Specialist acoustic engineering consultancy.";



  return {
    title: `${titleBase} - Veas Acoustics`,
    description,
    alternates: {
      canonical: `https://www.veasacoustics.com/services/${slug}`,
    },
    openGraph: {
      title: `${titleBase} - Veas Acoustics`,
      description,
      url: `https://www.veasacoustics.com/services/${slug}`,
      images: [
        {
          url: heroImageUrl,
          width: 1200,
          height: 630,
          alt: titleBase,
        },
      ],
    },
  };
}

/* --------------------------------------------------
 * MAIN PAGE (SCHEMA HERE)
 * -------------------------------------------------- */
export default async function ServicePage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug: slug } = await params;

  if (!slug || slug === "home") redirect("/");

  const service: Service | null = await getServiceBySlug(slug);
  if (!service) redirect("/");

  const sections: FirestoreSection[] = await getSectionsByServiceKey(service.serviceKey || slug);
  if (!sections.length) redirect("/");

  /* ---------------------
   * SCHEMA
   * --------------------- */
  const root = sections.find((s) => normaliseKind(s.kind) === "root");

  const safeRoot = root ? serializeForClient(root) : null;
  const safeFaqSections = serializeForClient(sections.filter((s) => normaliseKind(s.kind) === "faq"));

  const schemas = [
    safeRoot && buildServiceSchema(safeRoot),
    safeRoot && buildReviewSchema(safeRoot),
    buildFaqSchema(safeFaqSections),
    buildBreadcrumbSchema([
      { name: "Home", url: "https://www.veasacoustics.com/" },
      {
        name: (service as any).title || slug.replace(/-/g, " "),
        url: `https://www.veasacoustics.com/services/${slug}`,
      },
    ]),
  ].filter(Boolean);

  /* ---------------------
   * SECTION BUILD
   * --------------------- */
  const sorted = [...sections].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));

  const finalRender: { kind: string; data: any }[] = [];
  const used = new Set<string>();

  for (const sec of sorted) {
    const kind = normaliseKind(sec.kind);
    if (!kind) continue;

    if (!componentMap[kind]) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[sections] Unknown kind "${sec.kind}"`);
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

  /* ---------------------
   * IMAGES
   * --------------------- */
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

  /* ---------------------
   * RENDER
   * --------------------- */
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
          const props: any = isGroupedKind(item.kind) ? { sections: safeData } : { section: safeData };

          if (item.kind === "hero" || item.kind === "hero2") props.image = heroImg ?? fallback;
          if (item.kind === "cta") props.image = ctaImg ?? fallback;
          if (item.kind === "whatleftimage") props.image = leftImg ?? fallback;

          return <Component key={`${item.kind}-${i}`} {...props} />;
        })}
      </div>
    </>
  );
}
