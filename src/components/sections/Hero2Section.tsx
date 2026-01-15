// src/components/sections/Hero2Section.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type ImageSectionProps } from "@/types/sections";
import { formatTextWithBreaks } from "@/lib/utils";

export const dynamic = "force-static";
export const runtime = "edge";

export function Hero2Section({ section, image, serviceTitle }: ImageSectionProps) {
  const folder =
    image?.folder ?? serviceTitle?.toLowerCase().replace(/\s+/g, "-") ?? "home";

  const imageId = image?.id ?? "grass2.0";

  // Base hero image paths (assumes -mobile and -tablet variants exist)
  const heroDesktopSrc = `/images/${folder}/${imageId}.webp`;
  const heroTabletSrc = `/images/${folder}/${imageId}-tablet.webp`;
  const heroMobileSrc = `/images/${folder}/${imageId}-mobile.webp`;

  // Text safety
  const heroHeading = String(section?.heroHeading ?? serviceTitle ?? "Service Title");

  const heroSubheading =
    typeof section?.heroSubheading === "string" ? section.heroSubheading : "";

  const heroBody = typeof section?.heroBody === "string" ? section.heroBody : "";

  // Mobile: flatten Alt+Enter
  const heroSubheadingMobile = heroSubheading
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\n+/g, " ")
    .trim();

  const heroBodyMobile = heroBody
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\n+/g, " ")
    .trim();

  const highlightAmpersands = (text: string) =>
    text.replace(/&/g, '<span class="text-accent">&amp;</span>');

  return (
    <section
      className="relative w-full flex items-center justify-center text-white overflow-hidden"
      style={{ height: "calc(100dvh - 80px)", minHeight: "500px" }}
    >
      {/* Hero image: browser picks mobile/tablet/desktop before JS (best for LCP) */}
      <picture>
        <source media="(min-width: 1024px)" srcSet={heroDesktopSrc} />
        <source media="(min-width: 640px)" srcSet={heroTabletSrc} />
        <img
          src={heroMobileSrc}
          alt={heroHeading}
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/50" />

      {/* Content */}
      <div className="relative z-10 container px-4 md:px-10 text-left">
        <h1
          className="font-headline text-3xl md:text-5xl font-semibold text-white drop-shadow-md mt-[-1.5rem] md:mt-[-2rem]"
          dangerouslySetInnerHTML={{
            __html: highlightAmpersands(heroHeading),
          }}
        />

        {/* Subheading */}
        {heroSubheading && (
          <>
            {/* Mobile */}
            <p className="md:hidden text-xl font-light mt-2 text-white drop-shadow-sm">
              {heroSubheadingMobile}
            </p>

            {/* Tablet + Desktop */}
            <div className="hidden md:block text-2xl md:text-3xl font-light mt-2 text-white drop-shadow-sm whitespace-pre-line">
              {formatTextWithBreaks(heroSubheading)}
            </div>
          </>
        )}

        {/* Body */}
        {heroBody && (
          <>
            {/* Mobile */}
            <p className="md:hidden mt-4 max-w-2xl text-lg font-light text-white">
              {heroBodyMobile}
            </p>

            {/* Tablet + Desktop */}
            <div className="hidden md:block mt-4 max-w-2xl text-lg font-light text-white whitespace-pre-line">
              {formatTextWithBreaks(heroBody)}
            </div>
          </>
        )}

        <div className="mt-8">
          <Button
            variant="ghost"
            asChild
            className="border border-accent-foreground text-white hover:border-primary hover:text-foreground transition-colors"
          >
            <Link href="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
