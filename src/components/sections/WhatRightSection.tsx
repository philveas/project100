// src/components/sections/WhatRightSection.tsx
import Image from "next/image";
import { type ImageSectionProps } from "@/types/sections";

const FALLBACK = {
  desktop: { w: 597, h: 448 },
  mobile: { w: 320, h: 270 },
};
const FALLBACK_IMAGE_URL = "/images/home/grass2.0.webp";

/**
 * Renders a two-column section with text on the left and image on the right.
 * Mirrors WhatLeftSection but without a button.
 */
export function WhatRightSection({ section }: Partial<ImageSectionProps>) {
  console.log("🧠 WhatRightSection input:", {
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
  const heading = String(
    (section as any)?.["heading"] ??
      (section as any)?.["whatHeading"] ??
      "Professional Acoustic Design Advice"
  );

  const body =
    (section as any)?.["description"] ??
    (section as any)?.["whatBody"] ??
    "";

  const paragraphs = String(body)
    .split("\n")
    .map((p: string) => p.trim())
    .filter(Boolean);

  // --- Render ---
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Grid for two columns: Text Left, Image Right */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 items-center">
          {/* === 1st Column: Text Content (Left) === */}
          <div className="text-left md:text-right px-1 md:px-0">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary">
              {heading}
            </h2>
            <div className="mt-4 text-foreground font-light space-y-4 text-lg leading-relaxed text-justify">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* === 2nd Column: Image (Right) === */}
          <div className="relative w-full mx-auto max-w-full md:max-w-[598px] md:justify-self-end">
            {/* Mobile Image */}
            <div className="md:hidden">
              <Image
                src={mobileSrc}
                alt={String(
                  (section as any)?.["description"] ??
                    "Acoustic consultants meeting with architects"
                )}
                width={FALLBACK.mobile.w}
                height={FALLBACK.mobile.h}
                sizes="100vw"
                className="rounded-lg shadow-xl object-cover w-full h-auto"
                loading="lazy"
              />
            </div>

            {/* Desktop Image */}
            <div className="hidden md:block">
              <Image
                src={desktopSrc}
                alt={String(
                  (section as any)?.["description"] ??
                    "Acoustic consultants meeting with architects"
                )}
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
