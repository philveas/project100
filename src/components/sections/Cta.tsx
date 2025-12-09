// src/components/sections/CtaSection.tsx

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSafeImageUrl } from "@/lib/utils"; // ✅ Add this
import { type ImageSectionProps } from "@/types/sections";

const FALLBACK = {
  desktop: { w: 597, h: 448 },
  mobile: { w: 320, h: 270 },
};
const FALLBACK_IMAGE_URL = "/images/home/grass2.0.webp";

export function CtaSection({ section, image }: ImageSectionProps) {
  // ✅ Always resolve images safely to prevent "/undefined"
  const desktopSrc = getSafeImageUrl(
    image?.desktop?.src ?? image?.mobile?.src ?? image?.imageUrl ?? FALLBACK_IMAGE_URL
  );
  const mobileSrc = getSafeImageUrl(
    image?.mobile?.src ?? image?.desktop?.src ?? image?.imageUrl ?? FALLBACK_IMAGE_URL
  );

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 items-center">
          
          {/* ✅ Image column */}
          <div className="relative w-full mx-auto max-w-full md:max-w-[597px] md:justify-self-start">
            {/* Mobile image */}
            <div className="md:hidden">
              <Image
                src={mobileSrc}
                alt={String(section?.["ctaHeading"] ?? "CTA image")}
                width={FALLBACK.mobile.w}
                height={FALLBACK.mobile.h}
                sizes="100vw"
                className="rounded-lg shadow-xl object-cover w-full h-auto"
                loading="lazy"
              />
            </div>

            {/* Desktop image */}
            <div className="hidden md:block">
              <Image
                src={desktopSrc}
                alt={String(section?.["ctaHeading"] ?? "CTA image")}
                width={FALLBACK.desktop.w}
                height={FALLBACK.desktop.h}
                sizes="(max-width: 1024px) 50vw, 597px"
                className="rounded-lg shadow-xl object-cover w-full h-auto"
                loading="lazy"
              />
            </div>

            {/* Optional overlay */}
            <div className="absolute inset-0 bg-primary/0 rounded-lg" />
          </div>

          {/* ✅ Text + CTA column */}
          <div className="text-center md:text-left px-1 md:px-0">
            <h2 className="text-3xl md:text-4xl text-primary font-headline font-semibold">
              {String(section?.["ctaHeading"] ?? "Ready to Discuss Your Project?")}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-grey-foreground font-light">
              {String(
                section?.["ctaBody"] ??
                  "Our experts are ready to provide the insights you need. Contact us today for a consultation."
              )}
            </p>

            {/* ✅ Button fix: use valid variant + Tailwind colors */}
            <Link href={String(section?.["buttonHref"] ?? "/contact")}>
              <Button
                size="lg"
                variant="outline"
                className="mt-8 border-accent text-primary bg-background hover:bg-accent hover:text-foreground transition-colors"
              >
                {String(section?.["buttonLabel"] ?? "Request a Consultation")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
