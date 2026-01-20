// src/components/sections/WhatLeftImageSection.tsx

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { type ImageSectionProps } from "@/types/sections";

const FALLBACK = {
  desktop: { w: 597, h: 448 },
  mobile: { w: 320, h: 270 },
};

const FALLBACK_IMAGE_URL = "/images/home/grass2.0.webp";

/**
 * Two-column section with image on the left (md+) and text on the right (md+).
 * On mobile, text appears first and the image moves below.
 * Supports whatHeading, whatBody, and whatBullet fields from Firestore.
 *
 * Bullets:
 * - Matches WhatSecondarySection style (array stays array, string becomes [string])
 * - Also supports semicolon-separated bullets inside either array items or a single string.
 */
export function WhatLeftImageSection({ section, image }: Partial<ImageSectionProps>) {
  // === Resolve image paths ===
  const folder = (section as any)?.folder ?? "home";
  const imageIdDesktop = (section as any)?.imageIdDesktop ?? null;
  const imageIdMobile = (section as any)?.imageIdMobile ?? null;

  const desktopSrc =
    image?.desktop?.src ??
    image?.mobile?.src ??
    image?.imageUrl ??
    (imageIdDesktop ? `/images/${folder}/${imageIdDesktop}.webp` : FALLBACK_IMAGE_URL);

  const mobileSrc =
    image?.mobile?.src ??
    image?.desktop?.src ??
    image?.imageUrl ??
    (imageIdMobile ? `/images/${folder}/${imageIdMobile}.webp` : FALLBACK_IMAGE_URL);

  // --- Text content ---
  const heading = String(section?.["heading"] ?? section?.["whatHeading"] ?? "Our Process");
  const body = String(section?.["description"] ?? section?.["whatBody"] ?? section?.["body"] ?? "");

  // Paragraphs (newline separated)
  const paragraphs = body
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  // --- Bullets (match WhatSecondarySection, plus optional semicolon splitting) ---
  const rawBullets = section?.["whatBullet"];

  const bullets = Array.isArray(rawBullets)
    ? rawBullets
        .flatMap((b) =>
          String(b)
            .split(";")
            .map((x) => x.trim())
            .filter(Boolean)
        )
    : typeof rawBullets === "string"
    ? rawBullets
        .split(";")
        .map((x) => x.trim())
        .filter(Boolean)
    : [];

  const hasBullets = bullets.length > 0;

  const linkHref = String(section?.["buttonHref"] ?? section?.["linkHref"] ?? "/contact");
  const linkText = String(section?.["buttonLabel"] ?? section?.["linkText"] ?? "Find Out More");

  // --- Render ---
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 items-center">
          {/* === Text (Right on md+, FIRST on mobile) === */}
          <div className="text-center md:text-left px-1 md:px-0 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl text-primary-headings font-headline font-semibold">
              {heading}
            </h2>

            {/* Body paragraphs */}
            {paragraphs.length > 0 && (
              <div className="mt-4 text-foreground font-light text-lg leading-relaxed space-y-3 max-w-2xl mx-auto md:mx-0 text-justify">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {/* Bullets */}
            {hasBullets && (
              <ul className="mt-4 list-disc list-inside ml-10 space-y-2 text-foreground font-light text-lg max-w-2xl mx-auto md:mx-0 text-left">
                {bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}

            {linkHref && linkText && (
              <Link href={linkHref}>
                <Button
                  size="lg"
                  variant="default"
                  className="mt-8 bg-background text-primary-headings border border-border hover:!bg-accent hover:!text-foreground hover:!border-accent transition-colors"
                >
                  {linkText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>

          {/* === Image (Left on md+, SECOND on mobile) === */}
          <div className="relative w-full mx-auto max-w-full md:max-w-[330px] md:justify-self-start order-2 md:order-1">
            {/* Mobile */}
            <div className="md:hidden">
              <Image
                src={mobileSrc}
                alt={heading}
                width={FALLBACK.mobile.w}
                height={FALLBACK.mobile.h}
                sizes="100vw"
                className="rounded-lg shadow-xl object-cover w-full h-auto"
                loading="lazy"
              />
            </div>

            {/* Desktop */}
            <div className="hidden md:block">
              <Image
                src={desktopSrc}
                alt={heading}
                width={FALLBACK.desktop.w}
                height={FALLBACK.desktop.h}
                sizes="(max-width: 1024px) 50vw, 597px"
                className="rounded-lg shadow-xl object-cover w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
