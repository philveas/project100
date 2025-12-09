// lib/placeholders.ts
import raw from "./placeholder-images.json";

type BaseItem = {
  id: string;
  description: string;
  imageHint?: string;
  folder?: string;
};

// ORIGINAL (legacy) shapes still supported
type FileItem = BaseItem & { file: string; imageUrl?: never; desktop?: never; mobile?: never };
type UrlItem = BaseItem & { imageUrl: string; file?: never; desktop?: never; mobile?: never };

// NEW universal variant shape
type Variant = {
  file?: string;
  imageUrl?: string;
  width?: number;
  height?: number;
};

type VariantItem = BaseItem & {
  desktop?: Variant;
  mobile?: Variant;
  file?: never;
  imageUrl?: never;
};

type ImagePlaceholder = FileItem | UrlItem | VariantItem;
type Data = { placeholderImages: ImagePlaceholder[] };

const data = raw as Data;

// Base path for images
const PUBLIC_IMAGE_BASE = (process.env.NEXT_PUBLIC_IMAGE_BASE || "/images").replace(/\/+$/, "");

// Utility — builds a correct URL
function joinUrl(base: string, folder: string | undefined, file: string) {
  const parts = [base];
  if (folder) {
    parts.push(encodeURIComponent(folder.replace(/^\/+|\/+$/g, "")));
  }
  parts.push(encodeURIComponent(file.replace(/^\/+/, "")));
  return parts.join("/");
}

// --- VARIANT RESOLUTION TYPES ---
export type ResolvedVariant = {
  src: string;
  width?: number;
  height?: number;
};

// --- ⭐ FINAL, unified ResolvedImage (NO DUPLICATES) ---
export type ResolvedImage = BaseItem & {
  // Always available fallback image
  imageUrl: string;

  // Optional device variants
  desktop?: ResolvedVariant;
  mobile?: ResolvedVariant;

  // ⭐ Extended fields required by HeroSection
  desktopLowRes?: string;
  desktopFallback?: string;
  mobileLowRes?: string;
  mobileFallback?: string;
  videoFile?: string;
};

// Resolve a single variant entry
function resolveVariant(folder: string | undefined, v?: Variant): ResolvedVariant | undefined {
  if (!v) return undefined;

  const src =
    v.imageUrl ??
    (v.file ? joinUrl(PUBLIC_IMAGE_BASE, folder, v.file) : undefined);

  if (!src) return undefined;

  return {
    src,
    ...(v.width !== undefined ? { width: v.width } : {}),
    ...(v.height !== undefined ? { height: v.height } : {}),
  };
}

// --- Build ResolvedImage list from JSON ---
export const PlaceholderImages: ResolvedImage[] = (data.placeholderImages || []).map((p) => {
  const base: Pick<ResolvedImage, "id" | "description"> &
    Partial<Pick<ResolvedImage, "imageHint" | "folder">> = {
    id: p.id,
    description: p.description,
    ...(p.imageHint ? { imageHint: p.imageHint } : {}),
    ...(p.folder ? { folder: p.folder } : {}),
  };

  // Variant-aware entry (desktop/mobile)
  if ("desktop" in p || "mobile" in p) {
    const desktop = resolveVariant(p.folder, (p as VariantItem).desktop);
    const mobile = resolveVariant(p.folder, (p as VariantItem).mobile);

    const imageUrl = desktop?.src || mobile?.src;
    if (!imageUrl) {
      throw new Error(`Invalid placeholder entry for id "${p.id}": missing desktop/mobile src`);
    }

    return {
      ...base,
      imageUrl,
      ...(desktop ? { desktop } : {}),
      ...(mobile ? { mobile } : {}),
    };
  }

  // Legacy: imageUrl
  if ("imageUrl" in p && (p as UrlItem).imageUrl) {
    return {
      ...base,
      imageUrl: (p as UrlItem).imageUrl,
    };
  }

  // Legacy: file
  if ("file" in p && (p as FileItem).file) {
    return {
      ...base,
      imageUrl: joinUrl(PUBLIC_IMAGE_BASE, p.folder, (p as FileItem).file),
    };
  }

  throw new Error(`Invalid placeholder entry for id "${p.id}": missing imageUrl or file`);
});

// --- Exported utility ---
export function getPlaceholder(id: string): ResolvedImage | undefined {
  return PlaceholderImages.find((p) => p.id === id);
}
