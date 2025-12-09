"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type ImageSectionProps } from "@/types/sections";
import { formatTextWithBreaks } from "@/lib/utils";

export function HeroSection({ section, image, serviceTitle }: ImageSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- Folder + Files ---
    // --- Folder + Files ---
  // Allow extra fields beyond the base ResolvedImage type
  const heroImage = image as any;

  const folderName = heroImage?.folder ?? "home";
  const desktopLowResFile =
    heroImage?.desktopLowRes ?? "home-hero-desktop-lowres.webp";
  const desktopFallbackFile =
    heroImage?.desktopFallback ?? "home-hero-desktop-fallback.webp";
  const videoFile =
    heroImage?.videoFile ?? "acoustic-design-places-we-work-learn-live2.mp4";
  const mobileLowResFile =
    heroImage?.mobileLowRes ?? "home-hero-mobile-lowres.webp";
  const mobileFallbackFile =
    heroImage?.mobileFallback ?? "home-hero-mobile-fallback.webp";


  const videoSrc = `/videos/${folderName}/${videoFile}`;
  const imgDesktopLowRes = `/images/${folderName}/${desktopLowResFile}`;
  const imgDesktopFallback = `/images/${folderName}/${desktopFallbackFile}`;
  const imgMobileLowRes = `/images/${folderName}/${mobileLowResFile}`;
  const imgMobile = `/images/${folderName}/${mobileFallbackFile}`;


  // --- Progressive load ---
  useEffect(() => {
    if (!isMounted) return;

    if (isMobile) {
      setImgSrc(imgMobileLowRes);
      const hi = new window.Image();
      hi.src = imgMobile;
      hi.onload = () => setImgSrc(imgMobile);
    } else {
      setImgSrc(imgDesktopLowRes);
    }
  }, [isMounted, isMobile, imgMobileLowRes, imgMobile, imgDesktopLowRes]);

  // --- Text content ---
  const heroHeading =
    section?.heroHeading ?? serviceTitle ?? "Acoustic Design for the Built Environment";
  const heroSubheading = section?.heroSubheading ?? "";
  const heroBody = section?.heroBody ?? "";

  // --- Highlight '&' ---
  const highlightAmpersands = (text: string) =>
    text.replace(/&/g, '<span class="text-accent !text-accent">&amp;</span>');

  // --- Manual height control ---
  // Adjust these to your preference
  const MOBILE_HEIGHT = "90dvh"; // try 80–100dvh
  const DESKTOP_HEIGHT = "calc(100dvh - 80px)"; // subtract header height if needed

  const sectionHeight = isMobile ? MOBILE_HEIGHT : DESKTOP_HEIGHT;


  
  // --- Early SSR fallback ---
  if (!isMounted) {
    return (
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 container px-4 md:px-10 text-left">
          <h1 className="font-headline text-3xl md:text-5xl font-semibold text-white">
            {String(heroHeading)}
          </h1>
        </div>
      </section>
    );
  }

  
  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        height: sectionHeight,
        minHeight: "500px",
        maxHeight: "100dvh",
        contain: "paint",
      }}
    >
      {/* --- Background --- */}
      <div className="absolute inset-0">
        {/* Mobile: low-res → high-res */}
        {isMobile && imgSrc && (
          <Image
            src={imgSrc}
            alt={String(heroHeading)}
            fill
            priority
            fetchPriority="high"
            loading="eager"
            decoding="async"
            sizes="100vw"
            quality={85}
            className={`object-cover transition-all duration-700 ${
              imgSrc.includes("lowres") ? "blur-md scale-[1.02]" : "blur-0 scale-100"
            }`}
          />
        )}

        {/* Desktop: low-res → video/fallback */}
        {!isMobile && (
          <>
            {imgSrc && (
              <Image
                src={imgSrc}
                alt={String(heroHeading)}
                fill
                priority
                fetchPriority="high"
                loading="eager"
                decoding="async"
                sizes="100vw"
                quality={70}
                className="object-cover"
              />
            )}
            {!videoFailed ? (
              <video
                key="hero-video"
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="object-cover w-full h-full absolute inset-0"
                onError={() => setVideoFailed(true)}
              />
            ) : (
              <Image
                src={imgDesktopFallback}
                alt={String(heroHeading)}
                fill
                priority
                sizes="100vw"
                quality={85}
                className="object-cover absolute inset-0"
              />
            )}
          </>
        )}
      </div>

      {/* Tint overlay */}
      <div className="absolute inset-0 bg-primary/50" />

      {/* Text */}
      <div className="relative z-10 container px-4 md:px-10 text-left">
        <h1
          className="font-headline text-3xl md:text-5xl font-semibold text-white drop-shadow-md"
          dangerouslySetInnerHTML={{
            __html: highlightAmpersands(String(heroHeading)),
          }}
        />

        {heroSubheading && (
          <h2
            className="text-2xl md:text-3xl font-light mt-2 text-white drop-shadow-sm"
            dangerouslySetInnerHTML={{
              __html: highlightAmpersands(String(heroSubheading)).replace(/\n/g, "<br />"),
            }}
          />
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
