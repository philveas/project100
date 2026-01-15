// src/components/sections/WhatTableSection.tsx

import { type TextSectionProps } from "@/types/sections";

function splitIntoColumns(items: string[], columnCount: number): string[][] {
  if (!Number.isFinite(columnCount) || columnCount <= 0) return [items];

  const columns: string[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, index) => {
    columns[index % columnCount]!.push(item);
  });
  return columns;
}


export function WhatTableSection({ section }: TextSectionProps) {
  const heading = String(section?.["whatHeading"] ?? "");
  const body = String(section?.["whatBody"] ?? "");

  const rawBullets =
    Array.isArray(section?.["whatBullet"])
      ? section["whatBullet"]
      : typeof section?.["whatBullet"] === "string"
      ? section["whatBullet"].split(";")
      : [];

  const bullets = rawBullets.map((b: string) => b.trim()).filter(Boolean);

  // ✅ Two columns for mobile/tablet
  const columns2 = splitIntoColumns(bullets, 2);

  // ✅ Three columns for desktop
  const columns3 = splitIntoColumns(bullets, 3);

  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="bg-card text-foreground">
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10 py-8 md:py-10 space-y-6">
        {/* Heading */}
        {heading && (
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary text-center">
            {heading}
          </h2>
        )}

        {/* Body */}
        {paragraphs.length > 0 && (
          <div className="mx-auto max-w-[56rem] text-base md:text-xl font-light text-foreground/90 space-y-4 text-center">
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}

        {/* Bullets */}
        {bullets.length > 0 && (
          <div className="flex justify-center">
            <>
              {/* ✅ Mobile + tablet: 2 columns */}
              <div className="grid gap-4 text-sm text-foreground/90 text-center grid-cols-2 lg:hidden">
                {columns2.map((column, colIndex) => (
                  <ul key={colIndex} className="space-y-1">
                    {column.map((item, i) => (
                      <li key={i} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>

              {/* ✅ Desktop: 3 columns */}
              <div className="hidden lg:grid gap-4 text-base font-light text-foreground/90 text-center grid-cols-[16rem_16rem_16rem]">
                {columns3.map((column, colIndex) => (
                  <ul key={colIndex} className="space-y-1">
                    {column.map((item, i) => (
                      <li key={i} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </>
          </div>
        )}
      </div>
    </section>
  );
}
