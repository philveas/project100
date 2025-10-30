import ComingSoonService from "@/components/coming-soon-service";
import * as Lucide from "lucide-react";

export async function generateMetadata() {
  return {
    title: "Acoustic Consultancy – Coming Soon",
    description: "This service page is coming soon. Contact us for immediate support.",
  };
}

export default function Page() {
  return (
    <ComingSoonService
      title="Acoustic Consultancy"
      Icon={Lucide.Handshake}
      blurb="General consultancy, scoping, peer review and strategy support available now—get in touch and we’ll assist."
    />
  );
}
