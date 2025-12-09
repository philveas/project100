// app/services/[serviceSlug]/page.tsx

import { getServiceBySlug, getSectionsByServiceKey } from "@/lib/firestore-client";
import { getPlaceholder, type ResolvedImage } from "@/lib/placeholders";
import { type FirestoreSection, type Service } from "@/types/sections";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { redirect } from "next/navigation";

// Static LCP hero
import { Hero2Section } from "@/components/sections/Hero2Section";

// Dynamic imports
const WhatIntroSection = dynamic(() =>
  import("@/components/sections/WhatIntroSection").then((mod) => mod.WhatIntroSection)
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
  import("@/components/sections/AccordionWhiteSection").then((mod) => mod.AccordionWhiteSection)
);
const FeatureSection = dynamic(() =>
  import("@/components/sections/FeatureSection").then((mod) => mod.FeatureSection)
);
const TypesSection = dynamic(() =>
  import("@/components/sections/TypesSection").then((mod) => mod.TypesSection)
);
const CtaSection = dynamic(() =>
  import("@/components/sections/CtaSection").then((mod) => mod.CtaSection)
);
const FaqSection = dynamic(() =>
  import("@/components/sections/FaqSection").then((mod) => mod.FaqSection)
);
const ReviewSection = dynamic(() =>
  import("@/components/sections/ReviewSection").then((mod) => mod.ReviewSection)
);
const LocationSection = dynamic(() =>
  import("@/components/sections/LocationSection").then((mod) => mod.LocationSection)
);
const What2Section = dynamic(() =>
  import("@/components/sections/What2Section").then((mod) => mod.What2Section)
);
const What3Section = dynamic(() =>
  import("@/components/sections/What3Section").then((mod) => mod.What3Section)
);
const WhatLeftImageSection = dynamic(() =>
  import("@/components/sections/WhatLeftImageSection").then((mod) => mod.WhatLeftImageSection)
);

// Component map
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
  accordionwhite: AccordionWhiteSection,
  featurecard: FeatureSection,
  type: TypesSection,
  cta: CtaSection,
  faq: FaqSection,
  review: ReviewSection,
  location: LocationSection,
};

const groupedKinds = ["featurecard", "type", "accordion", "accordionwhite", "faq", "review"];

// ----------------------------------------
//  METADATA — CLEAN & TYPE-SAFE
// ----------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const slug = resolved.serviceSlug;

  if (slug === "home") return redirect("/");

  const service = await getServiceBySlug(slug);
  const sections = await getSectionsByServiceKey(service?.serviceKey || slug);

  // Hero image for OG
  const heroData = sections.find((s) => s.kind?.toLowerCase() === "hero2");
  const folder = heroData?.folder ?? "home";
  const heroImageId = heroData?.imageIdDesktop;

  const heroImageUrl =
    typeof heroImageId === "string" &&
    heroImageId.trim() !== "" &&
    heroImageId !== "grass2.0"
      ? `/images/${folder}/${heroImageId}.webp`
      : "/images/home/grass2.0.webp";

  // TITLE (safe)
  const rawTitle = service?.metaTitle || service?.title || slug.replace(/-/g, " ");
  const safeTitle =
    typeof rawTitle === "string" && rawTitle.trim().length > 0
      ? rawTitle
      : "Service";

  // DESCRIPTION (safe)
  const rawDescription = service?.metaDescription || service?.cardDescription;
  const safeDescription =
    typeof rawDescription === "string" && rawDescription.trim().length > 0
      ? rawDescription
      : "A specialist acoustic engineering consultancy.";

  return {
    title: `${safeTitle} - Veas Acoustics`,
    description: safeDescription,
    metadataBase: new URL("https://www.veasacoustics.co.uk"),

    alternates: {
      canonical: `https://www.veasacoustics.co.uk/services/${slug}`,
    },

    openGraph: {
      title: `${safeTitle} - Veas Acoustics`,
      description: safeDescription,
      url: `https://www.veasacoustics.co.uk/services/${slug}`,
      images: [
        {
          url: heroImageUrl,
          width: 1200,
          height: 630,
          alt: safeTitle,
        },
      ],
    },
  };
}

// ----------------------------------------
//  MAIN PAGE
// ----------------------------------------
export default async function ServicePage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const resolved = await params;
  const slug = resolved.serviceSlug;

  const service: Service | null = await getServiceBySlug(slug);
  const sections: FirestoreSection[] = await getSectionsByServiceKey(
    service?.serviceKey || slug
  );

  const sorted = [...sections].sort(
    (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0)
  );

  const finalRender: { kind: string; data: any }[] = [];
  const used = new Set<string>();

  for (const sec of sorted) {
    const kind = sec.kind?.toLowerCase();
    if (!kind) continue;

    if (groupedKinds.includes(kind)) {
      if (used.has(kind)) continue;

      const grouped = sorted.filter((s) => s.kind?.toLowerCase() === kind);
      finalRender.push({ kind, data: grouped });
      used.add(kind);
    } else {
      finalRender.push({ kind, data: sec });
    }
  }

  const resolveImg = (d?: FirestoreSection) =>
    d?.imageIdDesktop ? getPlaceholder(String(d.imageIdDesktop)) : undefined;

  const heroImg = resolveImg(finalRender.find((x) => x.kind === "hero2")?.data);
  const ctaImg = resolveImg(finalRender.find((x) => x.kind === "cta")?.data);
  const leftImg = resolveImg(finalRender.find((x) => x.kind === "whatleftimage")?.data);

  const fallback: ResolvedImage = {
    id: "fallback",
    description: "fallback",
    imageUrl: "/images/home/grass2.0.webp",
  };

  return (
    <div className="flex flex-col">
      {finalRender.map((item, i) => {
        const Component = componentMap[item.kind];
        if (!Component) return null;

        const isMulti = groupedKinds.includes(item.kind);
        const props: any = isMulti
          ? { sections: item.data }
          : { section: item.data };

        if (item.kind === "hero2") props.image = heroImg ?? fallback;
        if (item.kind === "cta") props.image = ctaImg ?? fallback;
        if (item.kind === "whatleftimage") props.image = leftImg ?? fallback;

        return <Component key={`${item.kind}-${i}`} {...props} />;
      })}
    </div>
  );
}
