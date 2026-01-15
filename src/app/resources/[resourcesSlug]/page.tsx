// src/app/resources/[resourcesSlug]/page.tsx

import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getResourceBySlug, getSectionsByResourceKey } from "@/lib/firestore-client";

import { getPlaceholder, type ResolvedImage } from "@/lib/placeholders";
import { serializeForClient } from "@/lib/serializeForClient";
import type { FirestoreSection } from "@/types/sections";

import { componentMap, normaliseKind, isGroupedKind } from "@/lib/sectionRegistry";

export const runtime = "nodejs";

/* --------------------------------------------------
 * METADATA
 * -------------------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ resourcesSlug: string }>;
}): Promise<Metadata> {
  const { resourcesSlug: slug } = await params;

  if (!slug) redirect("/resources");

  const resource = await getResourceBySlug(slug);
  if (!resource) redirect("/resources");

  const sections = await getSectionsByResourceKey(resource.resourceKey || slug);

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

  const title = resource.metaTitle || resource.title || slug.replace(/-/g, " ");

  const description =
    resource.metaDescription || resource.cardDescription || "Technical resources from Veas Acoustics.";

  return {
    title: `${title} - Veas Acoustics`,
    description,
    alternates: {
      canonical: `https://www.veasacoustics.co.uk/resources/${slug}`,
    },
    openGraph: {
      title: `${title} - Veas Acoustics`,
      description,
      url: `https://www.veasacoustics.co.uk/resources/${slug}`,
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
 * MAIN PAGE
 * -------------------------------------------------- */
export default async function ResourceSlugPage({
  params,
}: {
  params: Promise<{ resourcesSlug: string }>;
}) {
  const { resourcesSlug: slug } = await params;

  if (!slug) redirect("/resources");

  const resource = await getResourceBySlug(slug);
  if (!resource) redirect("/resources");

  const sections: FirestoreSection[] = await getSectionsByResourceKey(resource.resourceKey || slug);

  // Graceful empty state
  if (!sections.length) {
    return (
      <section className="py-10 md:py-12 bg-card">
        <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
          <h1 className="text-3xl md:text-4xl text-primary font-headline font-semibold text-center">
            {resource.title || "Resource"}
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mt-4">
            This resource is being prepared.
          </p>
        </div>
      </section>
    );
  }

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
    <div className="flex flex-col">
      {finalRender.map((item, i) => {
        const Component = componentMap[item.kind];
        if (!Component) return null;

        const safeData = serializeForClient(item.data);
        const props: any = isGroupedKind(item.kind) ? { sections: safeData } : { section: safeData };

        if (item.kind === "hero" || item.kind === "hero2") props.image = heroImg ?? fallback;
        if (item.kind === "cta") props.image = ctaImg ?? fallback;
        if (item.kind === "whatleftimage") props.image = leftImg ?? fallback;

        // check for errors in components
        if (process.env.NODE_ENV !== "production") {
        console.log("[sections] about to render", item.kind, "component is", Component);}


        return <Component key={`${item.kind}-${i}`} {...props} />;
      })}
    </div>
  );
}
