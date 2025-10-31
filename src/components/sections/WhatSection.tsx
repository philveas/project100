import { type TextSectionProps } from "@/types/sections";

export function WhatSection({ section }: TextSectionProps) {
  const heading = String(section?.["whatHeading"] ?? "What We Do");
  const body = section?.["whatBody"] ?? "";
  const bullets = Array.isArray(section?.["whatBullet"])
  ? section["whatBullet"]
  : typeof section?.["whatBullet"] === "string"
  ? [section["whatBullet"]]
  : [];

  const paragraphs = String(body)
    .split("\n")
    .map((p: string) => p.trim())
    .filter(Boolean);

  return (
    <section className="bg-[hsl(var(--foreground))] text-[hsl(var(--card))]">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Left Column (Dynamic Heading) */}
        <div className="bg-[hsl(var(--secondary-dark))] py-24 flex items-center justify-end">
          <div className="container pr-20 pl-4 md:px-20 text-right">
            <h2 className="text-4xl md:text-5xl font-headline font-semibold leading-tight">
             {(heading || "").split(" ").map((word: string, i: number) => (
                <span key={i} className="block">
                  {word === "We" ? (
                    <span className="text-[hsl(var(--accent))]">{word}</span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* Right Column (Dynamic Body + Bullets) */}
        <div className="bg-[hsl(var(--background))] md:col-span-2 py-24 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl text-[hsl(var(--foreground))]/90 font-light space-y-4 text-lg">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              {bullets.length > 0 && (
                <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--foreground))]/90">
                  {bullets.map((b: string, i: number) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
