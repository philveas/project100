// src/components/sections/What2Section.tsx
// Single-column section with heading and body
// Background: var(--background), Text: var(--foreground)

import { type TextSectionProps } from "@/types/sections";
import { formatTextWithBreaks } from "@/lib/utils";

export function What2Section({ section }: TextSectionProps) {
  const heading = String(section?.["whatHeading"] ?? "");
  const body = String(section?.["whatBody"] ?? "");
  const bullets =
    Array.isArray(section?.["whatBullet"])
      ? section["whatBullet"]
      : typeof section?.["whatBullet"] === "string"
      ? [section["whatBullet"]]
      : [];

  return (
    <section className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-20 md:py-28">
      <div className="container px-4 md:px-10 text-left space-y-8 max-w-4xl mx-auto">
        {/* --- Heading --- */}
        {heading && (
          <h2 className="text-3xl md:text-5xl font-headline font-semibold leading-tight text-[hsl(var(--foreground))]">
            {formatTextWithBreaks(heading)}
          </h2>
        )}

        {/* --- Body --- */}
        {body && (
          <div className="text-lg md:text-xl font-light leading-relaxed text-justify text-[hsl(var(--foreground))]/90 space-y-4">
            {formatTextWithBreaks(body)}
          </div>
        )}

        {/* --- Optional Bullets --- */}
        {bullets.length > 0 && (
          <ul className="list-disc pl-6 space-y-2 text-lg font-light text-[hsl(var(--foreground))]/90">
            {bullets.map((b: string, i: number) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
