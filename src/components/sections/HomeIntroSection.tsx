// src/components/sections/HomeIntroSection.tsx
// Home page intro section
//
// Changes (same principles as WhatIntroSection):
// - Mobile vs desktop spacing controls via easy constants below
// - Alt+Enter line breaks: ignored on mobile, preserved on desktop
// - Clear controls for spacing above/below section, heading, body, bullets

import React from "react";
import { type TextSectionProps } from "@/types/sections";
import { formatTextWithBreaks } from "@/lib/utils";

/**
 * HomeIntroSection
 * - Used for the intro area on the home page.
 * - Center-aligned text and optional bullet points.
 */
export function HomeIntroSection({ section }: TextSectionProps) {
  const heading = String(section?.["whatHeading"] ?? "");
  const body = String(section?.["whatBody"] ?? "");
  const bullets =
    Array.isArray(section?.["whatBullet"])
      ? section["whatBullet"]
      : typeof section?.["whatBullet"] === "string"
      ? [section["whatBullet"]]
      : [];

  // -----------------------------
  // SPACING CONTROLS (EDIT THESE)
  // -----------------------------
  // Section padding (space above and below the whole block)
    const SECTION_PT_MOBILE = "pt-8";
  const SECTION_PB_MOBILE = "pb-6";
  const SECTION_PT_DESKTOP = "md:pt-10";
  const SECTION_PB_DESKTOP = "md:pb-10";

  // Space between heading and body
  const HEADING_MB_MOBILE = "mb-4";
  const HEADING_MB_DESKTOP = "md:mb-3";

  // Space below body (before bullets or next content)
  const BODY_MB_MOBILE = "mb-5";
  const BODY_MB_DESKTOP = "md:mb-4";

  // Space above bullets (if bullets exist)
  const BULLETS_MT_MOBILE = "mt-0"; // body already provides margin-bottom
  const BULLETS_MT_DESKTOP = "md:mt-0";

  // Bullets spacing between rows
  const BULLETS_GAP_MOBILE = "space-y-2";
  const BULLETS_GAP_DESKTOP = "md:space-y-2";

  return (
    <section
      className={[
        "bg-card",
        SECTION_PT_MOBILE,
        SECTION_PB_MOBILE,
        SECTION_PT_DESKTOP,
        SECTION_PB_DESKTOP,
      ].join(" ")}
    >
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Heading */}
          {heading && (
            <h2
              className={[
                "text-3xl md:text-4xl",
                "font-heading font-semibold",
                "leading-tight",
                "text-primary-headings",
                HEADING_MB_MOBILE,
                HEADING_MB_DESKTOP,
              ].join(" ")}
            >
              {heading}
            </h2>
          )}

          {/* Body */}
          {body && (
            <div
              className={["text-base md:text-xl", "font-light", "text-foreground/90", "leading-relaxed", "text-center", "md:text-center",
                // Alt+Enter behaviour:
                // - mobile: ignore line breaks (normal)
                // - desktop: preserve line breaks (pre-line)
                "whitespace-normal md:whitespace-pre-line",
                // If you want paragraph spacing from your helper, keep it.
                // If you want tighter lines, remove space-y-4.
                "space-y-4",
                BODY_MB_MOBILE,
                BODY_MB_DESKTOP,
              ].join(" ")}
            >
              {formatTextWithBreaks(body)}
            </div>
          )}

          {/* Bullets */}
          {bullets.length > 0 && (
            <ul
              className={[
                "list-none",
                BULLETS_MT_MOBILE,
                BULLETS_MT_DESKTOP,
                "text-lg font-light text-foreground/90",
                BULLETS_GAP_MOBILE,
                BULLETS_GAP_DESKTOP,
              ].join(" ")}
            >
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
