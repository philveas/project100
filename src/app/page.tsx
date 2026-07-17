// src/app/page.tsx

import { getServiceBySlug, getSectionsByServiceKey } from "@/lib/firestore-client";
import { getPlaceholder, type ResolvedImage } from "@/lib/placeholders";
import { type FirestoreSection, type Service } from "@/types/sections";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { serializeForClient } from "@/lib/serializeForClient";

import {
  buildOrganizationSchema,
  buildFaqSchema,
  buildReviewSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema/buildSchema";

// ----------------------------------------
// STATIC LCP
// ----------------------------------------
import { HeroSection } from "@/components/sections/HeroSection";

// ----------------------------------------
// DYNAMIC IMPORTS
// ----------------------------------------
const HomeIntroSection = dynamic(() =>
  import("@/components/sections/HomeIntroSection").then((mod) => mod.HomeIntroSection)
);
const WhatSection = dynamic(() =>
  import("@/components/sections/WhatSection").then((mod) => mod.WhatSection)
);
const WhatLeftSection = dynamic(() =>
  import("@/components/sections/WhatLeftSection").then((mod) => mod.WhatLeftSection)
);
const WhatRightSection = dynamic(() =>
  import("@/components/sections/WhatRightSection").then((mod) => mod.WhatRightSection)
);
const AccordionSection = dynamic(() =>
  import("@/components/sections/AccordionSection").then((mod) => mod.AccordionSection)
);
const AccordionWhiteSection = dynamic(() =>
  import("@/components/sections/AccordionWhiteSection").then(
    (mod) => mod.AccordionWhiteSection
  )
);
const FeatureHomeSection = dynamic(() =>
  import("@/components/sections/FeatureHomeSection").then(
    (mod) => mod.FeatureHomeSection
  )
);
const TypesSection = dynamic(() =>
  import("@/components/sections/TypesSection").then((mod) => mod.TypesSection)
);
const CtaSection = dynamic(() =>
  import("@/components/sections/CtaSection").then((mod) => mod.CtaSection)
);
const Cta2Section = dynamic(() =>
  import("@/components/sections/Cta2Section").then((mod) => mod.Cta2Section)
);
const FaqSection = dynamic(() =>
  import("@/components/sections/FaqSection").then((mod) => mod.FaqSection)
);
const LocationSection = dynamic(() =>
  import("@/components/sections/LocationSection").then((mod) => mod.LocationSection)
);

// ----------------------------------------
// METADATA (NO SCHEMA HERE)
// ----------------------------------------
export async function generateMetadata(): Promise<Metadata> {
  const slug = "home";

  const service = await getServiceBySlug(slug);

  // Fetch and sanitize (safe even though metadata doesn't pass props, keeps values consistent)
  const sectionsRaw = await getSectionsByServiceKey(service?.serviceKey || slug);
  const sections = serializeForClient(sectionsRaw) as FirestoreSection[];

  // ✅ ROOT ROW (SOURCE OF TRUTH FOR HOME META)
  const root = sections.find((s) => s.kind === "root");

  // Hero image (unchanged)
  const heroData = sections.find((s) => s.kind?.toLowerCase() === "hero");
  const folder = heroData?.folder ?? "home";
  const heroImageId = heroData?.imageIdDesktop;

  const heroImageUrl =
    typeof heroImageId === "string" &&
    heroImageId.trim() !== "" &&
    heroImageId !== "grass2.0"
      ? `/images/${folder}/${heroImageId}.webp`
      : "/images/home/grass2.0.webp";

  // ✅ META TITLE FROM ROOT
  const title =
    typeof root?.metaTitle === "string" && root.metaTitle.trim()
      ? root.metaTitle
      : "Veas Acoustics";

  // ✅ META DESCRIPTION FROM ROOT
  const description =
    typeof root?.metaDescription === "string" && root.metaDescription.trim()
      ? root.metaDescription
      : "Acoustic engineering consultancy services.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: heroImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

// ----------------------------------------
// MAIN HOME PAGE (SCHEMA HERE)
// ----------------------------------------
export default async function HomePage() {
  const slug = "home";

  const service: Service | null = await getServiceBySlug(slug);

  // Fetch and sanitize BEFORE passing to any client component
  const sectionsRaw = await getSectionsByServiceKey(service?.serviceKey || slug);
  const sections = serializeForClient(sectionsRaw) as FirestoreSection[];

  const root = sections.find((s) => s.kind === "root");

  // ---------------------
  // SCHEMA BUILD
  // ---------------------
  // Optional but recommended: build schemas from sanitized objects too
  const safeRoot = root ? serializeForClient(root) : null;

  const orgSchema = safeRoot ? buildOrganizationSchema(safeRoot) : null;
  const reviewSchema = safeRoot ? buildReviewSchema(safeRoot) : null;

  const faqSchema = buildFaqSchema(
    serializeForClient(sections.filter((s) => s.kind?.toLowerCase() === "faq"))
  );

  const breadcrumbSchema = buildBreadcrumbSchema([
    {
      name: "Home",
      url: "https://www.veasacoustics.com/",
    },
  ]);

  const schemas = [orgSchema, reviewSchema, faqSchema, breadcrumbSchema].filter(Boolean);

  // ---------------------
  // PAGE CONTENT
  // ---------------------
  const sortedSections = [...sections].sort(
    (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0)
  );

  const heroData = sortedSections.find((s) => s.kind?.toLowerCase() === "hero");
  const homeIntroData = sortedSections.find((s) => s.kind?.toLowerCase() === "whatintro");
  const whatWeDoData = sortedSections.find((s) => s.kind?.toLowerCase() === "what");
  const ctaData = sortedSections.find((s) => s.kind?.toLowerCase() === "cta");
  const cta2Data = sortedSections.find((s) => s.kind?.toLowerCase() === "cta2");
  const locationData = sortedSections.find((s) => s.kind?.toLowerCase() === "location");
  const whatLeftData = sortedSections.find((s) => s.kind?.toLowerCase() === "whatleft");
  const whatRightData = sortedSections.find((s) => s.kind?.toLowerCase() === "whatright");

  const typesData = sortedSections.filter((s) => s.kind?.toLowerCase() === "type");
  const accordionData = sortedSections.filter((s) => s.kind?.toLowerCase() === "accordion");
  const accordionWhiteData = sortedSections.filter(
    (s) => s.kind?.toLowerCase() === "accordionwhite"
  );
  const featureData = sortedSections.filter((s) =>
    s.kind?.toLowerCase().includes("feature")
  );
  const faqData = sortedSections.filter((s) => s.kind?.toLowerCase() === "faq");

  const heroImageId = String(heroData?.imageIdDesktop ?? "");
  const ctaImageId = String(ctaData?.imageIdDesktop ?? "");

  const heroImage = heroImageId ? getPlaceholder(heroImageId) : undefined;
  const ctaImage = ctaImageId ? getPlaceholder(ctaImageId) : undefined;

  const fallbackImage: ResolvedImage = {
    id: "fallback",
    description: "Fallback image",
    imageUrl: "/images/home/grass2.0.webp",
  };

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={`schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="flex flex-col">
        {heroData && (
          <HeroSection
            section={heroData}
            image={heroImage ?? fallbackImage}
            serviceTitle={service?.title}
          />
        )}

        {whatWeDoData && <WhatSection section={whatWeDoData} />}
        {homeIntroData && <HomeIntroSection section={homeIntroData} />}
        {featureData.length > 0 && <FeatureHomeSection sections={featureData} />}
        {whatLeftData && <WhatLeftSection section={whatLeftData} />}
        {whatRightData && <WhatRightSection section={whatRightData} />}
        {ctaData && <CtaSection section={ctaData} image={ctaImage ?? fallbackImage} />}
        {cta2Data && (<Cta2Section section={cta2Data} />)}
        {typesData.length > 0 && <TypesSection sections={typesData} />}
        {accordionData.length > 0 && <AccordionSection sections={accordionData} />}
        {accordionWhiteData.length > 0 && (
          <AccordionWhiteSection sections={accordionWhiteData} />
        )}
        {faqData.length > 0 && <FaqSection sections={faqData} />}
        {locationData && <LocationSection section={locationData} />}
      </div>
    </>
  );
}
