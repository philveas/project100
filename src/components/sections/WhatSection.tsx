// src/components/sections/WhatSection.tsx

import { type TextSectionProps } from "@/types/sections";

export function WhatSection({ section }: TextSectionProps) {
  const heading = String(section?.["whatHeading"] ?? "What We Do");
  const body = section?.["whatBody"] ?? "";
  const bullets =
    Array.isArray(section?.["whatBullet"])
      ? section["whatBullet"]
      : typeof section?.["whatBullet"] === "string"
      ? [section["whatBullet"]]
      : [];

  const paragraphs = String(body)
    .split("\n")
    .map((p: string) => p.trim())
    .filter(Boolean);

  return (
    <section className="bg-card text-foreground">
      {/* Outer boundaries match other sections */}
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10 py-6 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* === LEFT: COLOURED BOX (Heading) === */}
          <div className="bg-background py-16 px-10 flex items-center justify-end md:rounded-l-xl">
            <div className="text-right">
              <h2 className="text-3xl md:text-4xl font-headline font-semibold leading-tight text-primary">
                {(heading || "")
                  .split(/\r?\n/)
                  .map((line: string, i: number) => (
                    <span key={i} className="block">
                      {line.split(" ").map((word: string, j: number) => (
                        <span key={j}>
                          {word.includes("&") ? (
                            <span className="text-primary">{word}</span>
                          ) : (
                            word
                          )}{" "}
                        </span>
                      ))}
                    </span>
                  ))}
              </h2>
            </div>
          </div>

          {/* === RIGHT: BODY BOX === */}
          {/* 🔧 Removed px-10 so right edge lines up with FeatureSection */}
          <div className="bg-card md:col-span-2 py-12 flex items-center">
            <div className="max-w-[52rem] ml-auto text-foreground/90 font-light space-y-4 text-xl text-justify">
              {paragraphs.map((para, i) => (
                <p key={i} className="whitespace-pre-line">
                  {para}
                </p>
              ))}

              {bullets.length > 0 && (
                <ul className="list-disc pl-6 space-y-2 text-foreground/90">
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
