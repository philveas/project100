// this two column with heading left and text right. 
// colours secondary and background 

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
    <section className="bg-[hsl(var(--card))] text-[hsl(var(--card))]"> {/* this is overall section colour, defualt text colour*/}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Left Column (Dynamic Heading) */}
        <div className="bg-[hsl(var(--background))] py-20 flex items-center justify-end"> {/* this is leftcolumn section colour*/}
          <div className="container pr-20 pl-4 md:px-20 text-right">
   <h2 className="text-3xl md:text-4xl font-headline text-primary font-semibold leading-tight">
  {(heading || "")
    .split(/\r?\n/) // split only on newlines
    .map((line: string, i: number) => (
      <span key={i} className="block">
        {line.split(" ").map((word: string, j: number) => (
          <span key={j}>
            {word.includes("&") ? (
              <span className="text-[hsl(var(--primary))]">{word}</span>
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

        {/* Right Column (Dynamic Body + Bullets) */}
        <div className="bg-[hsl(var(--card))] md:col-span-2 py-10 flex items-center"> {/* this is right column section colour*/}
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl text-[hsl(var(--foreground))]/90 font-light space-y-4 text-xl text-justify">{/* this is text colour*/}
              {paragraphs.map((para, i) => (
                <p key={i} className="whitespace-pre-line">
                   {para}
                </p>
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
