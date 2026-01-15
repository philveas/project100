// src/components/sections/WhatTableBorder1Section.tsx

import { type TextSectionProps } from "@/types/sections";

/**
 * NOTE: BORDER THICKNESS CONTROL (top row divider only)
 * Change the thickness by editing these classes:
 *   border-b-[2px]  -> border-b-[1px] / border-b-2 / border-b-4
 *   lg:border-b-[2px] -> lg:border-b-[1px] / lg:border-b-2 / lg:border-b-4
 *
 * This only affects the divider under the top row.
 */

export function WhatTableBorder1Section({ section }: TextSectionProps) {
  const heading = String(section?.["whatHeading"] ?? "");
  const body = String(section?.["whatBody"] ?? "");

  const rawBullets = Array.isArray(section?.["whatBullet"])
    ? section["whatBullet"]
    : typeof section?.["whatBullet"] === "string"
      ? section["whatBullet"].split(";")
      : [];

  const bullets = rawBullets.map((b: string) => String(b).trim()).filter(Boolean);

  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="bg-card text-foreground">
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10 py-6 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {/* === LEFT: COLOURED BOX (Heading) === */}
          <div className="bg-primary py-6 md:py-8 flex items-center justify-end">
            <div className="px-10 text-right">
              {heading ? (
                <h2 className="text-2xl md:text-3xl font-headline font-semibold text-left md:text-right leading-tight text-card">
                  {(heading || "")
                    .split(/\r?\n/)
                    .filter(Boolean)
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
              ) : null}
            </div>
          </div>

          {/* === RIGHT: BODY + TABLE (current formatting preserved) === */}
          <div className="bg-card sm:col-span-1 lg:col-span-2 py-0 md:py-4 flex items-center">
            <div className="w-full max-w-[52rem] ml-0 lg:ml-0 text-foreground/90 font-light space-y-6 text-base md:text-xl text-justify">
              {/* Body */}
              {paragraphs.length > 0 ? (
                <div className="space-y-4">
                  {paragraphs.map((para, i) => (
                    <p key={i} className="whitespace-pre-line">
                      {para}
                    </p>
                  ))}
                </div>
              ) : null}

              {/* Table */}
              {bullets.length > 0 ? (
                <div className="w-full">
                  <div className="grid grid-cols-4 text-sm md:text-base font-light text-foreground/90 text-center">
                    {bullets.map((item, i) => {
                      const isTopRow = i < 4;

                      return (
                        <div
                          key={i}
                          className={[
                            "p-4 flex items-center justify-center",

                            // Top row divider (mobile and desktop)
                            isTopRow ? "border-b-[2px] border-primary" : "",

                            // Remove border on lg for non-top rows (keep intent explicit)
                            !isTopRow ? "lg:border-b-0" : "",

                            // Top row typography
                            isTopRow ? "font-roboto font-semibold" : "",
                          ].join(" ")}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// registry loader default export
export default WhatTableBorder1Section;
