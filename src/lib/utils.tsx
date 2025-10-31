// src/lib/utils.tsx
import React from "react";

// ✅ Merge Tailwind classes safely
export function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

// ✅ Format hero heading text
// - Adds new lines where \n appears
// - Highlights '&' with accent color
export function formatHeroText(text?: string) {
  if (!text) return null;

  return text.split("\n").map((line, i) => (
    <span key={i} className="block">
      {line.split(/(&)/g).map((part, j) =>
        part === "&" ? (
          <span key={j} className="text-accent font-semibold">
            &amp;
          </span>
        ) : (
          part
        )
      )}
    </span>
  ));
}

// ✅ Format plain text with line breaks only
// (Useful for subheadings, body, or paragraph fields)
export function formatTextWithBreaks(text?: string) {
  if (!text) return null;

  return text.split("\n").map((line, i) => (
    <span key={i} className="block">
      {line.trim()}
    </span>
  ));
}
