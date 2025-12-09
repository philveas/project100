// src/components/sections/What3Section.tsx
// Single-column section with heading and body text
// Uses secondary background and foreground text colors.

import { type TextSectionProps } from "@/types/sections";
import { formatTextWithBreaks } from "@/lib/utils";

export function What3Section({ section }: TextSectionProps) {
  const heading = String(section?.["whatHeading"] ?? "What We Do");
  const body = String(section?.["whatBody"] ?? "");
  const bullets =
    Array.isArray(section?.["whatBullet"])
      ? section["whatBullet"]
      : typeof section?.["whatBullet"] === "string"
      ? [section["whatBullet"]]
      : [];

  return (
    <section className="bg-[hsl(var(--secondary))] text-[hsl(var(--card))] py-20 md:py-28">
      <div className="container px-4 md:px-10 text-left space-y-8 max-w-4xl mx-auto">
        {/* --- Heading --- */}
        {heading && (
          <h2 className="text-3xl md:text-5xl font-headline font-semibold leading-tight text-[hsl(var(--card))]">
            {formatTextWithBreaks(heading)}
          </h2>
        )}

        {/* --- Body Text --- */}
        {body && (
          <div className="text-lg md:text-xl font-light leading-relaxed text-[hsl(var(--card))]/90 space-y-4">
            {formatTextWithBreaks(body)}
          </div>
        )}

        {/* --- Optional Bullets --- */}
        {bullets.length > 0 && (
          <ul className="list-disc pl-6 space-y-2 text-lg font-light text-[hsl(var(--card))]/90">
            {bullets.map((b: string, i: number) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
