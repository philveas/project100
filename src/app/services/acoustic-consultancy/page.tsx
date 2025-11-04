import ComingSoonService from "@/components/coming-soon-service";
import * as Lucide from "lucide-react";

export async function generateMetadata() {
  return {
    title: "Acoustic Consultancy – Coming Soon",
    description: "This service page is coming soon. Contact us now for support.",
  };
}

export default function Page() {
  return (
    <ComingSoonService
      title="Acoustic Consultancy"
      Icon={Lucide.Handshake}
      blurb="Acoustic consultancy for all buildings from inception to completion. Please get in touch if you need acoustic consultancy on your project."
    />
  );
}
