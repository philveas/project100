// src/lib/firestore-resources.ts
// Server-only Firestore access for resources using Firebase Admin SDK.
// Do NOT import Firebase Web SDK here.

import "server-only";

import { adminDb } from "@/firebase/admin";
import { type FirestoreSection } from "@/types/sections";

export type ResourceDoc = {
  id: string;
  isActive?: boolean;
  resourceKey?: string;
  title?: string;
  slug?: string;
  cardDescription?: string;
  imageId?: string;
  iconName?: string;
  schemaType?: string;
  schemaOfferUrl?: string;
  order?: number | string;
  metaTitle?: string;
  metaDescription?: string;
  lastUpdated?: any;
};

const isTruthy = (v: any) =>
  v === true || v === "true" || v === "TRUE" || v === 1 || v === "1";

export async function getPublishedResources(): Promise<ResourceDoc[]> {
  const snap = await adminDb.collection("resources").get();

  const rows = snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as any),
  })) as ResourceDoc[];

  return rows
    .filter((r) => isTruthy(r.isActive))
    .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
}

export async function getResourceBySlug(slug: string): Promise<ResourceDoc | null> {
  if (!slug) return null;

  const snap = await adminDb
    .collection("resources")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snap.empty) return null;

  const doc = snap.docs[0]!;
  return { id: doc.id, ...(doc.data() as any) } as ResourceDoc;
}

export async function getSectionsByResourceKey(resourceKey: string): Promise<FirestoreSection[]> {
  if (!resourceKey) return [];

  const snap = await adminDb
    .collection("sections")
    .where("resourceKey", "==", resourceKey)
    .get();

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as any),
  })) as FirestoreSection[];
}
