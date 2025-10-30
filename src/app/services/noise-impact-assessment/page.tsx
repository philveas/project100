import ComingSoonService from "@/components/coming-soon-service";
import * as Lucide from "lucide-react";

export async function generateMetadata() {
  return {
    title: "Noise Impact Assessment – Coming Soon",
    description: "This service page is coming soon. Contact us for immediate support.",
  };
}

export default function Page() {
  return (
    <ComingSoonService
      title="Noise Impact Assessment"
      Icon={Lucide.ChartColumn}
      blurb="This page is on the way. We already provide full Noise Impact Assessment services—reach out and we’ll advise right away."
    />
  );
}
