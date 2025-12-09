// src/app/page.tsx

import { getServiceBySlug, getSectionsByServiceKey } from "@/lib/firestore-client";
import { getPlaceholder, type ResolvedImage } from "@/lib/placeholders";
import { type FirestoreSection, type Service } from "@/types/sections";
import { Metadata } from "next";

import { HeroSection } from "@/components/sections/HeroSection";
import { HomeIntroSection } from "@/components/sections/HomeIntroSection";
import { WhatSection } from "@/components/sections/WhatSection";
import { WhatLeftSection } from "@/components/sections/WhatLeftSection";
import { WhatRightSection } from "@/components/sections/WhatRightSection";
import { AccordionSection } from "@/components/sections/AccordionSection";
import { AccordionWhiteSection } from "@/components/sections/AccordionWhiteSection";
import { FeatureHomeSection } from "@/components/sections/FeatureHomeSection";
import { TypesSection } from "@/components/sections/TypesSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ReviewSection } from "@/components/sections/ReviewSection";
import { LocationSection } from "@/components/sections/LocationSection";


// ⭐ CLEAN + TYPE-SAFE METADATA (NO PRELOAD)
export async function generateMetadata(): Promise<Metadata> {
  const slug = "home";

  const service = await getServiceBySlug(slug);
  const sections = await getSectionsByServiceKey(service?.serviceKey || slug);

  // Hero section detection
  const heroData = sections.find((s) => s.kind?.toLowerCase() === "hero");
  const folder = heroData?.folder ?? "home";
  const heroImageId = heroData?.imageIdDesktop;

  // Build hero URL safely
  const heroImageUrl =
    typeof heroImageId === "string" &&
    heroImageId.trim() !== "" &&
    heroImageId !== "grass2.0"
      ? `/images/${folder}/${heroImageId}.webp`
      : "/images/home/grass2.0.webp";

  // ⭐ Safe title extraction
  const rawTitle = service?.metaTitle;
  const title =
    typeof rawTitle === "string" && rawTitle.trim().length > 0
      ? rawTitle
      : "Veas Acoustics";

  // ⭐ Safe description extraction
  const rawDescription =
    service?.metaDescription || service?.cardDescription;

  const description =
    typeof rawDescription === "string" && rawDescription.trim().length > 0
      ? rawDescription
      : "Acoustic engineering consultancy services.";

  return {
    title,
    description,
    metadataBase: new URL("https://www.veasacoustics.co.uk"),

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



// ⭐ MAIN HOME PAGE
export default async function HomePage() {
  const slug = "home";

  const service: Service | null = await getServiceBySlug(slug);
  const sections: FirestoreSection[] = await getSectionsByServiceKey(
    service?.serviceKey || slug
  );

  const sortedSections = [...sections].sort(
    (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0)
  );

  // Single-instance sections
  const heroData = sortedSections.find((s) => s.kind?.toLowerCase() === "hero");
  const homeIntroData = sortedSections.find((s) => s.kind?.toLowerCase() === "homeintro");
  const whatWeDoData = sortedSections.find((s) => s.kind?.toLowerCase() === "what");
  const ctaData = sortedSections.find((s) => s.kind?.toLowerCase() === "cta");
  const locationData = sortedSections.find((s) => s.kind?.toLowerCase() === "location");
  const whatLeftData = sortedSections.find((s) => s.kind?.toLowerCase() === "whatleft");
  const whatRightData = sortedSections.find((s) => s.kind?.toLowerCase() === "whatright");

  // Multi-instance sections
  const typesData = sortedSections.filter((s) => s.kind?.toLowerCase() === "type");
  const accordionData = sortedSections.filter((s) => s.kind?.toLowerCase() === "accordion");
  const accordionWhiteData = sortedSections.filter(
    (s) => s.kind?.toLowerCase() === "accordionwhite"
  );
  const featureData = sortedSections.filter((s) =>
    s.kind?.toLowerCase().includes("feature")
  );
  const faqData = sortedSections.filter((s) => s.kind?.toLowerCase() === "faq");
  const reviewData = sortedSections.filter((s) => s.kind?.toLowerCase() === "review");

  // Image resolution
  const heroImageId = String(heroData?.imageIdDesktop ?? "");
  const ctaImageId = String(ctaData?.imageIdDesktop ?? "");

  const heroImage: ResolvedImage | undefined = heroImageId
    ? getPlaceholder(heroImageId)
    : undefined;
  const ctaImage: ResolvedImage | undefined = ctaImageId
    ? getPlaceholder(ctaImageId)
    : undefined;

  const fallbackImage: ResolvedImage = {
    id: "fallback",
    description: "Fallback image",
    imageUrl: "/images/home/grass2.0.webp",
  };

  return (
    <div className="flex flex-col">
      {/* HERO */}
      {heroData && (
        <HeroSection
          section={heroData}
          image={heroImage ?? fallbackImage}
          serviceTitle={service?.title}
        />
      )}

      {/* WHAT SECTION */}
      {whatWeDoData && <WhatSection section={whatWeDoData} />}

      {/* HOME INTRO */}
      {homeIntroData && <HomeIntroSection section={homeIntroData} />}

      {/* FEATURE */}
      {featureData.length > 0 && <FeatureHomeSection sections={featureData} />}

      {/* LEFT / RIGHT */}
      {whatLeftData && <WhatLeftSection section={whatLeftData} />}
      {whatRightData && <WhatRightSection section={whatRightData} />}

      {/* CTA */}
      {ctaData && (
        <CtaSection section={ctaData} image={ctaImage ?? fallbackImage} />
      )}

      {/* TYPES */}
      {typesData.length > 0 && <TypesSection sections={typesData} />}

      {/* ACCORDIONS */}
      {accordionData.length > 0 && <AccordionSection sections={accordionData} />}
      {accordionWhiteData.length > 0 && (
        <AccordionWhiteSection sections={accordionWhiteData} />
      )}

      {/* REVIEWS */}
      {reviewData.length > 0 && <ReviewSection sections={reviewData} />}

      {/* FAQ */}
      {faqData.length > 0 && <FaqSection sections={faqData} />}

      {/* LOCATION */}
      {locationData && <LocationSection section={locationData} />}
    </div>
  );
}
