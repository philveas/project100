// src/lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ReactElement } from "react";


/**
 * Merge multiple class names intelligently using clsx + tailwind-merge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert a text string with line breaks (\n) into lines separated by <br />.
 */
export function formatTextWithBreaks(text: string): ReactElement {
  if (!text) return <></>;

  return (
    <>
      {text.split("\n").map((line, index, array) => (
        <span key={index}>
          {line}
          {index < array.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate long text with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
}

/**
 * Generate a simple slug from a string.
 */
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/* -------------------------------------------------------------------------- */
/*                             IMAGE HELPERS (SAFE)                           */
/* -------------------------------------------------------------------------- */

/**
 * Resolve the first valid dynamic image URL from multiple candidates.
 * Does NOT perform validation for Next.js — that happens in getSafeImageUrl.
 */
export function resolveImageUrl(...candidates: any[]): string | undefined {
  for (const c of candidates) {
    if (typeof c !== "string") continue;

    const trimmed = c.trim();
    if (!trimmed) continue;
    if (trimmed === "undefined" || trimmed === "null") continue;

    return trimmed;
  }
  return undefined;
}

/**
 * Ensures Next/Image never receives an invalid URL.
 * Accepts:
 *   - /local/public/path
 *   - http:// or https:// URLs
 *   - data: URIs
 *   - relative file-like paths (converted to /relative/path)
 * Rejects everything else (Windows paths, invalid chars, etc.)
 */
export function getSafeImageUrl(
  url?: string | null,
  fallback = "/images/home/meeting1.webp"
): string {
  if (!url) return fallback;

  const trimmed = url.trim();
  if (!trimmed) return fallback;
  if (trimmed === "undefined" || trimmed === "null") return fallback;

  // Acceptable patterns
  if (
    trimmed.startsWith("/") ||           // local public/ path
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:")
  ) {
    return trimmed;
  }

  // Convert simple relative paths to public/ paths
  if (/^[a-zA-Z0-9_\-./]+$/.test(trimmed)) {
    return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  }

  // Anything else is invalid → fallback
  return fallback;
}
