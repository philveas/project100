// src/components/sections/WhatIntro.tsx
// single column body only, centred, with foreground/background colours

import { type TextSectionProps } from "@/types/sections";
import { formatTextWithBreaks } from "@/lib/utils";

export function WhatIntroSection({ section }: TextSectionProps) {
  const body = String(section?.["whatBody"] ?? "");

  return (
    <section className="bg-[hsl(var(--card))] text-[hsl(var(--foreground))] pt-20 pb-10">
      <div className="container px-4 md:px-10 text-center max-w-5xl mx-auto">
        <div className="text-base md:text-3xl text-sans font-light space-y-4 ">
          {formatTextWithBreaks(body)}
        </div>
      </div>
    </section>
  );
}
