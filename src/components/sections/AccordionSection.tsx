// src/components/sections/AccordionSection.tsx
import Image from "next/image";
import { getPlaceholder } from "@/lib/placeholders";
import { type FirestoreSection } from "@/types/sections";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

interface AccordionGroupProps {
    sections: FirestoreSection[];
}

// FIX 1: The exported function must match the intended unique name
export function AccordionSection({ sections }: AccordionGroupProps) {
    if (sections.length === 0) return null;

    // FIX 2: Explicitly convert heading to a guaranteed string for rendering
    const heading = String(sections[0]?.["accHeading"] ?? "Noise Survey Services");

    return (
        <section className="py-16 md:py-24 bg-card border-t">
            <div className="container px-4 md:px-6">
                <h2 className="text-4xl md:text-5xl font-headline font-semibold text-primary text-center mb-12">
                    {heading} {/* Now guaranteed safe string */}
                </h2>
                <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
                    {sections.map((s) => {
                        const image = getPlaceholder(String(s?.["imageIdDesktop"] ?? "")); // FIX: Ensure getPlaceholder input is string
                        // FIX APPLIED: Guarantee the value is a string before calling .split()
                        const items = String(s?.["accItems"] ?? "")
                        .split(/[;\n]/)
                        .map((x: string) => x.trim())
                        .filter(Boolean);
                        
                        return (
                            // FIX 3: Use s.id for guaranteed key and value
                            <AccordionItem key={s.id} value={String(s?.["accCategory"] ?? s.id)}>
                                <AccordionTrigger className="text-xl font-semibold text-left hover:no-underline">
                                    <div className="flex items-start w-full">
                                        {image && (
                                            <div className="relative w-32 h-24 mr-10 overflow-hidden rounded-lg">
                                                <Image
                                                    src={image.desktop?.src ?? image.mobile?.src ?? image.imageUrl ?? "/images/placeholder.webp"}
                                                    alt={String(image.description ?? s?.["accCategory"])} // FIX: Alt text must be safe string
                                                    fill
                                                    sizes="200px"
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        {/* FIX 4: Ensure rendered content is a safe string */}
                                        <span>{String(s?.["accCategory"])}</span> 
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="list-disc pl-6 space-y-2 mt-2">
                                        {items.map((it: string, i: number) => (
                                            <li key={i} className="text-grey-medium font-light">
                                                {it}
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </div>
        </section>
    );
}
