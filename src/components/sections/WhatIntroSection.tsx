// src/components/sections/WhatIntroSection.tsx

import React from "react";
import { type TextSectionProps } from "@/types/sections";
import { formatTextWithBreaks } from "@/lib/utils";

export function WhatIntroSection({ section }: TextSectionProps) {
  const heading = String(section?.["whatHeading"] ?? "");
  const body = String(section?.["whatBody"] ?? "");
  const bullets =
    Array.isArray(section?.["whatBullet"])
      ? section["whatBullet"]
      : typeof section?.["whatBullet"] === "string"
      ? [section["whatBullet"]]
      : [];

  // Mobile: remove Alt+Enter line breaks, but keep other whitespace
  const bodyMobile = body
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\n+/g, " ")
    .trim();

  // -----------------------------
  // SPACING CONTROLS (EDIT THESE)
  // -----------------------------
  const SECTION_PT_MOBILE = "pt-8";
  const SECTION_PB_MOBILE = "pb-6";
  const SECTION_PT_DESKTOP = "md:pt-16";
  const SECTION_PB_DESKTOP = "md:pb-10";

  const HEADING_MB_MOBILE = "mb-4";
  const HEADING_MB_DESKTOP = "md:mb-3";

  const BODY_MB_MOBILE = "mb-5";
  const BODY_MB_DESKTOP = "md:mb-4";

  const BULLETS_MT_MOBILE = "mt-0";
  const BULLETS_MT_DESKTOP = "md:mt-0";

  const BULLETS_GAP_MOBILE = "space-y-2";
  const BULLETS_GAP_DESKTOP = "md:space-y-2";

  return (
    <section
      className={[
        "bg-card text-primary", // Sets default text color for section
        SECTION_PT_MOBILE,
        SECTION_PB_MOBILE,
        SECTION_PT_DESKTOP,
        SECTION_PB_DESKTOP,
      ].join(" ")}
    >
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          {heading && (
            <h2
              className={[
                "text-3xl md:text-4xl",
                "font-headline font-semibold",
                "leading-tight",
                "text-center",
                HEADING_MB_MOBILE,
                HEADING_MB_DESKTOP,
              ].join(" ")}
            >
              {heading}
            </h2>
          )}

          {/* Body */}
          {body && (
            <>
              {/* Mobile */}
              <p
                className={[
                  "md:hidden",
                  "text-base",
                  "font-light",
                  "text-foreground/90",
                  "leading-relaxed",
                  "text-justify",
                  "whitespace-pre-wrap",
                  BODY_MB_MOBILE,
                ].join(" ")}
              >
                {bodyMobile}
              </p>

              {/* Desktop */}
              <div
                className={[
                  "hidden md:block",
                  "text-2xl",
                  "font-light",
                  "text-foreground/90",
                  "leading-relaxed",
                  "text-center",
                  "whitespace-pre-line",
                  BODY_MB_DESKTOP,
                ].join(" ")}
              >
                {formatTextWithBreaks(body)}
              </div>
            </>
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