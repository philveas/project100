// src/components/sections/CtaSection.tsx

"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type ImageSectionProps } from "@/types/sections";

const FALLBACK = {
    desktop: { w: 597, h: 448 },
    mobile: { w: 320, h: 270 },
};

const FALLBACK_IMAGE_URL = "/images/home/grass2.0.webp";

export function CtaSection({ section, image }: ImageSectionProps) {
    const desktopSrc =
        image?.desktop?.src ??
        image?.mobile?.src ??
        image?.imageUrl ??
        FALLBACK_IMAGE_URL;

    const mobileSrc =
        image?.mobile?.src ??
        image?.desktop?.src ??
        image?.imageUrl ??
        FALLBACK_IMAGE_URL;

    return (
        <section className="pt-10 pb-10 md:pt-16 md:pb-16 bg-card">
            <div className="container px-4 sm:px-6 lg:px-8 xl:px-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center">

                {/* Image */}
                <div className="relative w-full max-w-full md:max-w-[597px]">
                    {/* Mobile image */}
                    <div className="md:hidden">
                        <Image
                            src={mobileSrc}
                            alt={String(section?.["ctaHeading"] ?? "cta image")}
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
                            alt={String(section?.["ctaHeading"] ?? "cta image")}
                            width={FALLBACK.desktop.w}
                            height={FALLBACK.desktop.h}
                            sizes="(max-width: 1024px) 50vw, 597px"
                            className="rounded-lg shadow-xl object-cover w-full h-auto"
                            loading="lazy"
                        />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-primary/10 rounded-lg" />
                </div>

                {/* Text */}
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

                    <Link href={String(section?.["buttonHref"] ?? "/contact")}>
                        <Button
                            size="lg"
                            className="mt-8 bg-transparent border border-secondary-foreground text-foreground hover:bg-accent/90 hover:text-foreground"
                        >
                            {String(section?.["buttonLabel"] ?? "Request a Consultation")}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
