"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type ImageSectionProps } from "@/types/sections";
import { formatTextWithBreaks } from "@/lib/utils";

/**
 * Hero2Section — aligned with HeroSection
 * - Progressive mobile loading
 * - Desktop height now matches HeroSection height
 * - H1 vertical alignment corrected
 */
export function Hero2Section({ section, image, serviceTitle }: ImageSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- Image setup ---
  const folder =
    image?.folder ?? serviceTitle?.toLowerCase().replace(/\s+/g, "-") ?? "home";
  const imageId = image?.id ?? "grass2.0";

  const heroSrcDesktop = `/images/${folder}/${imageId}.webp`;
  const heroSrcMobileLowRes = `/images/${folder}/${imageId}-mobile-lowres.webp`;
  const heroSrcMobile = `/images/${folder}/${imageId}-mobile.webp`;

  // Progressive load for mobile
  useEffect(() => {
    if (!isMounted) return;

    if (isMobile) {
      setImgSrc(heroSrcMobileLowRes);

      const hi = new window.Image();
      hi.src = heroSrcMobile;
      hi.onload = () => setImgSrc(heroSrcMobile);
    } else {
      setImgSrc(heroSrcDesktop);
    }
  }, [isMounted, isMobile, heroSrcDesktop, heroSrcMobile, heroSrcMobileLowRes]);

  // --- Text content ---
  const heroHeading = section?.heroHeading ?? serviceTitle ?? "Service Title";
  const heroSubheading = section?.heroSubheading ?? "";
  const heroBody = section?.heroBody ?? "";

  const highlightAmpersands = (text: string) =>
    text.replace(/&/g, '<span class="text-accent">&amp;</span>');

  // --- SSR fallback ---
  if (!isMounted) {
    return (
      <section className="relative w-full h-[90vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-primary/50" />
        <div className="relative z-10 container px-4 md:px-10 text-left">
          <h1 className="font-headline text-3xl md:text-5xl font-semibold text-white">
            {String(heroHeading)}
          </h1>
        </div>
      </section>
    );
  }

  // --- MATCH HEROSECTION HEIGHT ---
  const sectionHeight = isMobile ? "90dvh" : "calc(100dvh - 80px)";

  return (
    <section
      className="relative w-full min-h-[500px] flex items-center justify-center text-white overflow-hidden"
      style={{
        height: sectionHeight,
        contain: "paint",
      }}
    >
      {/* Background image */}
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={String(heroHeading)}
          fill
          priority={imageId !== "grass2.0"}
          fetchPriority={imageId !== "grass2.0" ? "high" : "auto"}
          loading={imageId !== "grass2.0" ? "eager" : "lazy"}
          decoding="async"
          sizes="100vw"
          quality={isMobile ? 85 : 75}
          className={`object-cover w-full h-full transition-all duration-700 ${
            imgSrc.includes("lowres") ? "blur-md scale-[1.02]" : "blur-0 scale-100"
          }`}
        />
      )}

      {/* Tint overlay */}
      <div className="absolute inset-0 bg-primary/50" />

      {/* Text content */}
      <div className="relative z-10 container px-4 md:px-10 text-left">
        <h1
          className="font-headline text-3xl md:text-5xl font-semibold text-white drop-shadow-md mt-[-1.5rem] md:mt-[-2rem]"
          dangerouslySetInnerHTML={{
            __html: highlightAmpersands(String(heroHeading)),
          }}
        />

        {heroSubheading && (
          <h2 className="text-2xl md:text-3xl font-light mt-2 text-white drop-shadow-sm">
            {formatTextWithBreaks(String(heroSubheading))}
          </h2>
        )}

        {heroBody && (
          <p className="mt-4 max-w-2xl text-lg font-light text-white">
            {formatTextWithBreaks(String(heroBody))}
          </p>
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
