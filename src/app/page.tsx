import { getServiceBySlug, getSectionsByServiceKey } from "@/lib/firestore-client";
import { getPlaceholder, type ResolvedImage } from "@/lib/placeholders";
import { type FirestoreSection, type Service } from "@/types/sections";

import { HeroSection } from "@/components/sections/HeroSection";
import { WhatIntroSection } from "@/components/sections/WhatIntro";
import { WhatSection } from "@/components/sections/WhatSection";
import { WhatLeftSection } from "@/components/sections/WhatLeftSection";
import { WhatRightSection } from "@/components/sections/WhatRightSection";
import { AccordionSection } from "@/components/sections/AccordionSection";
import { FeatureHomeSection } from "@/components/sections/FeatureHomeSection";
import { TypesSection } from "@/components/sections/TypesSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ReviewSection } from "@/components/sections/ReviewSection";
import { LocationSection } from "@/components/sections/LocationSection";

// --- MAIN PAGE ---
export default async function HomePage() {
  const slug = "home";

  // ✅ Guard: Skip Firestore fetch during static export if disabled
  let service: Service | null = null;
  let sections: FirestoreSection[] = [];

  try {
    if (process.env.NEXT_PUBLIC_ALLOW_FIRESTORE_EXPORT === "true") {
      service = await getServiceBySlug(slug);
      sections = await getSectionsByServiceKey(service?.serviceKey || slug);
    } else {
      console.warn("⚠️ Firestore fetch skipped during static export");
    }
  } catch (err) {
    console.warn("⚠️ Firestore fetch failed:", err);
  }

  // 🔹 If Firestore was skipped, provide an empty fallback to avoid crashes
  if (!sections || sections.length === 0) {
    console.warn("⚠️ No sections found — rendering fallback homepage");
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-3xl font-semibold">Veas Acoustics</h1>
        <p className="text-gray-600 mt-4">
          Acoustic consultancy excellence — website content temporarily unavailable during static export.
        </p>
      </div>
    );
  }

  // 3️⃣ Sort sections by order
  const sortedSections = [...sections].sort(
    (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0)
  );

  // 4️⃣ Find single-instance sections
  const heroData = sortedSections.find((s) => s.kind?.toLowerCase() === "hero");
  const whatIntroData = sortedSections.find((s) => s.kind?.toLowerCase() === "whatintro");
  const whatWeDoData = sortedSections.find((s) => s.kind?.toLowerCase() === "what");
  const ctaData = sortedSections.find((s) => s.kind?.toLowerCase() === "cta");
  const locationData = sortedSections.find((s) => s.kind?.toLowerCase() === "location");
  const whatLeftData = sortedSections.find((s) => s.kind?.toLowerCase() === "whatleft");
  const whatRightData = sortedSections.find((s) => s.kind?.toLowerCase() === "whatright");

  // 5️⃣ Find multi-instance sections
  const typesData = sortedSections.filter((s) => s.kind?.toLowerCase() === "type");
  const accordionData = sortedSections.filter((s) => s.kind?.toLowerCase() === "accordion");

  const featureData = sortedSections.filter((s) =>
    s.kind?.toLowerCase().includes("feature")
  );

  const faqData = sortedSections.filter((s) => s.kind?.toLowerCase() === "faq");
  const reviewData = sortedSections.filter((s) => s.kind?.toLowerCase() === "review");

  // 6️⃣ Resolve Firestore image references safely
  const heroImageId = String(heroData?.["imageIdDesktop"] ?? "");
  const ctaImageId = String(ctaData?.["imageIdDesktop"] ?? "");

  const heroImage: ResolvedImage | undefined = heroImageId
    ? getPlaceholder(heroImageId)
    : undefined;

  const ctaImage: ResolvedImage | undefined = ctaImageId
    ? getPlaceholder(ctaImageId)
    : undefined;

  // 🔸 Local fallback image if no placeholder found
  const fallbackImage: ResolvedImage = {
    id: "fallback",
    description: "Fallback image",
    imageUrl: "/images/home/grass2.0.webp",
  };

  // 7️⃣ Render page layout
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

      {/* WHAT SECTION */}
      {whatWeDoData && <WhatSection section={whatWeDoData} />}

      {/* WHATINTRO SECTION */}
      {whatIntroData && <WhatIntroSection section={whatIntroData} />}

      {/* FEATURE HOME SECTION */}
      {featureData.length > 0 && <FeatureHomeSection sections={featureData} />}

      {/* WHATLEFT SECTION */}
      {whatLeftData && <WhatLeftSection section={whatLeftData} />}

      {/* WHATRIGHT SECTION */}
      {whatRightData && <WhatRightSection section={whatRightData} />}

      {/* CTA SECTION */}
      {ctaData && <CtaSection section={ctaData} image={ctaImage ?? fallbackImage} />}

      {/* TYPES SECTION */}
      {typesData.length > 0 && <TypesSection sections={typesData} />}

      {/* ACCORDION SECTION */}
      {accordionData.length > 0 && <AccordionSection sections={accordionData} />}

      {/* REVIEW SECTION */}
      {reviewData.length > 0 && <ReviewSection sections={reviewData} />}

      {/* FAQ SECTION */}
      {faqData.length > 0 && <FaqSection sections={faqData} />}

      {/* LOCATION SECTION */}
      {locationData && <LocationSection section={locationData} />}
    </div>
  );
}
