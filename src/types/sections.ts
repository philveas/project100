import { type ResolvedImage } from "@/lib/placeholders";

// --- PRIMARY ENTITY TYPES ---

// The Primary Service Type
export type Service = {
  // Required properties (id is essential and mapped from doc.id)
  id: string; // Ensure this exists for Firestore mapping
  
  // Optional fields for flexibility with Firestore documents
  serviceKey?: string;
  title?: string;

  [key: string]: unknown;
};

// --- DYNAMIC CONTENT SECTION TYPE (FirestoreSection) ---
export interface FirestoreSection {
  id: string;
  entryId?: string;
  kind?: string;
  order?: number | string;
  serviceKey?: string;
  // ... include any other Firestore-specific fields as needed ...

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
// ✅ Extension of ResolvedImage to support all HeroSection fields
// ======================================================

/**
 * Defines the complete shape of the image data expected by components 
 * like HeroSection, including all Firestore-mapped image/video properties.
 */
export interface ExtendedResolvedImage extends ResolvedImage {
  // FIX: 'id' must be non-optional (required) here because 'BaseItem' (which 
  // ResolvedImage likely extends) requires it.
  id: string; 
  folder?: string;
  // These properties were missing, causing the compilation error:
  imageIdDesktop?: string; 
  imageIdMobile?: string;
  videoFile?: string;
  desktopLowRes?: string;
  desktopFallback?: string;
  mobileLowRes?: string;
  mobileFile?: string;

  [key: string]: unknown;
}

// --- PROP TYPES (for components) ---
export interface TextSectionProps {
  section: FirestoreSection;
}

export interface GroupSectionProps {
  sections: FirestoreSection[];
}

/**
 * ImageSectionProps now uses the ExtendedResolvedImage type, which 
 * ensures TypeScript validates all property accesses in HeroSection.tsx.
 */
export interface ImageSectionProps {
  section: FirestoreSection;
  image?: ExtendedResolvedImage; // ✅ optional
  serviceTitle?: string | undefined;
}