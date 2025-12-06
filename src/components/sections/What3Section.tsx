// src/components/sections/What3Section.tsx
// Single-column section with heading, body, and optional bullet list.
// Color scheme: secondary background, card (foreground) text.

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
    <section className="bg-[hsl(var(--secondary))] text-[hsl(var(--card))] py-20 md:py-24">
      <div className="container px-4 md:px-10 max-w-4xl mx-auto text-left space-y-8">
        {/* --- Heading --- */}
        {heading && (
          <h2 className="text-4xl md:text-5xl font-headline font-semibold leading-tight">
            {formatTextWithBreaks(heading)}
          </h2>
        )}

        {/* --- Body --- */}
        {body && (
          <div className="text-lg md:text-xl font-light text-[hsl(var(--card))]/90 space-y-4 leading-relaxed">
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
