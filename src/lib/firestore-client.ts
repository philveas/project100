// src/lib/firestore-client.ts
// IMPORTANT: This file no longer initializes Firebase. It imports the initialized 'db' service.
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/index"; // ⬅️ Assuming your path to index.ts is correct
import { type Service, type FirestoreSection } from "@/types/sections";

// The 'db' constant is now correctly initialized and available for use in all functions.

// --- Firestore Data Retrieval Functions ---

export async function getPublishedServices(): Promise<Service[]> {
  const colRef = collection(db, "services");
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Service[];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const colRef = collection(db, "services");
  const q = query(colRef, where("slug", "==", slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0]!.id, ...snapshot.docs[0]!.data() } as Service;
}

export async function getSectionsByServiceKey(
  serviceKey: string
): Promise<FirestoreSection[]> {
  const colRef = collection(db, "sections");
  const q = query(colRef, where("serviceKey", "==", serviceKey));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as FirestoreSection[];
}