// src/types/sections.ts (FINAL CORRECTED SCRIPT)

import { type ResolvedImage } from "@/lib/placeholders";

// --- PRIMARY ENTITY TYPES ---

// The Primary Service Type
export type Service = {
    // Required properties (id is essential and mapped from doc.id)
    id: string; // Add this if it was missing in your full Service definition!
    
    // FIX: Make non-essential fields optional to allow successful casting from Firestore
    serviceKey?: string; 
    title?: string;      
    
    [key: string]: unknown;
};


// The Dynamic Content Section Type (FirestoreSection)
export interface FirestoreSection {
    // ... (This section remains unchanged, as it is correct now) ...
    id: string;
    entryId?: string;
    kind?: string;
    order?: number | string;
    serviceKey?: string;
    // ... all explicit fields ...

    [key: string]: 
        | string 
        | number 
        | boolean 
        | null 
        | undefined
        | object 
        | unknown[]; 
}


// --- PROP TYPES (for components) ---

export interface ImageSectionProps {
    section: FirestoreSection;
    image: ResolvedImage;
    serviceTitle?: string | undefined; 
}

export interface TextSectionProps {
    section: FirestoreSection;
}

export interface GroupSectionProps {
    sections: FirestoreSection[];
}