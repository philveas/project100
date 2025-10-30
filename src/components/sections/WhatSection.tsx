// src/components/sections/What.tsx
import { type TextSectionProps } from "@/types/sections";

export function WhatSection({ section }: TextSectionProps) {
 const paragraphs = String(section?.["whatBody"] ?? "")
  .split("\n")
  .map((p: string) => p.trim())
  .filter(Boolean);

  return (
    <section className="bg-grey-foreground">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Left Column (Title) */}
        <div className="bg-grey py-24 flex items-center justify-end">
          <div className="container pr-20 pl-4 md:px-20 text-right">
            <h2 className="text-4xl md:text-5xl font-headline font-semibold text-white">
              <span className="block">What</span>
              <span className="block">
                <span className="text-accent">We</span> Do
              </span>
            </h2>
          </div>
        </div>
        {/* Right Column (Body Text) */}
        <div className="bg-background md:col-span-2 py-24 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl text-foreground font-light space-y-4 text-lg">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}