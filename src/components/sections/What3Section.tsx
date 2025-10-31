// src/components/sections/What3Section.tsx
import { type TextSectionProps } from "@/types/sections";
import { formatTextWithBreaks } from "@/lib/utils";

export function What3Section({ section }: TextSectionProps) {
  const heading = String(section?.["whatHeading"] ?? "What We Do");
  const body = String(section?.["whatBody"] ?? "");
  const bullets = Array.isArray(section?.["whatBullet"])
    ? section["whatBullet"]
    : typeof section?.["whatBullet"] === "string"
    ? [section["whatBullet"]]
    : [];

  return (
    <section className="bg-[hsl(var(--secondary))] text-[hsl(var(--card))] py-24">
      <div className="container px-4 md:px-10 text-left space-y-8 max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-headline font-semibold leading-tight">
          {formatTextWithBreaks(heading)}
        </h2>

        {/* Body */}
        <div className="text-lg font-light space-y-4">
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
