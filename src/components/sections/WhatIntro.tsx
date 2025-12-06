// src/components/sections/WhatIntroSection.tsx
// Home page introduction: single-column centered text section

import React from "react";
import { type TextSectionProps } from "@/types/sections";
import { formatTextWithBreaks } from "@/lib/utils";

/**
 * Formats headings so the first word and ampersands (&)
 * are accented using the primary color.
 */
function formatHeadingDynamic(text: string) {
  if (!text) return null;

  const words = text.split(/\s+/);
  return words.map((word, i) => {
    const highlight = i === 0 || word.trim() === "&";
    return (
      <span key={i} className={highlight ? "text-primary" : ""}>
        {word}
        {i < words.length - 1 && " "}
      </span>
    );
  });
}

/**
 * WhatIntroSection
 * - Used for the “What We Do” intro area on the home page.
 * - Center-aligned text and optional bullet points.
 */
export function WhatIntroSection({ section }: TextSectionProps) {
  const heading = String(section?.["whatHeading"] ?? "");
  const body = String(section?.["whatBody"] ?? "");
  const bullets =
    Array.isArray(section?.["whatBullet"])
      ? section["whatBullet"]
      : typeof section?.["whatBullet"] === "string"
      ? [section["whatBullet"]]
      : [];

  return (
    <section className="py-16 md:py-24 bg-card text-primary">
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Centered content wrapper */}
        <div className="max-w-6xl mx-auto text-center">
          {/* --- Heading --- */}
          {heading && (
            <h2 className="text-3xl md:text-4xl font-headline font-semibold leading-tight mb-6">
              {formatHeadingDynamic(heading)}
            </h2>
          )}

          {/* --- Body text --- */}
          {body && (
            <div className="text-lg md:text-xl font-light text-foreground/90 leading-relaxed text-center space-y-4">
              {formatTextWithBreaks(body)}
            </div>
          )}

          {/* --- Optional bullet points --- */}
          {bullets.length > 0 && (
            <ul className="list-none mt-6 space-y-2 text-lg font-light text-foreground/90">
              {bullets.map((b: string, i: number) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
