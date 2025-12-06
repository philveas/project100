"use client";

import React from "react";
import { type FirestoreSection } from "@/types/sections";
import * as Lucide from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FeatureHomeSectionProps {
  sections: FirestoreSection[];
}

/* ✅ Icon map — keyed by both readable & slug names */
const ICONS: Record<string, keyof typeof Lucide> = {
  // Slug keys
  "noise-survey": "AudioLines",
  "noise-impact-assessment": "ChartColumn",
  "acoustic-planning-support": "SquareCheckBig",
  "building-acoustics": "Building2",
  "acoustic-consultant": "Handshake",
  "acoustic-testing": "Speaker",

  // Readable keys (fallback)
  "Noise Survey": "AudioLines",
  "Noise Impact Assessment": "ChartColumn",
  "Acoustic Planning Support": "SquareCheckBig",
  "Building Acoustics": "Building2",
  "Acoustic Consultancy": "Handshake",
  "Acoustic Testing": "Speaker",
};

/* ✅ Icon renderer with dual-format fallback and logging */
function FeatureIcon({ serviceKey }: { serviceKey: string }) {
  if (!serviceKey) {
    return (
      <Lucide.HelpCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
    );
  }

  // Normalize the key to slug form
  const slug = serviceKey.toLowerCase().replace(/\s+/g, "-").trim();

  // Try slug first, then readable form
  const IconName = ICONS[slug] || ICONS[serviceKey];
  if (!IconName) {
    console.warn(`⚠️ No icon mapped for key: "${serviceKey}"`);
    return (
      <Lucide.HelpCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
    );
  }

  const Icon = Lucide[IconName as keyof typeof Lucide] as LucideIcon;
  if (!Icon) {
    console.warn(`⚠️ Icon not found in Lucide: "${IconName}"`);
    return (
      <Lucide.HelpCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
    );
  }

  return (
    <Icon
      className="h-10 w-10 text-primary mx-auto mb-4"
      strokeWidth={1.75}
      aria-hidden="true"
    />
  );
}

/* ✅ Main section */
export function FeatureHomeSection({ sections }: FeatureHomeSectionProps) {
  if (!sections || sections.length === 0) return null;

  const heading = String(
    sections[0]?.["featureHeading"] ?? "Our Services"
  );

  // ✅ Log what’s happening under the hood
  console.table(
    sections.map((s) => {
      const key = String(s?.["featureServiceKey"] ?? "");
      const slug = key.toLowerCase().replace(/\s+/g, "-").trim();
      return {
        id: s.id || s.entryId,
        featureServiceKey: key,
        slug,
        iconMapped: ICONS[slug] || ICONS[key] || "❌ No match",
      };
    })
  );

  return (
    <section
      aria-labelledby="feature-home-heading"
      className="py-16 md:py-24 bg-background"
    >
      <div className="container px-4 md:px-6">
        <h2
          id="feature-home-heading"
          className="text-3xl md:text-4xl text-primary font-headline font-semibold text-center mb-12"
        >
          {heading}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
          {sections.map((f) => {
            const key = String(f?.["featureServiceKey"] ?? "");

            return (
              <div
                key={f.id ?? f.entryId}
                className="p-6 bg-card rounded-lg shadow-sm border border-border transition-all hover:shadow-lg hover:-translate-y-1 text-center"
              >
                <FeatureIcon serviceKey={key} />

                <h3 className="text-xl font-semibold font-headline text-primary mb-3">
                  {String(f?.["cardTitle"] ?? "Feature Title")}
                </h3>
                <p className="text-foreground/80 font-light">
                  {String(f?.["cardBody"] ?? "Feature description goes here.")}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
