// app/contact/page.tsx
import Image from "next/image";
import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPlaceholder } from "@/lib/placeholders";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Veas Acoustics",
  description:
    "Get in touch with Veas Acoustics for noise surveys and impact assessments or building acoustic design consultancy.",
};

// helpers to build /images/<folder>/<file>
const enc = (s?: string) => (s ? encodeURIComponent(s) : undefined);
const toPath = (folder?: string, file?: string) => {
  const f = enc(folder);
  const fl = enc(file);
  return f && fl ? `/images/${f}/${fl}` : undefined;
};

export default function ContactPage() {
  const mapImage = getPlaceholder("contact-map") as
    | {
        folder?: string;
        description?: string;
        imageHint?: string;
        desktop?: { file?: string; width?: number; height?: number };
        mobile?: { file?: string; width?: number; height?: number };
        file?: string;
      }
    | undefined;

  const mapAlt =
    mapImage?.description ?? "Map showing Veas Acoustics office location";

  // Resolve mobile/desktop sources from placeholder JSON
  const mobileMapSrc =
    toPath(mapImage?.folder, mapImage?.mobile?.file) ??
    toPath(mapImage?.folder, mapImage?.file) ??
    "/images/contact/ukmapgrey320.webp";

  const desktopMapSrc =
    toPath(mapImage?.folder, mapImage?.desktop?.file) ??
    toPath(mapImage?.folder, mapImage?.file) ??
    "/images/contact/ukgrey.webp";

  return (
    <div className="bg-card">
      {/* ---------- HEADER ---------- */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 text-center animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-headline text-primary font-semibold">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground font-light">
            We’re here to help. Please use the form to send us a message, or
            contact us using <br />
            the details below or by clicking the Whatsapp icon.
          </p>
        </div>
      </section>

      {/* ---------- CONTACT SECTION ---------- */}
      <section className="container px-4 md:px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-12">
          {/* FORM CARD */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-headline font-semibold">
                Send us a Message
              </CardTitle>
            </CardHeader>
<CardContent>
  <ContactForm />
</CardContent>


          </Card>

          {/* MAP + OVERLAYS */}
          <div className="relative rounded-lg overflow-hidden shadow-lg h-[600px]">
            {/* Mobile & tablet map image (NO FLOATING MARKER) */}
            <div className="relative h-full lg:hidden">
              <Image
                src={mobileMapSrc}
                alt={mapAlt}
                fill
                sizes="100vw"
                priority
                className="object-contain w-full h-full"
              />
            </div>

            {/* Desktop map image + floating marker (DESKTOP ONLY) */}
            <div className="hidden lg:block relative h-full">
              <Image
                src={desktopMapSrc}
                alt={mapAlt}
                fill
                sizes="(max-width: 1536px) 50vw, 800px"
                priority
                className="object-cover"
                {...(mapImage?.imageHint ? { "data-ai-hint": mapImage.imageHint } : {})}
              />

              {/* Floating pin marker — desktop only because parent is hidden below lg */}
              <div
                className="absolute z-40 pointer-events-none"
                style={{
                  left: "74.5%",  // adjust on desktop if needed
                  top: "81.5%",
                  transform: "translate(-50%, -100%)",
                }}
                aria-hidden
              >
                <MapPin
                  className="w-9 h-9 text-accent drop-shadow-[0_2px_4px_rgba(0,0,0,.05)]"
                  strokeWidth={2.5}
                />
              </div>
            </div>

            {/* Grey tint overlay (above image, below content) */}
            <div className="absolute inset-0 bg-black/50 z-10" />

            {/* CONTACT INFO OVERLAY (address pin stays visible on all breakpoints) */}
            <div className="absolute inset-0 z-40 flex flex-col justify-between p-8">
              <div>
                <h2 className="text-2xl font-headline font-semibold mb-6 text-white">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-accent drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]" />
                    <div>
                      <h3 className="font-semibold text-white">Email</h3>
                      <a
                        href="mailto:info@veasacoustics.com"
                        className="text-white hover:text-accent transition-colors font-light"
                      >
                        info@veasacoustics.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-accent drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]" />
                    <div>
                      <h3 className="font-semibold text-white">Phone</h3>
                      <a
                        href="tel:+447721524262"
                        className="text-white hover:text-accent transition-colors font-light"
                      >
                        +44 07721 524262
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    {/* This is the address pin (kept visible on all devices) */}
                    <MapPin className="w-6 h-6 text-accent drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]" />
                    <div>
                      <h3 className="font-semibold text-white">Office</h3>
                      <p className="text-white font-light">9 Perseverance Works,</p>
                      <p className="text-white font-light">Kingsland Road,</p>
                      <p className="text-white font-light">London, E2 8DD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* END CONTACT INFO OVERLAY */}
          </div>
        </div>
      </section>
    </div>
  );
}
