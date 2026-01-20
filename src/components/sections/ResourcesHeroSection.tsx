"use client";

// src/components/sections/ResourcesHeroSection.tsx
import * as React from "react";
import Image from "next/image";
import { getPlaceholder, PlaceholderImages } from "@/lib/placeholders";
import { type TextSectionProps } from "@/types/sections";

export function ResourcesHeroSection({ section }: TextSectionProps) {
  if (!section) return null;

  const FALLBACK_IMAGE_URL = "/images/noise-impact/impact-type-plant.webp";

  // --- Text (Hero keys) ---
  const heading = String(section?.["heroHeading"] ?? section?.["heading"] ?? "Resources");
  const subheading = String(section?.["heroSubheading"] ?? section?.["subheading"] ?? "");
  const body = String(section?.["heroBody"] ?? section?.["body"] ?? "");

  const paragraphs = body
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  // --- Image handling (copy principles from WhatLeftSection) ---
  const rawDesktop = String(section?.["imageIdDesktop"] ?? "").trim().toLowerCase();
  const rawMobile = String(section?.["imageIdMobile"] ?? "").trim().toLowerCase();

  const desktopId = rawDesktop.replace(/\.(webp|jpg|jpeg|png)$/i, "");
  const mobileId = rawMobile.replace(/\.(webp|jpg|jpeg|png)$/i, "");

  const image =
    (desktopId && (getPlaceholder(desktopId) || PlaceholderImages.find((p) => p.id === desktopId))) ||
    (mobileId && (getPlaceholder(mobileId) || PlaceholderImages.find((p) => p.id === mobileId))) ||
    null;

  const imageSrc = image?.desktop?.src || image?.mobile?.src || image?.imageUrl || "";
  const imageUrl = imageSrc || FALLBACK_IMAGE_URL;

  const imageAlt = String(
    image?.description ??
      section?.["imageAlt"] ??
      heading
  );

  return (
    <section className="bg-card text-foreground">
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10 py-6 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {/* IMAGE */}
          <div className="bg-muted overflow-hidden flex items-stretch">
            <div className="relative w-full h-full min-h-[220px] sm:min-h-0">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                loading="lazy"
                onError={(e) => {
                  console.warn(`🖼️ Failed to load ResourcesHero image: ${imageUrl}`);
                  const img = e.target as HTMLImageElement;
                  img.src = FALLBACK_IMAGE_URL;
                }}
              />
            </div>
          </div>

          {/* TEXT */}
          <div className="bg-card sm:col-span-1 lg:col-span-2 py-0 md:py-4 flex items-center">
            <div className="max-w-[52rem] ml-0 text-foreground/90 font-light space-y-4 text-base md:text-xl text-justify">
              <h1 className="text-3xl md:text-5xl font-headline font-semibold leading-tight text-primary-headings text-left not-italic">
                {(heading || "")
                  .split(/\r?\n/)
                  .filter(Boolean)
                  .map((line: string, i: number) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
              </h1>

              {subheading ? (
                <p className="text-foreground font-semibold text-base md:text-xl text-left whitespace-pre-line">
                  {subheading}
                </p>
              ) : null}

              {paragraphs.map((para, i) => (
  <p key={`p-${i}`} className="whitespace-pre-line">
    {para}
  </p>
))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResourcesHeroSection;
