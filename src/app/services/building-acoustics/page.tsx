import ComingSoonService from "@/components/coming-soon-service";
import * as Lucide from "lucide-react";

export async function generateMetadata() {
  return {
    title: "Building Acoustics – Coming Soon",
    description: "This service page is coming soon. Contact us now for support.",
  };
}

export default function Page() {
  return (
    <ComingSoonService
      title="Building Acoustics"
      Icon={Lucide.Building2}
      blurb="Detail to follow here shortly. We love designing buildings, for acoustic design on your porject, please drop us a line."
    />
  );
}
