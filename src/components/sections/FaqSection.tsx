// src/components/sections/FaqSection.tsx (FINAL CORRECTED SCRIPT)

import { type GroupSectionProps } from "@/types/sections";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

export function FaqSection({ sections }: GroupSectionProps) {
    if (sections.length === 0) return null;

    // 1. Heading is defined (and used below)
    const heading = String(sections[0]?.["faqHeading"] ?? "Frequently Asked Questions");

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container px-4 md:px-6">
                <div className="max-w-3xl mx-auto">
                    {/* 2. Heading is rendered (fixing the 'unused' warning) */}
                    <h2 className="text-3xl md:text-4xl text-primary font-headline font-semibold text-center mb-8">
                        {heading}
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                        {sections.map((f, i) => (
                            <AccordionItem 
                                key={f.id ?? i} 
                                value={`faq-${f.id ?? i}`}
                            >
                                <AccordionTrigger className="text-xl font-semibold text-left hover:no-underline">
                                    {String(f?.["faqQuestion"] ?? "")} 
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-l text-grey font-light leading-relaxed pt-2">
                                        {String(f?.["faqAnswer"] ?? "")}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}