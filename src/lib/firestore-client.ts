// src/lib/firestore-client.ts
import "server-only";
import { adminDb } from "@/firebase/admin";
import type { Service, FirestoreSection } from "@/types/sections";
import type { LocationDoc } from "@/types/location";

// --- SERVICES ---
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const snap = await adminDb
    .collection("services")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snap.empty) return null;
  const doc = snap.docs[0]!;
  return { id: doc.id, ...(doc.data() as any) } as Service;
}

export async function getSectionsByServiceKey(serviceKey: string): Promise<FirestoreSection[]> {
  if (!serviceKey) return [];
  const snap = await adminDb.collection("sections").where("serviceKey", "==", serviceKey).get();
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as FirestoreSection[];
}

// --- LOCATIONS ---
export async function getLocationBySlug(locationSlug: string): Promise<LocationDoc | null> {
  if (!locationSlug) return null;

  const snap = await adminDb
    .collection("locations")
    .where("locationSlug", "==", locationSlug)
    .limit(1)
    .get();

  if (snap.empty) return null;
  const doc = snap.docs[0]!;
  return { id: doc.id, ...(doc.data() as any) } as LocationDoc;
}

export async function getSectionsByLocationKey(locationKey: string): Promise<FirestoreSection[]> {
  if (!locationKey) return [];
  const snap = await adminDb.collection("sections").where("locationKey", "==", locationKey).get();
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as FirestoreSection[];
}

export async function getMenuLocations(): Promise<{ slug: string; label: string }[]> {
  const snap = await adminDb.collection("locations").orderBy("menuOrder", "asc").get();

  const isTruthy = (v: any) => v === true || v === "true" || v === "TRUE" || v === 1 || v === "1";

  return snap.docs
    .map((doc) => {
      const d: any = doc.data();
      return {
        slug: d.locationSlug,
        label: d.menuLabel || d.locationName,
        showInMenu: d.showInMenu,
        isActive: d.isActive,
      };
    })
    .filter((x) => x.slug && x.label)
    .filter((x) => isTruthy(x.isActive) && isTruthy(x.showInMenu))
    .map(({ slug, label }) => ({ slug, label }));
}

// --- RESOURCES ---
export async function getResourceBySlug(slug: string): Promise<any | null> {
  if (!slug) return null;

  const snap = await adminDb
    .collection("resources")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snap.empty) return null;
  const doc = snap.docs[0]!;
  return { id: doc.id, ...(doc.data() as any) };
}

export async function getSectionsByResourceKey(resourceKey: string): Promise<FirestoreSection[]> {
  if (!resourceKey) return [];
  const snap = await adminDb.collection("sections").where("resourceKey", "==", resourceKey).get();
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as FirestoreSection[];
}

export async function getPublishedResources(): Promise<any[]> {
  const snap = await adminDb.collection("resources").get();

  const isTruthy = (v: any) => v === true || v === "true" || v === "TRUE" || v === 1 || v === "1";

  return snap.docs
    .map((doc) => ({ id: doc.id, ...(doc.data() as any) }))
    // Your page comment says this should filter isActive
    .filter((r) => isTruthy((r as any).isActive))
    .sort((a, b) => Number((a as any).order ?? 0) - Number((b as any).order ?? 0));
}

