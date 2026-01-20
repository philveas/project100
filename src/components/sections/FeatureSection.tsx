// src/components/sections/FeatureSection.tsx

"use client";

import React from "react";
import Link from "next/link";
import { type FirestoreSection } from "@/types/sections";
import * as Lucide from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FeatureSectionProps {
  sections: FirestoreSection[];
}

/* Map Firestore service keys to Lucide icons */
const ICONS: Record<string, keyof typeof Lucide> = {
  "noise-survey": "AudioLines",
  "noise-impact-assessment": "ChartColumn",
  "acoustic-planning-support": "SquareCheckBig",
  "building-acoustics": "Building2",
  "acoustic-consultant": "Handshake",
  "acoustic-testing": "Speaker",
};

function normaliseServiceKey(v: unknown) {
  return String(v ?? "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .trim();
}

function FeatureIcon({ keyName }: { keyName: string }) {
  const IconName = ICONS[keyName];

  const IconComponent: LucideIcon =
    (IconName &&
      (Lucide[IconName as keyof typeof Lucide] as LucideIcon)) ||
    Lucide.HelpCircle;

  return (
    <IconComponent
      className="h-9 w-9 text-primary mb-4"
      strokeWidth={1.75}
      aria-hidden="true"
    />
  );
}

export function FeatureSection({ sections }: FeatureSectionProps) {
  if (!sections || sections.length === 0) return null;

  const heading = String(sections[0]?.["featureHeading"] ?? "Why Choose Our Services?");

  return (
    <section className="bg-card py-10 md:py-20">
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
        <h2 className="text-3xl md:text-4xl text-primary-headings font-headline font-semibold text-center mb-12">
          {heading}
        </h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((f) => {
            const keyName = normaliseServiceKey(f?.["featureServiceKey"]);
            const hasServiceLink = keyName.length > 0;
            


            const CardInner = (
              <>
                {/* Icon only when a service key exists */}
                {hasServiceLink ? <FeatureIcon keyName={keyName} /> : null}

                <h3 className="text-xl font-semibold font-headline text-primary-headings mb-3">
                  {String(f?.["cardTitle"] ?? "Feature Title")}
                </h3>

                <p className="text-foreground/80 font-light leading-relaxed">
                  {String(f?.["cardBody"] ?? "Feature description goes here.")}
                </p>
              </>
            );

            const className =
              "p-6 bg-background rounded-lg shadow-sm border border-border " +
              "flex flex-col items-center text-center " +
              "transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg " +
               "focus:outline-none focus:ring-2 focus:ring-primary/30";


            // If featureServiceKey exists, make the whole card a link
            if (hasServiceLink) {
              return (
                <Link
                  key={f.id ?? f.entryId}
                  href={`/services/${keyName}`}
                  className={className}
                >
                  {CardInner}
                </Link>
              );
            }

            // Otherwise keep it as a normal card (current behaviour)
            return (
              <div key={f.id ?? f.entryId} className={className}>
                {CardInner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
