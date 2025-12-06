"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * ✅ Only loads the video on desktop after hydration.
 * On mobile, it will never render the <video> element — so no video download.
 */
export function HomeHeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true); // ensures this only runs client-side
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const heroVideo = "/videos/home-hero.mp4"; // adjust path
  const heroImage = "/images/home/home-hero-mobile.webp";
  const heroHeading = "Acoustic Design for the Built Environment";

  // 🧠 During SSR, render nothing in background to avoid server mismatch
  if (!isMounted) {
    return (
      <section className="relative w-full h-[90vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 container px-4 md:px-10 text-left">
          <h1 className="font-headline text-3xl md:text-5xl font-semibold text-white">
            {heroHeading}
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[90vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0">
        {isMobile ? (
          <Image
            src={heroImage}
            alt="Home hero"
            fill
            priority
            quality={80}
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <video
            src={heroVideo}
            poster="/images/home/home-hero-lowres.webp"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-primary/60" />

      <div className="relative z-10 container px-4 md:px-10 text-left">
        <h1 className="font-headline text-3xl md:text-5xl font-semibold text-white">
          {heroHeading}
        </h1>
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
