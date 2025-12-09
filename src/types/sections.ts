// ======================================================
// src/types/sections.ts  (FINAL - CLEAN, NO DUPLICATES)
// ======================================================

import { type ResolvedImage } from "@/lib/placeholders";

// ======================================================
// --- PRIMARY ENTITY TYPES ---
// ======================================================

// The Primary Service Type
export type Service = {
  id: string;              // Firestore doc.id
  serviceKey?: string;
  title?: string;

  [key: string]: unknown;
};

// ======================================================
// --- DYNAMIC CONTENT SECTION TYPE (FirestoreSection) ---
// ======================================================

export interface FirestoreSection {
  id: string;
  entryId?: string;
  kind?: string;
  order?: number | string;
  serviceKey?: string;

  [key: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | object
    | unknown[];
}

// ======================================================
// --- PROP TYPES (for reusable section components) ---
// ======================================================

export interface ImageSectionProps {
  section: FirestoreSection;
  image?: ResolvedImage;
  serviceTitle?: string | undefined;
}

export interface TextSectionProps {
  section: FirestoreSection;
}

export interface GroupSectionProps {
  sections: FirestoreSection[];
}

// ======================================================
// ✅ END — NO ResolvedImage augmentation here anymore
// ======================================================
