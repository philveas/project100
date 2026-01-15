// src/lib/sectionRegistry.ts

import dynamic from "next/dynamic";
import type React from "react";

// Static LCP heroes (server safe imports)
import { HeroSection } from "@/components/sections/HeroSection";
import { Hero2Section } from "@/components/sections/Hero2Section";

/**
 * Validated dynamic loader:
 * - Accepts either a named export OR a default export.
 * - If neither exists, throws a useful error listing the module's exports.
 */
function loadSection<TModule extends Record<string, any>>(
  importer: () => Promise<TModule>,
  exportName: string,
  pathLabel: string
) {
  return dynamic(() =>
    importer().then((mod: any) => {
      const Component = mod?.[exportName] ?? mod?.default;

      if (!Component) {
        const keys = mod ? Object.keys(mod) : [];
        throw new Error(
          `[sectionRegistry] Failed to load ${pathLabel}. Expected export "${exportName}" or default export. Available exports: ${keys.join(
            ", "
          )}`
        );
      }

      return Component;
    })
  );
}

// Dynamic imports (client sections)
const WhatIntroSection = loadSection(
  () => import("@/components/sections/WhatIntroSection"),
  "WhatIntroSection",
  "@/components/sections/WhatIntroSection"
);

const WhatSection = loadSection(
  () => import("@/components/sections/WhatSection"),
  "WhatSection",
  "@/components/sections/WhatSection"
);

const WhatLeftSection = loadSection(
  () => import("@/components/sections/WhatLeftSection"),
  "WhatLeftSection",
  "@/components/sections/WhatLeftSection"
);

const WhatRightSection = loadSection(
  () => import("@/components/sections/WhatRightSection"),
  "WhatRightSection",
  "@/components/sections/WhatRightSection"
);

const AccordionSection = loadSection(
  () => import("@/components/sections/AccordionSection"),
  "AccordionSection",
  "@/components/sections/AccordionSection"
);

const AccordionWhiteSection = loadSection(
  () => import("@/components/sections/AccordionWhiteSection"),
  "AccordionWhiteSection",
  "@/components/sections/AccordionWhiteSection"
);

const FeatureSection = loadSection(
  () => import("@/components/sections/FeatureSection"),
  "FeatureSection",
  "@/components/sections/FeatureSection"
);

const FeatureSectionx2 = loadSection(
  () => import("@/components/sections/FeatureSectionx2"),
  "FeatureSectionx2",
  "@/components/sections/FeatureSectionx2"
);


const TypesSection = loadSection(
  () => import("@/components/sections/TypesSection"),
  "TypesSection",
  "@/components/sections/TypesSection"
);

const CtaSection = loadSection(
  () => import("@/components/sections/CtaSection"),
  "CtaSection",
  "@/components/sections/CtaSection"
);

const Cta2Section = loadSection(
  () => import("@/components/sections/Cta2Section"),
  "Cta2Section",
  "@/components/sections/Cta2Section"
);

const FaqSection = loadSection(
  () => import("@/components/sections/FaqSection"),
  "FaqSection",
  "@/components/sections/FaqSection"
);

const ReviewSection = loadSection(
  () => import("@/components/sections/ReviewSection"),
  "ReviewSection",
  "@/components/sections/ReviewSection"
);

const LocationSection = loadSection(
  () => import("@/components/sections/LocationSection"),
  "LocationSection",
  "@/components/sections/LocationSection"
);

const LocationTableSection = loadSection(
  () => import("@/components/sections/LocationTableSection"),
  "LocationTableSection",
  "@/components/sections/LocationTableSection"
);

const What2Section = loadSection(
  () => import("@/components/sections/What2Section"),
  "What2Section",
  "@/components/sections/What2Section"
);

const What3Section = loadSection(
  () => import("@/components/sections/What3Section"),
  "What3Section",
  "@/components/sections/What3Section"
);

const WhatLeftImageSection = loadSection(
  () => import("@/components/sections/WhatLeftImageSection"),
  "WhatLeftImageSection",
  "@/components/sections/WhatLeftImageSection"
);

const WhatTableSection = loadSection(
  () => import("@/components/sections/WhatTableSection"),
  "WhatTableSection",
  "@/components/sections/WhatTableSection"
);

const WhatTableBorder1Section = loadSection(
  () => import("@/components/sections/WhatTableBorder1Section"),
  "WhatTableBorder1Section",
  "@/components/sections/WhatTableBorder1Section"
);

const WhatAccentlogoSection = loadSection(
  () => import("@/components/sections/WhatAccentlogoSection"),
  "WhatAccentlogoSection",
  "@/components/sections/WhatAccentlogoSection"
);

const WhatCardSection = loadSection(
  () => import("@/components/sections/WhatCardSection"),
  "WhatCardSection",
  "@/components/sections/WhatCardSection"
);

const WhatPrimarySection = loadSection(
  () => import("@/components/sections/WhatPrimarySection"),
  "WhatPrimarySection",
  "@/components/sections/WhatPrimarySection"
);

const WhatSecondarySection = loadSection(
  () => import("@/components/sections/WhatSecondarySection"),
  "WhatSecondarySection",
  "@/components/sections/WhatSecondarySection"
);

const ResourcesHeroSection = loadSection(
  () => import("@/components/sections/ResourcesHeroSection"),
  "ResourcesHeroSection",
  "@/components/sections/ResourcesHeroSection"
);

// ----------------------------------------
// Normalise
// ----------------------------------------
export function normaliseKind(kind?: unknown): string {
  return String(kind ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/_/g, "")
    .replace(/-/g, "");
}

// ----------------------------------------
// Registry keys should be normalised keys
// ----------------------------------------
export const componentMap: Record<string, React.ComponentType<any>> = {
  hero: HeroSection,
  hero2: Hero2Section,
  resourceshero: ResourcesHeroSection,
		

  whatintro: WhatIntroSection,
  what: WhatSection,
  whatleft: WhatLeftSection,
  whatright: WhatRightSection,
  what2: What2Section,
  what3: What3Section,
  whatleftimage: WhatLeftImageSection,
  whattable: WhatTableSection,
  whattableborder1: WhatTableBorder1Section,
  whataccentlogo: WhatAccentlogoSection,
  whatcard: WhatCardSection,
  whatprimary: WhatPrimarySection,
  whatsecondary: WhatSecondarySection,

  accordion: AccordionSection,
  accordionwhite: AccordionWhiteSection,

  featurecard: FeatureSection,
  featurecardx2: FeatureSectionx2,

  type: TypesSection,

  cta: CtaSection,
  cta2: Cta2Section,

  faq: FaqSection,
  review: ReviewSection,

  location: LocationSection,
  locationtable: LocationTableSection,
};

export const groupedKinds = [
  "featurecard",
  "featurecardx2",
  "type",
  "accordion",
  "accordionwhite",
  "faq",
  "review",
] as const;

export const isGroupedKind = (k: string): boolean =>
  (groupedKinds as readonly string[]).includes(k);
