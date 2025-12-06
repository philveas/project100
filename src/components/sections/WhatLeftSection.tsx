// src/components/sections/WhatLeftSection.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { type ImageSectionProps } from "@/types/sections";

const FALLBACK = {
  desktop: { w: 597, h: 448 },
  mobile: { w: 320, h: 270 },
};
const FALLBACK_IMAGE_URL = "/images/home/grass2.0.webp";

/**
 * Two-column layout with image on the left and text on the right.
 * Reads image paths from Firestore's imageIdDesktop / imageIdMobile fields.
 */
export function WhatLeftSection({ section }: Partial<ImageSectionProps>) {
  console.log("🧠 WhatLeftSection input:", {
    sectionId: (section as any)?.id,
    imageIdDesktop: (section as any)?.imageIdDesktop,
    imageIdMobile: (section as any)?.imageIdMobile,
  });

  // === Resolve image paths from Firestore IDs ===
  const folder = (section as any)?.folder ?? "home";
  const imageIdDesktop = (section as any)?.imageIdDesktop ?? null;
  const imageIdMobile = (section as any)?.imageIdMobile ?? null;

  const desktopSrc = imageIdDesktop
    ? `/images/${folder}/${imageIdDesktop}.webp`
    : FALLBACK_IMAGE_URL;

  const mobileSrc = imageIdMobile
    ? `/images/${folder}/${imageIdMobile}.webp`
    : FALLBACK_IMAGE_URL;

  // --- Text content ---
  const heading =
    String(section?.["heading"] ?? section?.["whatHeading"] ?? "About");
  const body =
    String(section?.["description"] ?? section?.["whatBody"] ?? section?.["body"] ?? "");
  const paragraphs = body
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const linkHref = section?.["buttonHref"] ?? section?.["linkHref"] ?? "/contact";
  const linkText = section?.["buttonLabel"] ?? section?.["linkText"] ?? "Find Out More";

  // --- Render ---
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container px-3 sm:px-5 lg:px-8 xl:px-10">
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 items-center">
          {/* === Image Left === */}
          <div className="relative w-full mx-auto max-w-full md:max-w-[597px] md:justify-self-start">
            {/* Mobile */}
            <div className="md:hidden">
              <Image
                src={mobileSrc}
                alt={String(section?.["description"] ?? "Section image")}
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
                alt={String(section?.["description"] ?? "Section image")}
                width={FALLBACK.desktop.w}
                height={FALLBACK.desktop.h}
                sizes="(max-width: 1024px) 50vw, 597px"
                className="rounded-lg shadow-xl object-cover w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>

          {/* === Text Right === */}
          <div className="text-left px-1 md:px-0">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary">
              {heading}
            </h2>

            <div className="mt-5 text-foreground font-light space-y-4 text-lg leading-relaxed text-justify">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {linkHref && linkText && (
              <Link href={String(linkHref)} className="mt-8 inline-block">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent-foreground text-primary hover:bg-accent hover:text-foreground"
                >
                  {String(linkText)}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
