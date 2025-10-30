// src/lib/firestore-client.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

// 1. IMPORT AUTHORITATIVE TYPES
// NOTE: These types must be exported from your types file(s).
// We'll use Service and FirestoreSection, which is the stricter type.
import { type Service, type FirestoreSection } from "@/types/sections"; 

// --- Firebase Configuration ---
const firebaseConfig = {
    // Ensuring non-null assertion for environment variables
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. REMOVE DUPLICATE LOCAL TYPE DEFINITIONS
// The local interface Service and interface Section have been removed.

// --- Firestore Data Retrieval Functions ---

export async function getPublishedServices(): Promise<Service[]> {
    const colRef = collection(db, "services");
    const snapshot = await getDocs(colRef);
    
    // Asserts to the imported Service type
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Service[];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
    const colRef = collection(db, "services");
    const q = query(colRef, where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    
    // Asserts to the imported Service type
    return { id: snapshot.docs[0]!.id, ...snapshot.docs[0]!.data() } as Service;
}

// FIX: Update function signature and assertion to use the strict type (FirestoreSection)
export async function getSectionsByServiceKey(serviceKey: string): Promise<FirestoreSection[]> {
    const colRef = collection(db, "sections");
    const q = query(colRef, where("serviceKey", "==", serviceKey));
    const snapshot = await getDocs(q);
    
    // Maps doc.id to the required 'id' field and asserts to the imported FirestoreSection type
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as FirestoreSection[];
}