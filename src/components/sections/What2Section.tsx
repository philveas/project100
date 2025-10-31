// src/components/sections/What2Section.tsx
import { type TextSectionProps } from "@/types/sections";
import { formatTextWithBreaks } from "@/lib/utils";

export function What2Section({ section }: TextSectionProps) {
  const heading = section?.["whatHeading"] ? String(section["whatHeading"]) : "";
  const body = String(section?.["whatBody"] ?? "");
  const bullets = Array.isArray(section?.["whatBullet"])
    ? section["whatBullet"]
    : typeof section?.["whatBullet"] === "string"
    ? [section["whatBullet"]]
    : [];

  return (
    <section className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-24">
      <div className="container px-4 md:px-10 text-left space-y-8 max-w-4xl mx-auto">
        {/* Heading (only renders if present) */}
        {heading && (
          <h2 className="text-4xl md:text-5xl font-headline font-semibold leading-tight">
            {formatTextWithBreaks(heading)}
          </h2>
        )}

        {/* Body */}
        <div className="text-xl font-light space-y-4">
          {formatTextWithBreaks(body)}
        </div>

        {/* Bullets */}
        {bullets.length > 0 && (
          <ul className="list-disc pl-6 space-y-2 text-lg font-light">
            {bullets.map((b: string, i: number) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
