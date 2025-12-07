"use client";

// src/components/sections/AccordionSection.tsx
import Image from "next/image";
import { Check } from "lucide-react"; 
import { getPlaceholder } from "@/lib/placeholders";
import { type FirestoreSection } from "@/types/sections";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface AccordionGroupProps {
    sections: FirestoreSection[];
}

export function AccordionSection({ sections }: AccordionGroupProps) {
    if (sections.length === 0) return null;

    const heading = String(sections[0]?.["accHeading"] ?? "Service Details");

    return (
        <section className="py-16 md:py-24 bg-card">
            <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
                <h2 className="text-4xl md:text-4xl font-headline font-semibold text-primary text-center mb-12">
                    {heading}
                </h2>
                <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
                    {sections.map((s) => {
                        const image = getPlaceholder(String(s?.["imageIdDesktop"] ?? ""));
                        
                        const imageUrl = image?.desktop?.src || image?.mobile?.src || image?.imageUrl || "/images/placeholder.webp";
                        const imageAlt = String(image?.description ?? s?.["accCategory"] ?? "Accordion Image");

                        const items = String(s?.["accItems"] ?? "")
                            .split(/[;\n]/)
                            .map((x: string) => x.trim())
                            .filter(Boolean);

                        const itemValue = String(s?.["accCategory"] ?? s.id);

                        return (
                            <AccordionItem 
                                key={s.id} 
                                value={itemValue} 
                                className="group border-b overflow-hidden"
                            >
                                <AccordionTrigger 
                                    className={cn(
                                        "flex flex-1 items-center justify-between py-4 font-medium transition-all",
                                        "hover:underline [&[data-state=open]>svg]:rotate-180",
                                        "text-xl font-semibold text-left hover:no-underline"
                                    )}
                                >
                                    <div className="flex items-center w-full self-stretch">
                                        {image && imageUrl !== "/images/placeholder.webp" && (
                                            <div className="relative w-24 h-24 mr-8 shrink-0">
                                                {/* UPDATED ANIMATION LOGIC:
                                                   1. duration-[600ms]: Applied by default (when closing), matches content closing speed.
                                                   2. group-data-[state=open]:duration-200: Applied when open, matches standard 'accordion-down' speed.
                                                */}
                                                <div className="absolute top-0 left-0 w-24 h-24 transition-all ease-out duration-[2000ms] group-data-[state=open]:w-32 group-data-[state=open]:h-32 group-data-[state=open]:duration-2000">
                                                    <Image
                                                        src={imageUrl}
                                                        alt={imageAlt}
                                                        fill
                                                        className="object-cover rounded-lg"
                                                        sizes="(max-width: 768px) 100vw, 200px"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <span className={cn("py-4", image && imageUrl !== "/images/placeholder.webp" ? "pl-8" : "")}>
                                            {String(s?.["accCategory"])}
                                        </span>
                                    </div>
                                </AccordionTrigger>

                                {/* Content closes in 0.6s (matching the image default duration) */}
                                <AccordionContent className="data-[state=closed]:animate-[accordion-up_0.6s_ease-out]">
                                    <div className="pb-4 pt-4 pl-4 md:pl-40">
                                        <ul className="space-y-2">
                                            {items.map((it: string, i: number) => (
                                                <li key={i} className="flex items-start">
                                                    <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                                    <span className="text-muted-foreground font-light">
                                                        {it}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </div>
        </section>
    );
}