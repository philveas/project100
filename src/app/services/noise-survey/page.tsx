// app/services/noise-survey/page.tsx

import { getServiceBySlug, getSectionsByServiceKey } from "@/lib/firestore-client";
import { getPlaceholder, type ResolvedImage } from "@/lib/placeholders"; // NOTE: Importing ResolvedImage type
import { type FirestoreSection, type Service } from "@/types/sections"; 
// Note: Assuming Service type is also exported from "@/types/sections"



// 1. IMPORT ALL STANDALONE SECTION COMPONENTS (Clean Names)
import { HeroSection } from "@/components/sections/HeroSection"; 
import { WhatSection } from "@/components/sections/WhatSection"; 
import { AccordionSection } from "@/components/sections/AccordionSection"; 
import { FeatureSection } from "@/components/sections/FeatureSection"; 
import { CtaSection } from "@/components/sections/CtaSection"; 
import { FaqSection } from "@/components/sections/FaqSection"; 
import { ReviewSection } from "@/components/sections/ReviewSection"; 
import { LocationSection } from "@/components/sections/LocationSection";


export default async function NoiseSurveyPage() {
  const slug = "noise-survey";
  
  // NOTE: Assuming getServiceBySlug now returns Promise<Service | null>
  const service: Service | null = await getServiceBySlug(slug);
  
  // NOTE: Assuming getSectionsByServiceKey now returns Promise<FirestoreSection[]>
  const sections: FirestoreSection[] = await getSectionsByServiceKey(service?.serviceKey || slug);

  // 2. SORT SECTIONS by 'order' property
  const sortedSections = [...sections].sort(
    (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0)
  );

  // 3. FILTER SECTIONS BY KIND
  const heroData = sortedSections.find((s) => s.kind?.toLowerCase() === "hero");
  const whatWeDoData = sortedSections.find((s) => s.kind?.toLowerCase() === "what");
  const ctaData = sortedSections.find((s) => s.kind?.toLowerCase() === "cta");
  const locationData = sortedSections.find((s) => s.kind?.toLowerCase() === "location");
  
  const accordionData = sortedSections.filter((s) => s.kind?.toLowerCase() === "accordion");
  const featureData = sortedSections.filter((s) => s.kind?.toLowerCase() === "featurecard");
  const faqData = sortedSections.filter((s) => s.kind?.toLowerCase() === "faq");
  const reviewData = sortedSections.filter((s) => s.kind?.toLowerCase() === "review"); 


  // --- Resolve Images Safely (to satisfy TypeScript) ---
const heroImage: ResolvedImage | undefined = heroData 
  // FIX APPLIED: Use String() to guarantee a string type for the function input
  ? getPlaceholder(String(heroData?.["imageIdDesktop"] ?? "")) 
  : undefined;
  
const ctaImage: ResolvedImage | undefined = ctaData 
  // FIX APPLIED: Use String() to guarantee a string type for the function input
  ? getPlaceholder(String(ctaData?.["imageIdDesktop"] ?? "")) 
  : undefined;

    
  // ---------------------------------------------------


  return (
    <div className="flex flex-col">

      {/* RENDER: HERO SECTION */}
      {/* Type Safety Check: Only render if we have data AND a resolved image object */}
      {heroData && (
      <HeroSection 
      section={heroData} 
      image={
      heroImage ?? { imageUrl: `/images/home/noise_survey_grass.webp` }
    }
    serviceTitle={service?.title}
  />
)}


      {/* RENDER: WHAT WE DO SECTION */}
      {whatWeDoData && <WhatSection section={whatWeDoData} />}
      
      {/* RENDER: ACCORDION GROUP SECTION */}
      {accordionData.length > 0 && <AccordionSection sections={accordionData} />}
      
      {/* RENDER: FEATURE CARDS SECTION */}
      {featureData.length > 0 && <FeatureSection sections={featureData} />}
      
      {/* RENDER: CTA SECTION */}
      {/* Type Safety Check: Only render if we have data AND a resolved image object */}
      {ctaData && ctaImage && (
        <CtaSection 
          section={ctaData} 
          image={ctaImage} // Guaranteed to be ResolvedImage here
        />
      )}

      {/* RENDER: REVIEW SECTION */}
      {reviewData.length > 0 && <ReviewSection sections={reviewData} />}
      
      {/* RENDER: FAQ SECTION */}
      {faqData.length > 0 && <FaqSection sections={faqData} />}

      {/* RENDER: LOCATION SECTION */}
      {locationData && <LocationSection section={locationData} />}

    </div>
  );
}