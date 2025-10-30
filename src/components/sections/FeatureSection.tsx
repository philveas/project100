// src/components/sections/FeatureSection.tsx

import { type FirestoreSection } from "@/types/sections";

interface FeatureSectionProps {
  // Receives an array of sections that have been filtered with kind: "featurecard"
  sections: FirestoreSection[]; 
}

export function FeatureSection({ sections }: FeatureSectionProps) {
  if (sections.length === 0) return null;

  // 1. Heading is already safely converted to a string
  const heading = String(sections[0]?.["featureHeading"] ?? "Why Choose Our Services?");

  return (
    <section className="py-16 md:py-24 bg-background border-t">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl text-primary font-headline font-semibold text-center mb-12">
          {heading}
        </h2>
        
        {/* Card Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {sections.map((f) => (
            // Individual Feature Card
            // NOTE: Use f.id for the key if entryId is optional
            <div key={f.id} className="p-6 bg-card rounded-lg shadow-sm border border-border transition-shadow hover:shadow-lg"> 
              <h3 className="text-xl font-semibold font-headline text-primary mb-3">
                {/* FIX 1: Guarantee cardTitle is a string */}
                {String(f?.["cardTitle"] ?? "Feature Title")}
              </h3>
              <p className="text-grey font-light">
                {/* FIX 2: Guarantee cardBody is a string */}
                {String(f?.["cardBody"] ?? "Feature description goes here.")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}