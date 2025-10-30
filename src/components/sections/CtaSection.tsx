// src/components/sections/Cta.tsx
import Link from "next/link";
import Image from "next/image";
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
        image?.desktop?.src ?? image?.mobile?.src ?? image?.imageUrl ?? FALLBACK_IMAGE_URL;
    const mobileSrc =
        image?.mobile?.src ?? image?.desktop?.src ?? image?.imageUrl ?? FALLBACK_IMAGE_URL;

    return (
        <section className="py-16 md:py-24 bg-card border-t">
            <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Image */}
                <div className="relative w-full mx-auto max-w-full md:max-w-[597px]">
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
                    <div className="absolute inset-0 bg-primary/20 rounded-lg" />
                </div>

                {/* Text */}
                <div className="text-center md:text-left px-1 md:px-0">
                    <h2 className="text-3xl md:text-4xl text-primary font-headline font-semibold">
                        {/* FIX 1: Convert heading content to safe string */}
                        {String(section?.["ctaHeading"] ?? "Ready to Discuss Your Project?")}
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-grey-foreground font-light">
                        {/* FIX 2: Convert body content to safe string */}
                        {String(section?.["ctaBody"] ??
                            "Our experts are ready to provide the insights you need. Contact us today for a consultation.")}
                    </p>
                    {/* FIX 3: Ensure button href is a safe string */}
                    <Link href={String(section?.["buttonHref"] ?? "/contact")}>
                        <Button
                            size="lg"
                            className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
                        >
                            {/* FIX 4: Convert button label to safe string */}
                            {String(section?.["buttonLabel"] ?? "Request a Consultation")}{" "}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}