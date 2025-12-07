import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { type Service, type FirestoreSection } from "@/types/sections";

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// ✅ Prevent multiple initializations during hot reloads
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

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

export async function getSectionsByServiceKey(serviceKey: string): Promise<FirestoreSection[]> {
  const colRef = collection(db, "sections");
  const q = query(colRef, where("serviceKey", "==", serviceKey));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as FirestoreSection[];
}
