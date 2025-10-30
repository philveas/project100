import ComingSoonService from "@/components/coming-soon-service";
import * as Lucide from "lucide-react";

export async function generateMetadata() {
  return {
    title: "Building Acoustics – Coming Soon",
    description: "This service page is coming soon. Contact us for immediate support.",
  };
}

export default function Page() {
  return (
    <ComingSoonService
      title="Building Acoustics"
      Icon={Lucide.Building2}
      blurb="Detail to follow here shortly. For façade, partitions, reverberation or BB93/Approved Doc E design—drop us a line."
    />
  );
}
