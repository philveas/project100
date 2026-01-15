export type LocationDoc = {
  id: string;

  // fields used in /locations/[locationSlug]/page.tsx
  locationKey?: string;
  locationSlug?: string;
  locationName?: string;
  metaTitle?: string;
  metaDescription?: string;

  // optional fields used elsewhere (safe to keep)
  showInMenu?: boolean;
  menuLabel?: string;
  menuOrder?: number;
  menuGroup?: string | null;
  isActive?: boolean;
};
