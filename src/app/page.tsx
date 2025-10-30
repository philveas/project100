// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICES } from "@/lib/constants";
import { getPlaceholder } from "@/lib/placeholders";
import * as Lucide from "lucide-react";
import type { LucideIcon } from "lucide-react"; // ✅ type import

// --- Icons for Services ---
const ICONS: Record<string, keyof typeof Lucide> = {
  "Noise Survey": "AudioLines",
  "Noise Impact Assessment": "ChartColumn",
  "Acoustic Planning Support": "SquareCheckBig",
  "Building Acoustics": "Building2",
  "Acoustic Consultancy": "Handshake",
};

function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const IconName = ICONS[name];
  if (!IconName) return null;
  const Icon = (Lucide[IconName] as LucideIcon) ?? Lucide.HelpCircle;
  return (
    <Icon
      className={className ?? "h-7 w-7 text-primary shrink-0"}
      strokeWidth={1.75}
      aria-hidden="true"
    />
  );
}

export default function Home() {
  const hero = getPlaceholder("home-hero");
  const about = getPlaceholder("home-abstract");
  const meeting = getPlaceholder("home-meeting");

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        {/* Mobile image */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src={hero?.mobile?.src ?? hero?.imageUrl ?? "/images/hero_mobile.webp"}
            alt={hero?.description ?? "Acoustic consultancy — assessment, design and testing."}
            priority
            fill
            sizes="100vw"
            className="object-cover"
            quality={80}
          />
        </div>

        {/* Desktop video */}
        <video
          className="hidden md:block absolute inset-0 w-full h-full object-cover pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={hero?.desktop?.src ?? hero?.imageUrl ?? "/images/hero_poster.webp"}
          aria-hidden="true"
        >
          <source src="/videos/acoustic-design-places-we-work-learn-live2.mp4" type="video/mp4" />
        </video>

        {/* Overlay + content */}
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 container px-4 md:px-10 flex flex-col items-start justify-center">
          <div className="text-left">
            <h1 className="font-headline text-3xl md:text-5xl font-semibold tracking-tight text-white">
              Expert Acoustic Consultancy
              <span className="block font-body text-2xl md:text-4xl font-light mt-2">
                Assessment
                <span className="block">
                  Design <span className="text-accent">&amp;</span>
                  <br />
                  Testing
                </span>
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white font-light">
              Delivering Value through Excellence, Always.
            </p>
            <div className="mt-8 flex justify-start gap-4">
              <Button
                variant="ghost"
                asChild
                className="border border-accent-foreground text-white font hover:border-primary hover:text-foreground transition-colors"
              >
                <Link href="/contact">Contact Us Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-8 md:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-headline font-semibold text-primary">What We Do</h2>
            <div className="mt-4 max-w-4xl mx-auto text-foreground font-light space-y-4">
              <p>
                We provide extensive noise and acoustics consultancy services to a diverse client base including
                planning consultants, architects, contractors, developers and private individuals.
              </p>
              <p>
                Our expertise spans all sectors of the built environment, supporting projects from concept to completion
                with tailored acoustic solutions that meet regulatory standards, safeguard health and wellbeing and
                create environments where people can truly thrive.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <Card key={service.href} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <ServiceIcon name={service.name} />
                    <CardTitle className="font-headline text-xl font-semibold text-primary">{service.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/80 font-light">{service.description}</p>
                </CardContent>

                <div className="p-6 pt-0">
                  <Link href={service.href}>
                    <Button
                      variant="outline"
                      className="border-accent-foreground text-primary hover:bg-accent hover:text-foreground"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-8 md:py-16 bg-card">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative w-full mx-auto max-w-full md:max-w-[597px]">
              <div className="md:hidden">
                <Image
                  src={about?.mobile?.src ?? about?.imageUrl ?? "/images/home/acoustic_ceiling_mobile.webp"}
                  alt={about?.description ?? "Absorptive Acoustic Ceiling"}
                  width={about?.mobile?.width ?? 320}
                  height={about?.mobile?.height ?? 270}
                  sizes="100vw"
                  className="rounded-lg shadow-xl object-cover w-full h-auto"
                  loading="lazy"
                />
              </div>
              <div className="hidden md:block">
                <Image
                  src={about?.desktop?.src ?? about?.imageUrl ?? "/images/home/acoustic_ceiling.webp"}
                  alt={about?.description ?? "Absorptive Acoustic Ceiling"}
                  width={about?.desktop?.width ?? 597}
                  height={about?.desktop?.height ?? 448}
                  sizes="(max-width: 1024px) 50vw, 597px"
                  className="rounded-lg shadow-xl object-cover w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="px-1 md:px-0">
              <h2 className="text-3xl md:text-5xl font-headline font-semibold text-primary">About</h2>
              <div className="mt-5 text-foreground font-light space-y-4">
                <p>
                  Veas Acoustics is a specialist acoustic engineering consultancy delivering exceptional acoustic
                  design across all sectors of the built environment throughout the UK. Developed on 20 years of industry
                  experience, our mission is to Deliver Value through Excellence, Always.
                </p>
                <p>
                  We combine the latest technologies with efficient workflows to keep you informed and in control,
                  identifying risks early while delivering practical design solutions presented clearly and precisely.
                </p>
              </div>
              <Link href="/contact" className="mt-8 inline-block">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent-foreground text-primary hover:bg-accent hover:text-foreground"
                >
                  Find Out More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Acoustic Advice */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-left md:text-right px-1 md:px-0">
              <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary">
                Professional Acoustic Design Advice
              </h2>
              <div className="mt-4 text-foreground font-light space-y-4">
                <p>
                  We have experience supporting a diverse range of construction projects from residential refurbishments
                  and new residential-led mixed-use developments, to schools, education facilities, industrial sites and
                  power schemes.
                </p>
                <p>
                  Drawing on 20 years of technical knowledge and practical experience, we provide effective and robust
                  design solutions that minimise overdesign, reducing cost and carbon — delivering added value to every project.
                </p>
                <p>
                  Whether you’re navigating planning conditions, managing design requirements, or working to tight
                  construction deadlines, we provide a responsive and professional service that keeps your project moving
                  forward and on target.
                </p>
              </div>
            </div>

            <div className="relative w-full mx-auto max-w-full md:max-w-[598px]">
              <div className="md:hidden">
                <Image
                  src={meeting?.mobile?.src ?? meeting?.imageUrl ?? "/images/home/meeting2_mobile.webp"}
                  alt={meeting?.description ?? "Acoustic consultants meeting with architects"}
                  width={meeting?.mobile?.width ?? 320}
                  height={meeting?.mobile?.height ?? 270}
                  sizes="100vw"
                  className="rounded-lg shadow-xl object-cover w-full h-auto"
                  loading="lazy"
                />
              </div>
              <div className="hidden md:block">
                <Image
                  src={meeting?.desktop?.src ?? meeting?.imageUrl ?? "/images/home/meeting2.webp"}
                  alt={meeting?.description ?? "Acoustic consultants meeting with architects"}
                  width={meeting?.desktop?.width ?? 597}
                  height={meeting?.desktop?.height ?? 448}
                  sizes="(max-width: 1024px) 50vw, 597px"
                  className="rounded-lg shadow-xl object-cover w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
