// server component – no "use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import * as Lucide from "lucide-react";

export default function ComingSoonService({
  title,
  blurb = "This page is on the way. In the meantime, get in touch and we’ll help you right away.",
  Icon = Lucide.Hourglass,
}: {
  title: string;
  blurb?: string;
  Icon?: Lucide.LucideIcon;
}) {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-card shadow">
            <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
          </div>
          <h1 className="font-headline text-3xl md:text-5xl font-semibold text-primary">
            {title}
          </h1>
          <p className="mt-4 text-foreground/80 font-light">{blurb}</p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Contact Us
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-accent-foreground text-primary hover:bg-accent hover:text-foreground">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
