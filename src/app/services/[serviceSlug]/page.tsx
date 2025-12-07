// app/services/[serviceSlug]/page.tsx

import { getServiceBySlug, getSectionsByServiceKey, db } from "@/lib/firestore-client";
import { getPlaceholder, type ResolvedImage } from "@/lib/placeholders";
import { type FirestoreSection, type Service } from "@/types/sections";
import { Metadata } from "next/types";
import dynamic from "next/dynamic";
import { collection, getDocs } from "firebase/firestore";


// --- Component Imports (Hero2 static, others dynamic) ---
import { Hero2Section } from "@/components/sections/Hero2Section";
const WhatIntroSection = dynamic(() => import("@/components/sections/WhatIntroSection").then(mod => mod.WhatIntroSection));
const WhatSection = dynamic(() => import("@/components/sections/WhatSection").then(mod => mod.WhatSection));
const WhatLeftSection = dynamic(() => import("@/components/sections/WhatLeftSection").then(mod => mod.WhatLeftSection));
const WhatRightSection = dynamic(() => import("@/components/sections/WhatRightSection").then(mod => mod.WhatRightSection));
const AccordionSection = dynamic(() => import("@/components/sections/AccordionSection").then(mod => mod.AccordionSection));
const FeatureSection = dynamic(() => import("@/components/sections/FeatureSection").then(mod => mod.FeatureSection));
const TypesSection = dynamic(() => import("@/components/sections/TypesSection").then(mod => mod.TypesSection));
const CtaSection = dynamic(() => import("@/components/sections/CtaSection").then(mod => mod.CtaSection));
const FaqSection = dynamic(() => import("@/components/sections/FaqSection").then(mod => mod.FaqSection));
const ReviewSection = dynamic(() => import("@/components/sections/ReviewSection").then(mod => mod.ReviewSection));
const LocationSection = dynamic(() => import("@/components/sections/LocationSection").then(mod => mod.LocationSection));
const What2Section = dynamic(() => import("@/components/sections/What2Section").then(mod => mod.What2Section));
const What3Section = dynamic(() => import("@/components/sections/What3Section").then(mod => mod.What3Section));
const WhatLeftImageSection = dynamic(() => import("@/components/sections/WhatLeftImageSection").then(mod => mod.WhatLeftImageSection));

// --- Component Map ---
const componentMap: { [key: string]: React.ComponentType<any> } = {
  hero2: Hero2Section,
  whatintro: WhatIntroSection,
  what: WhatSection,
  whatleft: WhatLeftSection,
  whatright: WhatRightSection,
  what2: What2Section,
  what3: What3Section,
  whatleftimage: WhatLeftImageSection,
  accordion: AccordionSection,
  featurecard: FeatureSection,
  type: TypesSection,
  cta: CtaSection,
  faq: FaqSection,
  review: ReviewSection,
  location: LocationSection,
};

const groupedKinds = ["featurecard", "type", "accordion", "faq", "review"];

// --- ✅ Generate Static Params for Static Export ---
export async function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_ALLOW_FIRESTORE_EXPORT !== "true") {
    console.warn("⚠️ Skipping Firestore fetch for static params");
    return [{ serviceSlug: "noise-survey" }]; // safe fallback
  }

  try {
    const snap = await getDocs(collection(db, "services"));
    const paths =
      snap.docs
        .map((doc) => doc.data())
        .filter((d: any) => d.isActive)
        .map((d: any) => ({
          serviceSlug: d.citySlug
            ? `${d.serviceKey}-${d.citySlug}`
            : d.serviceKey,
        })) ?? [];

    console.log(`✅ Generated ${paths.length} static service paths`);
    return paths;
  } catch (err) {
    console.error("❌ Error generating static params:", err);
    return [{ serviceSlug: "noise-survey" }];
  }
}

// --- Schema (SEO Structured Data) ---
function generateSchema(service: Service | null, heroImageUrl?: string) {
  if (!service) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": service.schemaType || "Service",
    name: service.title || "Acoustic Consultancy Service",
    description:
      service.metaDescription ||
      service.cardDescription ||
      "Specialist acoustic engineering consultancy service.",
    provider: {
      "@type": "Organization",
      name: "Veas Acoustics",
      url: "https://www.veasacoustics.co.uk",
      logo: "https://www.veasacoustics.co.uk/favicon.ico",
    },
    areaServed: service.regionName || "United Kingdom",
    serviceType: service.schemaServiceType || "Acoustic Consulting",
    url: `https://www.veasacoustics.co.uk/services/${service.slug}`,
    image: heroImageUrl
      ? `https://www.veasacoustics.co.uk${heroImageUrl}`
      : "https://www.veasacoustics.co.uk/images/home/grass2.0.webp",
  };

  return JSON.stringify(schema);
}

// --- Metadata (SEO, OG, Canonical) ---
export async function generateMetadata({
  params,
}: {
  params: { serviceSlug: string };
}): Promise<Metadata> {
  const slug = params.serviceSlug;
  let service: Service | null = null;
  let sections: FirestoreSection[] = [];

  try {
    if (process.env.NEXT_PUBLIC_ALLOW_FIRESTORE_EXPORT === "true") {
      service = await getServiceBySlug(slug);
      sections = await getSectionsByServiceKey(service?.serviceKey || slug);
    }
  } catch (err) {
    console.warn("⚠️ Firestore fetch skipped or failed during metadata:", err);
  }

  const hero2Data = sections.find((s) => s.kind?.toLowerCase() === "hero2");
  const folder = hero2Data?.["folder"] ?? "home";
  const heroImageId = hero2Data?.["imageIdDesktop"];
  const heroImageUrl =
    heroImageId && heroImageId !== "grass2.0"
      ? `/images/${folder}/${heroImageId}.webp`
      : "/images/home/grass2.0.webp";

  const fallbackTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const baseTitle =
    typeof service?.metaTitle === "string"
      ? service.metaTitle
      : service?.title || fallbackTitle;

  const baseDescription =
    typeof service?.metaDescription === "string"
      ? service.metaDescription
      : service?.cardDescription ||
        "A specialist acoustic engineering consultancy.";

  return {
    title: `${baseTitle} - Veas Acoustics`,
    description: String(baseDescription || ""),
    alternates: {
      canonical: `https://www.veasacoustics.co.uk/services/${slug}`,
    },
    openGraph: {
      title: `${baseTitle} - Veas Acoustics`,
      description: String(baseDescription || ""),
      url: `https://www.veasacoustics.co.uk/services/${slug}`,
      type: "website",
      images: [
        {
          url: heroImageUrl,
          width: 1200,
          height: 630,
          alt: baseTitle,
        },
      ],
    },
  };
}

// --- MAIN PAGE ---
export default async function ServicePage({
  params,
}: {
  params: { serviceSlug: string };
}) {
  const slug = params.serviceSlug;
  let service: Service | null = null;
  let rawSections: FirestoreSection[] = [];

  try {
    if (process.env.NEXT_PUBLIC_ALLOW_FIRESTORE_EXPORT === "true") {
      service = await getServiceBySlug(slug);
      rawSections = await getSectionsByServiceKey(service?.serviceKey || slug);
    }
  } catch (err) {
    console.warn("⚠️ Firestore fetch skipped or failed:", err);
  }

  const sortedSections = [...rawSections].sort(
    (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0)
  );

  const finalRenderArray: {
    kind: string;
    data: FirestoreSection | FirestoreSection[];
  }[] = [];
  const renderedKinds = new Set<string>();

  sortedSections.forEach((section) => {
    const kind = section.kind?.toLowerCase();
    if (!kind) return;

    if (groupedKinds.includes(kind)) {
      if (renderedKinds.has(kind)) return;
      const group = sortedSections.filter((s) => s.kind?.toLowerCase() === kind);
      if (group.length > 0) {
        finalRenderArray.push({ kind, data: group });
        renderedKinds.add(kind);
      }
    } else {
      finalRenderArray.push({ kind, data: section });
    }
  });

  const hero2Data = finalRenderArray.find((s) => s.kind === "hero2")?.data as FirestoreSection;
  const ctaData = finalRenderArray.find((s) => s.kind === "cta")?.data as FirestoreSection;
  const whatLeftImageData = finalRenderArray.find((s) => s.kind === "whatleftimage")?.data as FirestoreSection;

  const heroImageId = String(hero2Data?.["imageIdDesktop"] ?? "");
  const ctaImageId = String(ctaData?.["imageIdDesktop"] ?? "");
  const whatLeftImageId = String(whatLeftImageData?.["imageIdDesktop"] ?? "");

  const heroImage: ResolvedImage | undefined = heroImageId ? getPlaceholder(heroImageId) : undefined;
  const ctaImage: ResolvedImage | undefined = ctaImageId ? getPlaceholder(ctaImageId) : undefined;
  const whatLeftImage: ResolvedImage | undefined = whatLeftImageId ? getPlaceholder(whatLeftImageId) : undefined;

  const fallbackImage: ResolvedImage = {
    id: "fallback",
    description: "Fallback image",
    imageUrl: "/images/grass2.0.webp",
  };

  const schemaJson = generateSchema(service, heroImage?.imageUrl);

  return (
    <div className="flex flex-col">
      {schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
      )}

      {finalRenderArray.map((item, index) => {
        const Component = componentMap[item.kind];
        if (!Component) return null;

        const isArray = groupedKinds.includes(item.kind);
        let props: any = isArray
          ? { sections: item.data as FirestoreSection[] }
          : { section: item.data as FirestoreSection };

        if (item.kind === "hero2") {
          props = { ...props, image: heroImage ?? fallbackImage, serviceTitle: service?.title };
        } else if (item.kind === "cta") {
          props = { ...props, image: ctaImage ?? fallbackImage };
        } else if (item.kind === "whatleftimage") {
          props = { ...props, image: whatLeftImage ?? fallbackImage };
        }

        return <Component key={`${item.kind}-${index}`} {...props} />;
      })}
    </div>
  );
}
