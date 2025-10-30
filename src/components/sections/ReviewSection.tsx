// src/components/sections/ReviewSection.tsx

import { type FirestoreSection } from "@/types/sections";

interface ReviewProps {
  // We receive an array of sections that have been filtered with kind: "review"
  sections: FirestoreSection[]; 
}

export function ReviewSection({ sections }: ReviewProps) {
  if (sections.length === 0) return null;

  // Assume the heading for the section comes from the first review entry
  // FIX APPLIED: Guarantee String type for the heading before rendering
  const heading = String(sections[0]?.["reviewHeading"] ?? "What Our Clients Say");

  return (
    <section className="py-16 md:py-24 bg-card border-t border-b">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl text-primary font-headline font-semibold text-center mb-12">
          {heading}
        </h2>
        
        {/* Use a grid layout for the review cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {sections.map((r) => (
            // FIX: Ensure key uses the guaranteed 'id' field
            <div key={r.id} className="p-6 bg-background rounded-lg shadow-md border-l-4 border-accent">
              <h3 className="text-xl font-semibold font-headline text-primary mb-3">
                {/* FIX 1: Safely render cardTitle */}
                {String(r?.["cardTitle"] ?? "Reviewer Name")} 
              </h3>
              <p className="text-grey font-light italic leading-relaxed">
                {/* FIX 2: Safely render cardBody */}
                {`"${String(r?.["reviewBody"] ?? "This is a placeholder for a great review.")}"`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}