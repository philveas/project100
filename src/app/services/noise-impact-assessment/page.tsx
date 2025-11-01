import { getServiceBySlug, getSectionsByServiceKey } from "@/lib/firestore-client";
import { getPlaceholder, type ResolvedImage } from "@/lib/placeholders";
import { type FirestoreSection, type Service } from "@/types/sections";

import { HeroSection } from "@/components/sections/HeroSection";
import { What2Section } from "@/components/sections/What2Section";
import { What3Section } from "@/components/sections/What3Section";
import { AccordionSection } from "@/components/sections/AccordionSection";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ReviewSection } from "@/components/sections/ReviewSection";
import { LocationSection } from "@/components/sections/LocationSection";

export default async function NoiseImpactAssessmentPage() {
  const slug = "noise-impact-assessment";

  const service: Service | null = await getServiceBySlug(slug);
  const sections: FirestoreSection[] = await getSectionsByServiceKey(service?.serviceKey || slug);

  const sortedSections = [...sections].sort(
    (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0)
  );

  const heroData = sortedSections.find((s) => s.kind?.toLowerCase() === "hero");
  const what2Data = sortedSections.find((s) => s.kind?.toLowerCase() === "what2");
  const what3Data = sortedSections.find((s) => s.kind?.toLowerCase() === "what3");
  const ctaData = sortedSections.find((s) => s.kind?.toLowerCase() === "cta");
  const locationData = sortedSections.find((s) => s.kind?.toLowerCase() === "location");

  const accordionData = sortedSections.filter((s) => s.kind?.toLowerCase() === "accordion");
  const featureData = sortedSections.filter((s) => s.kind?.toLowerCase() === "featurecard");
  const faqData = sortedSections.filter((s) => s.kind?.toLowerCase() === "faq");
  const reviewData = sortedSections.filter((s) => s.kind?.toLowerCase() === "review");

  // --- 🔹 Resolve Firestore image references safely ---
  const heroImageId = String(heroData?.["imageIdDesktop"] ?? "");
  const ctaImageId = String(ctaData?.["imageIdDesktop"] ?? "");

  const heroImage: ResolvedImage | undefined =
    heroImageId ? getPlaceholder(heroImageId) : undefined;

  const ctaImage: ResolvedImage | undefined =
    ctaImageId ? getPlaceholder(ctaImageId) : undefined;

  // 🔸 Optional local fallback only if absolutely no placeholder found
  const fallbackImage: ResolvedImage = {
    id: "fallback",
    description: "Fallback image",
    imageUrl: "/images/home/grass2.0.webp",
  };

  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      {heroData && (
        <HeroSection
          section={heroData}
          image={heroImage ?? fallbackImage}
          serviceTitle={service?.title}
        />
      )}
           
      {/* WHAT 2 SECTION */}
      {what2Data && <What2Section section={what2Data} />}
     
      {/* WHAT 3  SECTION */}
      {what3Data && <What3Section section={what3Data} />}
     
      {/* ACCORDION SECTION */}
      {accordionData.length > 0 && <AccordionSection sections={accordionData} />}

      {/* FEATURE SECTION */}
      {featureData.length > 0 && <FeatureSection sections={featureData} />}

      {/* CTA SECTION */}
      {ctaData && (
        <CtaSection
          section={ctaData}
          image={ctaImage ?? fallbackImage}
        />
      )}

      {/* REVIEW SECTION */}
      {reviewData.length > 0 && <ReviewSection sections={reviewData} />}

      {/* FAQ SECTION */}
      {faqData.length > 0 && <FaqSection sections={faqData} />}

      {/* LOCATION SECTION */}
      {locationData && <LocationSection section={locationData} />}
    </div>
  );
}
