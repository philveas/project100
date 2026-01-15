"use client";

import dynamic from "next/dynamic";
import { type FirestoreSection } from "@/types/sections";

// Client side only, no server render for the inner component
const ReviewSectionInner = dynamic(
  () =>
    import("./ReviewSection").then((mod) => mod.ReviewSection),
  { ssr: false }
);

interface DeferredReviewSectionProps {
  sections: FirestoreSection[];
}

export function DeferredReviewSection({ sections }: DeferredReviewSectionProps) {
  if (!sections || sections.length === 0) return null;

  return <ReviewSectionInner sections={sections} />;
}