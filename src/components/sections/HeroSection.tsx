"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatTextWithBreaks } from "@/lib/utils";
import { type ImageSectionProps } from "@/types/sections";

/* --------------------------------------------------
 * Helper: Respect spreadsheet line breaks + accent &
 * -------------------------------------------------- */
function HeroTextWithLineBreaks({
  text,
  accentClass = "text-accent",
}: {
  text: string;
  accentClass?: string;
}) {
  if (!text) return null;

  // Split exactly on spreadsheet / Firestore line breaks
  const lines = text.split(/\r?\n/);

  return (
    <>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split("&").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className={accentClass}>&amp;</span>
              )}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

export function HeroSection({ section, serviceTitle }: ImageSectionProps) {
  // null until mounted to avoid SSR mismatch
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      const desktop = mq.matches;
      setIsDesktop(desktop);

      // Never enhance on mobile/tablet
      if (!desktop) setEnhanced(false);
    };

    update();
    mq.addEventListener("change", update);

    return () => {
      mq.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const idle = requestIdleCallback(() => setEnhanced(true));
    return () => cancelIdleCallback(idle);
  }, [isDesktop]);

  /* --------------------------------------------------
   * Assets
   * -------------------------------------------------- */
  const MOBILE_IMAGE = "/images/home/home-hero-mobile.webp";
  const TABLET_IMAGE = "/images/home/home-hero-tablet.webp";
  const DESKTOP_IMAGE = "/images/home/home-hero-desktop.webp";
  const DESKTOP_VIDEO =
    "/videos/home/acoustic-design-places-we-work-learn-live3.webm";

  /* --------------------------------------------------
   * Text
   * -------------------------------------------------- */
  const heroHeading = String(
    section?.heroHeading ?? serviceTitle ?? "Acoustic Design for the Built Environment"
  );

  // Only accept real strings for these two (prevents rendering "true" or "[object Object]")
  const heroSubheading =
    typeof section?.heroSubheading === "string" ? section.heroSubheading : "";

  const heroBody = typeof section?.heroBody === "string" ? section.heroBody : "";

  return (
    <section
      className="
        relative w-full overflow-hidden flex items-center
        h-[calc(100dvh-80px)] min-h-[500px]
      "
    >
      {/* Hero image: browser picks mobile/tablet/desktop before JS (best for LCP) */}
      <picture>
        <source media="(min-width: 1024px)" srcSet={DESKTOP_IMAGE} />
        <source media="(min-width: 640px)" srcSet={TABLET_IMAGE} />
        <img
          src={MOBILE_IMAGE}
          alt={heroHeading}
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/* Desktop video (idle only) */}
      {isDesktop === true && enhanced && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={DESKTOP_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/50" />

      {/* Content */}
      <div className="relative z-10 container px-4 md:px-10">
        <h1 className="font-heading text-3xl md:text-5xl font-semibold text-white">
          {heroHeading}
        </h1>

        {heroSubheading && (
          <h2 className="text-xl md:text-2xl font-light mt-3 text-white leading-tight">
            <HeroTextWithLineBreaks text={heroSubheading} />
          </h2>
        )}

        {heroBody && (
          <p className="mt-4 max-w-2xl text-lg font-light text-white">
            {formatTextWithBreaks(heroBody)}
          </p>
        )}

        <div className="mt-8">
          <Button
            asChild
            variant="ghost"
            className="border border-accent-foreground text-white hover:text-foreground"
          >
            <Link href="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
