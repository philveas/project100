// src/components/sections/FeatureSection.tsx

import { type FirestoreSection } from "@/types/sections";

interface FeatureSectionProps {
  sections: FirestoreSection[];
}

export function FeatureSection({ sections }: FeatureSectionProps) {
  if (sections.length === 0) return null;

  const heading = String(
    sections[0]?.["featureHeading"] ?? "Why Choose Our Services?"
  );

  return (
    <section className="bg-card py-16 md:py-24">
      {/* 🔥 Outer boundaries aligned with all other sections */}
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl text-primary font-headline font-semibold text-center mb-12">
          {heading}
        </h2>

        {/* Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8  mx-auto">
          {sections.map((f) => (
            <div
              key={f.id}
              className="p-6 bg-background rounded-lg shadow-sm border border-border transition-shadow hover:shadow-lg"
            >
              {/* Card Title */}
              <h3 className="text-xl font-semibold font-headline text-primary mb-3">
                {String(f?.["cardTitle"] ?? "Feature Title")}
              </h3>

              {/* Card Body */}
              <p className="text-grey font-light">
                {String(f?.["cardBody"] ?? "Feature description goes here.")}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
