"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getPlaceholder, PlaceholderImages } from "@/lib/placeholders";
import { type ImageSectionProps } from "@/types/sections";

export function WhatLeftSection({ section }: ImageSectionProps) {
  if (!section) return null;

  const FALLBACK_IMAGE_URL = "/images/home/meeting1.webp";

  // --- Text content ---
  const heading =
    String(section?.["heading"] ?? section?.["whatHeading"] ?? "Acoustic Site Inspections");

  const body = String(section?.["description"] ?? section?.["whatBody"] ?? "");
  const paragraphs = body.split("\n").map((p) => p.trim()).filter(Boolean);

  // --- Image handling ---
  const rawId = String(section?.["imageIdDesktop"] ?? "").trim().toLowerCase();
  const id = rawId.replace(/\.(webp|jpg|jpeg|png)$/i, "");

  const image =
    getPlaceholder(id) ||
    PlaceholderImages.find((p) => p.id === id);

  const imageSrc = image?.desktop?.src || image?.mobile?.src || image?.imageUrl;
  const imageUrl = imageSrc || FALLBACK_IMAGE_URL;

  const imageAlt =
    String(image?.description ?? section?.["description"] ?? "Acoustic site inspection");

  // --- CTA ---
  const linkHref = String(section?.["buttonHref"] ?? "/contact");
  const linkText = String(section?.["buttonLabel"] ?? "Find Out More");

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* 1.2fr : 1fr ensures image side is slightly wider */}
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-x-12 items-center">
          {/* --- Image (Left) --- */}
          <div className="relative w-full">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={597}
              height={448}
              sizes="(max-width: 1024px) 100vw, 600px"
              className="rounded-lg shadow-xl object-cover w-full h-auto"
              loading="lazy"
              onError={(e) => {
                console.warn(`🖼️ Failed to load WhatLeft image: ${imageUrl}`);
                (e.target as HTMLImageElement).src = FALLBACK_IMAGE_URL;
              }}
            />
          </div>

          {/* --- Text (Right) --- */}
          <div className="px-2 md:px-0 text-left">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary">
              {heading}
            </h2>

            <div className="mt-4 text-foreground font-light space-y-4 text-lg leading-relaxed text-justify">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {linkHref && linkText && (
              <Link href={linkHref} className="mt-8 inline-block">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent-foreground text-primary hover:bg-accent hover:text-foreground"
                >
                  {linkText}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
