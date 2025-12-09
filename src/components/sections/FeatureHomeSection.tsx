"use client";

import React from "react";
import Link from "next/link";
import { type FirestoreSection } from "@/types/sections";
import * as Lucide from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FeatureHomeSectionProps {
  sections: FirestoreSection[];
}

/* 🔹 Map Firestore service keys to Lucide icons */
const ICONS: Record<string, keyof typeof Lucide> = {
  "noise-survey": "AudioLines",
  "noise-impact-assessment": "ChartColumn",
  "acoustic-planning-support": "SquareCheckBig",
  "building-acoustics": "Building2",
  "acoustic-consultant": "Handshake",
  "acoustic-testing": "Speaker",
};

/* 🔹 Render a feature icon safely */
function FeatureIcon({ keyName }: { keyName: string }) {
  const IconName = ICONS[keyName];

  // ⭐ TypeScript-safe React component
  const IconComponent: LucideIcon =
    (IconName &&
      (Lucide[IconName as keyof typeof Lucide] as LucideIcon)) ||
    Lucide.HelpCircle;

  return (
    <IconComponent
      className="h-10 w-10 text-primary mx-auto mb-4"
      strokeWidth={1.75}
      aria-hidden="true"
    />
  );
}

/* 🔹 Main Section Component */
export function FeatureHomeSection({ sections }: FeatureHomeSectionProps) {
  if (!sections || sections.length === 0) return null;

  const heading = String(sections[0]?.["featureHeading"] ?? "Our Services");

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <h2 className="text-3xl md:text-4xl font-headline font-semibold text-center text-primary mb-12">
          {heading}
        </h2>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((f) => {
            const keyName = String(f?.["featureServiceKey"] ?? "")
              .toLowerCase()
              .replace(/\s+/g, "-")
              .trim();

            const serviceUrl = `/services/${keyName}`;

            return (
              <Link
                key={f.id ?? f.entryId}
                href={serviceUrl}
                className="block p-6 bg-card rounded-lg shadow-sm border border-border text-center 
                           transition-transform duration-300 ease-out 
                           hover:-translate-y-1 hover:shadow-lg 
                           focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <FeatureIcon keyName={keyName} />

                <h3 className="text-xl font-semibold font-headline text-primary mb-3">
                  {String(f?.["cardTitle"] ?? "Feature Title")}
                </h3>

                <p className="text-foreground/80 font-light leading-relaxed">
                  {String(f?.["cardBody"] ?? "Feature description goes here.")}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
