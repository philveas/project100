// src/components/sections/AccordionWhiteSection.tsx

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { type FirestoreSection } from "@/types/sections";

interface AccordionGroupProps {
  sections: FirestoreSection[];
}

export function AccordionWhiteSection({ sections }: AccordionGroupProps) {
  if (sections.length === 0) return null;

  const heading = String(sections[0]?.["accHeading"] ?? "Noise Survey Services");

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="max-w-[70rem] mx-auto">

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl text-primary font-headline font-semibold text-center mb-8">
            {heading}
          </h2>

          {/* Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {sections.map((s, i) => {
              const category = String(s?.["accCategory"] ?? "");

              const items = String(s?.["accItems"] ?? "")
                .split(/[;\n]/)
                .map((x) => x.trim())
                .filter(Boolean);

              return (
                <AccordionItem
                  key={s.id ?? i}
                  value={category.toLowerCase().replace(/\s+/g, "-")}
                >
                  <AccordionTrigger
                    className="text-xl font-semibold text-center hover:no-underline"
                  >
                    {category}
                  </AccordionTrigger>

                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      {items.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-grey text-xl font-light leading-relaxed"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

        </div>
      </div>
    </section>
  );
}
