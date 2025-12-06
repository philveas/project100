// src/lib/resolveImage.ts
import type { FirestoreSection } from "@/types/sections";

export interface ImageSize {
  width?: number;
  height?: number;
}

/**
 * Resolves the best image URLs for a given Firestore section, allowing
 * per-component overrides for image sizes and fallbacks.
 */
export function resolveSectionImages(
  section: FirestoreSection,
  options?: {
    folderOverride?: string;
    baseIdOverride?: string;
    defaultDesktopSize?: ImageSize;
    defaultMobileSize?: ImageSize;
  }
) {
  const folderName =
    options?.folderOverride ??
    (section as any)?.folder ??
    (section as any)?.serviceKey ??
    "home";

  const baseId =
    options?.baseIdOverride ??
    (section as any)?.imageId ??
    (section as any)?.slug ??
    "default";

  const desktop =
    (section as any)?.desktop?.src ||
    (section as any)?.imageUrl ||
    `/images/${folderName}/${baseId}.webp`;

  const mobile =
    (section as any)?.mobile?.src ||
    (section as any)?.imageUrl ||
    `/images/${folderName}/${baseId}_mobile.webp`;

  const alt =
    (section as any)?.imageAlt ??
    (section as any)?.description ??
    baseId.replace(/[-_]/g, " ");

  const desktopSize = {
    width:
      (section as any)?.desktop?.width ??
      options?.defaultDesktopSize?.width ??
      600,
    height:
      (section as any)?.desktop?.height ??
      options?.defaultDesktopSize?.height ??
      400,
  };

  const mobileSize = {
    width:
      (section as any)?.mobile?.width ??
      options?.defaultMobileSize?.width ??
      320,
    height:
      (section as any)?.mobile?.height ??
      options?.defaultMobileSize?.height ??
      270,
  };

  return { folderName, baseId, desktop, mobile, alt, desktopSize, mobileSize };
}
