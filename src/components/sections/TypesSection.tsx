"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { getPlaceholder, PlaceholderImages } from "@/lib/placeholders";
import { type FirestoreSection } from "@/types/sections";
import { cn } from "@/lib/utils";

interface TypesSectionProps {
  sections: FirestoreSection[];
}

/**
 * Interactive grid of assessment or service "types"
 * Each card toggles open to reveal detailed bullet points.
 */
export function TypesSection({ sections }: TypesSectionProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  if (!sections?.length) return null;

  const heading = String(
    sections[0]?.["typesHeading"] ?? "Types of Noise Assessments"
  );

  // 🛑 PATH DEFINITIONS (Confirmed Correct)
  const TYPE_IMAGE_PATH_PREFIX = "/images/noise-survey/";
  const FALLBACK_IMAGE_URL = "/images/grass2.0.webp"; 

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* --- Section Heading --- */}
        <h2 className="text-3xl md:text-4xl text-primary font-headline font-semibold text-center mb-12">
          {heading}
        </h2>

        {/* --- Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((s) => {
            console.log("🧩 Checking placeholder:", s?.["imageIdDesktop"]);

            // 1️⃣ --- Image Data Retrieval ---
            const id = String(s?.["imageIdDesktop"] ?? "");
            console.log({
  firestoreValue: s?.["imageIdDesktop"],
  id,
  matched: !!getPlaceholder(id),
  expectedIds: PlaceholderImages.map(p => p.id).slice(0, 10) // show first 10 for sanity check
});

            
            const image =
              getPlaceholder(id) ||
              PlaceholderImages.find((p) => p.id === id);

            if (!image) {
              console.warn(`⚠️ Missing placeholder for: ${s?.["imageIdDesktop"]}`);
            }

            // Get the raw source from the placeholder data (e.g., "survey-type-env.webp" or "/images/survey-type-env.webp")
            const imageSrc =
              image?.desktop?.src ||
              image?.mobile?.src ||
              image?.imageUrl;

const imageUrl = imageSrc || FALLBACK_IMAGE_URL;

            
            console.log("🖼️ Final Image URL:", imageUrl);


            const imageAlt = String(image?.description ?? s?.["typesCategory"] ?? "Assessment Type");

            // 2️⃣ --- Text Data ---
            const category = String(
              s?.["typesCategory"] ?? s?.["typesSection"] ?? "Category"
            );

            const rawItems = String(
              s?.["typesItems"] ?? s?.["typesContent"] ?? ""
            );

            const items = rawItems
              .split(/[;\n]/)
              .map((x) => x.trim())
              .filter(Boolean);

            const isExpanded = expandedItem === s.id;

            // 3️⃣ --- Card Component ---
            return (
              <div
                key={s.id}
                onClick={() => setExpandedItem(isExpanded ? null : s.id)}
                className={cn(
                  "relative w-full transition-all duration-500 ease-in-out overflow-hidden rounded-lg shadow-lg cursor-pointer group",
                  isExpanded ? "h-[400px]" : "h-72"
                )}
              >
                {/* --- Background Image --- */}
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    console.warn(`🖼️ Failed to load image: ${imageUrl}`);
                    // Fallback uses the confirmed path
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE_URL;
                  }}
                />

                {/* --- Overlay --- */}
                <div
                  className={cn(
                    "absolute inset-0 transition-colors duration-500",
                    isExpanded ? "bg-primary/80" : "bg-primary/30 group-hover:bg-primary/50"
                  )}
                />

                {/* --- Text Content --- */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
                  <h3 className="text-xl font-headline font-semibold mb-2 leading-tight">
                    {category}
                  </h3>

                  {/* --- Expanded Details --- */}
                  <div
                    className={cn(
                      "transition-all duration-500 ease-in-out overflow-hidden",
                      isExpanded
                        ? "max-h-64 opacity-100 mt-2"
                        : "max-h-0 opacity-0"
                    )}
                  >
                    <ul className="space-y-2">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="font-light text-xs leading-snug">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* --- Hover hint --- */}
                  {!isExpanded && (
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[10px] bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-white uppercase tracking-wider">
                        View
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}