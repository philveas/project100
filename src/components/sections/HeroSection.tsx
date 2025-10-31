// src/components/sections/Hero.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { type ImageSectionProps } from "@/types/sections";
import { formatHeroText, formatTextWithBreaks } from "@/lib/utils";




const FALLBACK_IMAGE_URL = "/images/home/grass2.0.webp";

export function HeroSection({ section, image, serviceTitle }: ImageSectionProps) {
    const desktopSrc =
        image?.desktop?.src ?? image?.mobile?.src ?? image?.imageUrl ?? FALLBACK_IMAGE_URL;
    const mobileSrc =
        image?.mobile?.src ?? image?.desktop?.src ?? image?.imageUrl ?? FALLBACK_IMAGE_URL;

    // FIX 1: Guarantee heroHeading is a string for alt attribute and rendering
    const heroHeading = String(section?.["heroHeading"] ?? serviceTitle ?? "Service Title");
    
    return (
        <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
            
            {/* Background Image (Responsive) */}
            <div className="absolute inset-0">
                <Image
                    src={mobileSrc} // Default to mobile source
                    alt={heroHeading}
                    fill
                    sizes="100vw"
                    className="object-cover md:hidden"
                    priority
                    quality={80}
                />
                <Image
                    src={desktopSrc} // Desktop source for larger screens
                    alt={heroHeading}
                    fill
                    sizes="100vw"
                    className="object-cover hidden md:block"
                    priority
                    quality={80}
                />
            </div>

            <div className="absolute inset-0 bg-primary/60" />
            
            {/* Content */}

<div className="relative z-10 container px-4 md:px-10 text-left">
  {/* Hero Heading */}
  <h1 className="font-headline text-3xl md:text-5xl font-semibold text-white">
  {formatHeroText(String(section?.heroText ?? heroHeading))}
</h1>

  {/* Subheading */}
  {section?.heroSubheading && (
    <p className="mt-3 text-lg text-2xl md:text-2xl font-light text-white">
      {formatTextWithBreaks(String(section.heroSubheading))}

    </p>
  )}

  {/* Body */}
  {section?.heroBody && (
    <p className="mt-4 max-w-2xl text-lg font-light text-white">
      {formatTextWithBreaks(String(section.heroBody))}
    </p>
  )}

  {/* CTA Button */}
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