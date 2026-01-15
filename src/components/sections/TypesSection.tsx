// src/components/sections/TypesSection.tsx

"use client";

import { useEffect, useRef, useState } from "react";
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
 *
 * Mobile UX improvement:
 * When a card expands on mobile, we auto-scroll so the expanded card is positioned nicely
 * in the viewport (either aligned below the fixed header or aligned to the bottom).
 */
export function TypesSection({ sections }: TypesSectionProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Store a ref for each card so we can scroll to it when expanded
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  if (!sections?.length) return null;

  const heading = String(sections[0]?.["typesHeading"] ?? "Types of Noise Assessments");

  // ✅ Fallback image (lives in /public/images/home/)
  const FALLBACK_IMAGE_URL = "/images/home/grass2.0.webp";

  // ---------------------------------------------
  // MOBILE SCROLL SETTINGS (EDIT THESE)
  // ---------------------------------------------
  // Your header is h-24 => 96px (adjust if you change header height)
  const MOBILE_HEADER_PX = 96;

  // Extra breathing room under header / above bottom
  const MOBILE_PADDING_PX = 12;

  // Choose ONE:
  // "top"    => align expanded card top just below header
  // "bottom" => align expanded card bottom to bottom of viewport
  const MOBILE_SCROLL_MODE: "top" | "bottom" = "top";

  // ---------------------------------------------
  // Auto-scroll when expanding on mobile
  // ---------------------------------------------
  useEffect(() => {
    if (!expandedItem) return;
    if (typeof window === "undefined") return;

    // Only do this on mobile (md breakpoint is 768px)
    if (window.matchMedia("(min-width: 768px)").matches) return;

    const el = cardRefs.current[expandedItem];
    if (!el) return;

    // Let the expanded height apply before measuring
    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const pageY = window.scrollY;

      if (MOBILE_SCROLL_MODE === "top") {
        // Card top just below header + padding
        const targetY = pageY + rect.top - MOBILE_HEADER_PX - MOBILE_PADDING_PX;
        window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
        return;
      }

      // "bottom" mode: card bottom sits above viewport bottom with padding
      const viewportBottomY = pageY + window.innerHeight;
      const cardBottomY = pageY + rect.bottom;

      const delta = cardBottomY - (viewportBottomY - MOBILE_PADDING_PX);
      const targetY = pageY + delta;

      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
    });
  }, [expandedItem]);

  return (
    <section className="py-8 md:py-10 bg-card">
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* --- Section Heading --- */}
        <h2 className="text-3xl md:text-4xl text-primary font-headline font-semibold text-center mb-12">
          {heading}
        </h2>

        {/* --- Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((s) => {
            // --- Image Data Retrieval ---
            const rawId = String(s?.["imageIdDesktop"] ?? "").trim().toLowerCase();
            const id = rawId.replace(/\.(webp|jpg|jpeg|png)$/i, "");

            const image = getPlaceholder(id) || PlaceholderImages.find((p) => p.id === id);

            const imageSrc = image?.desktop?.src || image?.mobile?.src || image?.imageUrl;

            const imageUrl = imageSrc || FALLBACK_IMAGE_URL;

            const imageAlt = String(image?.description ?? s?.["typesCategory"] ?? "Assessment Type");

            // --- Text Data ---
            const category = String(s?.["typesCategory"] ?? s?.["typesSection"] ?? "Category");

            const rawItems = String(s?.["typesItems"] ?? s?.["typesContent"] ?? "");

            const items = rawItems
              .split(/[;\n]/)
              .map((x) => x.trim())
              .filter(Boolean);

            const isExpanded = expandedItem === s.id;

            return (
              <div
                key={s.id}
                ref={(node) => {
                  cardRefs.current[s.id] = node;
                }}
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
                    // Note: Next/Image wraps img internally, but this still often works.
                    // If it doesn't, the fallback via imageUrl above already covers most cases.
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE_URL;
                  }}
                />

                {/* --- Overlay --- */}
                <div
                  className={cn(
                    "absolute inset-0 transition-colors duration-500",
                    isExpanded ? "bg-primary/80" : "bg-primary/20 group-hover:bg-primary/50"
                  )}
                />

                {/* --- Text Content --- */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white mix-blend-screen">
                  <h3 className="text-xl font-headline text-white font-semibold mb-2 leading-tight">
                    {category}
                  </h3>

                  {/* --- Expanded Details --- */}
                  <div
                    className={cn(
                      "transition-all duration-500 ease-in-out overflow-hidden",
                      isExpanded ? "max-h-64 opacity-100 mt-2" : "max-h-0 opacity-0"
                    )}
                  >
                    <ul className="space-y-2">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                          <span className="font-light text-xs leading-snug text-white">{item}</span>
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
