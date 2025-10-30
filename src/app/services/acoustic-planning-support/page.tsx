import ComingSoonService from "@/components/coming-soon-service";
import * as Lucide from "lucide-react";

export async function generateMetadata() {
  return {
    title: "Acoustic Planning Support – Coming Soon",
    description: "This service page is coming soon. Contact us for immediate support.",
  };
}

export default function Page() {
  return (
    <ComingSoonService
      title="Acoustic Planning Support"
      Icon={Lucide.SquareCheckBig}
      blurb="We’re preparing this page. In the meantime, we can help with planning noise statements, conditions and negotiations."
    />
  );
}
