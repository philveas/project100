// src/components/sections/WhatCardSection.tsx

import { type TextSectionProps } from "@/types/sections";

export function WhatCardSection({ section }: TextSectionProps) {
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
        {/* CHANGED: match FeatureSection responsiveness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">

          {/* === LEFT: COLOURED BOX (Heading) === */}
         <div className="bg-card py-12 md:py-16 flex items-center justify-end">
           <div className="px-10 text-right">
              <h2 className="text-3xl md:text-4xl font-headline font-semibold leading-tight text-primary-headings">
                {(heading || "")
                  .split(/\r?\n/)
                  .map((line: string, i: number) => (
                    <span key={i} className="block">
                      {line.split(" ").map((word: string, j: number) => (
                        <span key={j}>
                          {word.includes("&") ? (
                            <span className="text-primary-headings">{word}</span>
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
          {/* CHANGED: span 2 columns only on lg (merge middle + right) */}
          <div className="bg-card sm:col-span-1 lg:col-span-2 py-0 md:py-12 flex items-center">
            <div className="max-w-[52rem] ml-0 lg:ml-0 text-foreground/90 font-light space-y-4 text-base md:text-xl text-justify">
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
