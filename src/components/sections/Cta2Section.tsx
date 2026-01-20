// src/components/sections/Cta2Section.tsx

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type TextSectionProps } from "@/types/sections";

export function Cta2Section({ section }: TextSectionProps) {
    return (
        <section className="relative bg-card">
            {/* Top brand colour band */}
            <div className="grid h-3 w-full grid-cols-3">
                <div className="bg-primary" />
                <div className="bg-secondary" />
                <div className="bg-accent-logo" />
            </div>

            {/* CTA content */}
            <div className="pt-8 pb-16 md:pt-8 md:pb-16">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-3xl md:text-4xl text-primary-headings font-headline font-semibold">
                            {String(section?.["ctaHeading"] ?? "Ready to Move Your Project Forward?")}
                        </h2>

                        <p className="mt-4 text-lg text-muted-foreground font-light mx-auto max-w-2xl">
                            {String(
                                section?.["ctaBody"] ??
                                    "Talk to an experienced acoustic consultant"
                            )}
                        </p>

                        <div className="mt-10">
                            <Link href={String(section?.["buttonHref"] ?? "/contact")}>
                                <Button
                                    size="lg"
                                    className="px-8 bg-primary text-card transition-colors hover:bg-accent/90 hover:text-foreground">
                                    {String(section?.["buttonLabel"] ?? "Get in Touch")}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>

                            <p className="mt-4 text-sm text-muted-foreground">
                                We're here to help!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
