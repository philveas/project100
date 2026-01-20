// src/components/sections/LocationTableSection.tsx

import { type TextSectionProps } from "@/types/sections";
import { formatTextWithBreaks } from "@/lib/utils";

export function LocationTableSection({ section }: TextSectionProps) {
  const heading = String(section?.["whatHeading"] ?? "");
  const body = String(section?.["whatBody"] ?? "");
  const bullets =
    Array.isArray(section?.["whatBullet"])
      ? section["whatBullet"]
      : typeof section?.["whatBullet"] === "string"
      ? [section["whatBullet"]]
      : [];

  return (
    <section className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-10 md:py-16">
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Apply unified max width inside */}
        <div className="max-w-[70rem] mx-auto space-y-8 text-left">
          
          {/* --- Heading --- */}
          {heading && (
            <h2 className="text-3xl md:text-4xl font-headline text-primary-headings font-semibold leading-tight text-[hsl(var(--foreground))]">
              {formatTextWithBreaks(heading)}
            </h2>
          )}

          {/* --- Body --- */}
          {body && (
            <div className="text-lg md:text-xl font-light leading-relaxed text-justify text-[hsl(var(--foreground))]/90 space-y-4">
              {formatTextWithBreaks(body)}
            </div>
          )}

          {/* --- Updated: 3-Column Bullet Table/Grid ---
            
            We use a Tailwind Grid for responsive column distribution:
            - gap-x-6: Horizontal spacing between columns
            - gap-y-3: Vertical spacing between items
            - md:grid-cols-2: 2 columns on medium screens and up
            - lg:grid-cols-3: 3 columns on large screens and up
          */}
          {bullets.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
              {bullets.map((b: string, i: number) => (
                <div 
                  key={i} 
                  className="flex items-start text-lg font-light text-[hsl(var(--foreground))]/90"
                >
                  {/* Custom bullet point using a small circle or dash, replacing the default list-style */}
                  <span className="flex-shrink-0 text-[hsl(var(--primary))] mr-3 mt-1 text-xl leading-none">
                    &bull;
                  </span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}