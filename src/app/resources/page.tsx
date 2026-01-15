// src/app/resources/page.tsx

import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { getPublishedResources } from "@/lib/firestore-client";
import { getPlaceholder, PlaceholderImages } from "@/lib/placeholders";

type ResourceDoc = {
  id: string;
  isActive?: boolean;
  resourceKey?: string;
  title?: string;
  slug?: string;
  cardDescription?: string;
  imageId?: string;
  order?: number | string;
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function ResourcesPage() {
  const resources = await getPublishedResources();

  const items = [...(resources ?? [])].sort(
    (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0)
  );

  if (!items.length) redirect("/");

  const FALLBACK_IMAGE_URL = "/images/home/grass2.0.webp";

  // TEMP: use same image as ResourcesHero
  const HERO_IMAGE_ID = "4142-hero";

  const heroImage =
    getPlaceholder(HERO_IMAGE_ID) ||
    PlaceholderImages.find((p) => p.id === HERO_IMAGE_ID);

  const heroImageSrc =
    heroImage?.desktop?.src ||
    heroImage?.mobile?.src ||
    heroImage?.imageUrl ||
    FALLBACK_IMAGE_URL;

  return (
    <section className="py-10 md:py-12 bg-card">
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* ============================= */}
        {/* HEADING (fixed vertical space) */}
        {/* ============================= */}
        <div className="max-w-4xl mx-auto min-h-[4.5rem] md:min-h-[5.5rem] flex items-start justify-center">
          <h1 className="text-3xl md:text-4xl text-primary font-headline font-semibold text-center">
            Acoustic Resources & Information
          </h1>
        </div>

        {/* ============================= */}
        {/* SUMMARY (independent position) */}
        {/* ============================= */}
        <div className="max-w-2xl mx-auto mt-3 md:mt-4">
          <p className="text-center text-muted-foreground">
          </p>
        </div>

        {/* ============================= */}
        {/* RESOURCE GRID */}
        {/* ============================= */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((r) => {
            const slug = String(r.slug ?? "").trim();
            if (!slug) return null;

            const title = String(r.title ?? "Resource");
            const desc = String(r.cardDescription ?? "");

            return (
              <Link
                key={r.id ?? slug}
                href={`/resources/${slug}`}
                className="group relative block w-full overflow-hidden rounded-lg shadow-lg"
              >
                {/* IMAGE */}
                <div className="relative h-72 w-full">
                  <Image
                    src={heroImageSrc}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-primary/40 transition-colors duration-500 group-hover:bg-primary/60" />
                </div>

                {/* TEXT */}
                <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
                  <h2 className="text-xl font-headline font-semibold leading-tight mb-2 !text-white">
                    {title}
                  </h2>

                  {!!desc && (
                    <p className="text-base font-normal leading-snug !text-white/90 line-clamp-3">
                      {desc}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
