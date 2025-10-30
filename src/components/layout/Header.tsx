"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SERVICES } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, type ReactNode } from "react";
import Logo from "./Logo"; // ensure the file is `Logo.tsx` (case-sensitive on some systems)

export function Header() {
  const pathnameRaw = usePathname();
  const pathname = pathnameRaw ?? "/"; // tiny safety guard
  const [isSheetOpen, setSheetOpen] = useState(false);

  // Determine active states
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href;
  };

  // Mark parent "Services" active if on a service page
  const servicesActive =
    SERVICES.some((s) => pathname.startsWith(s.href)) || pathname === "/services";

  // Core text style logic
  const baseIdle = "text-foreground";
  const hoverFocus =
    "hover:text-accent hover:font-semibold focus-visible:text-accent focus-visible:font-semibold";
  const active = "text-muted font-semibold";

  const NavLink = ({
    href,
    children,
    className,
  }: {
    href: string;
    children: ReactNode;
    className?: string;
  }) => (
    <Link
      href={href}
      className={cn(
        "transition-colors focus:outline-none",
        isActive(href) ? active : cn(baseIdle, hoverFocus),
        className
      )}
      onClick={() => setSheetOpen(false)}
    >
      {children}
    </Link>
  );

  // Desktop navigation
  const mainNav = (
    <nav className="hidden md:flex items-center space-x-8 text-base font-medium">
      <NavLink href="/">Home</NavLink>

      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "flex items-center gap-1 outline-none transition-colors",
            servicesActive ? active : cn(baseIdle, hoverFocus)
          )}
        >
          Services
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {SERVICES.map((service) => {
            const itemActive = pathname.startsWith(service.href);
            return (
              <DropdownMenuItem
                key={service.href}
                asChild
                className="p-0 bg-transparent hover:bg-transparent focus:bg-transparent"
              >
                <Link
                  href={service.href}
                  className={cn(
                    "block px-2 py-1 transition-colors focus:outline-none",
                    itemActive ? active : cn(baseIdle, hoverFocus)
                  )}
                >
                  {service.name}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <NavLink href="/contact">Contact</NavLink>
    </nav>
  );

  // Mobile navigation
  const mobileNav = (
    <nav className="grid gap-4 text-lg">
      <NavLink href="/">Home</NavLink>

      <p className={cn("transition-colors", servicesActive ? active : baseIdle)}>Services</p>

      <div className="grid gap-2 pl-4">
        {SERVICES.map((service) => {
          const itemActive = pathname.startsWith(service.href);
          return (
            <Link
              key={service.href}
              href={service.href}
              onClick={() => setSheetOpen(false)}
              className={cn(
                "transition-colors focus:outline-none",
                itemActive ? active : cn(baseIdle, hoverFocus)
              )}
            >
              {service.name}
            </Link>
          );
        })}
      </div>

      <NavLink href="/contact">Contact</NavLink>
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-card">
      <div className="container flex h-20 items-center justify-between px-10">
        <div className="flex items-center mt-3">
          <Logo />
        </div>

        <div className="flex items-center space-x-4">
          {mainNav}

          {/* Mobile menu */}
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  "md:hidden inline-flex items-center justify-center rounded-md border px-3 py-2 transition-colors",
                  baseIdle,
                  "hover:text-muted focus-visible:text-muted"
                )}
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex items-center space-x-2 mb-8">
                <Logo />
              </div>
              {mobileNav}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
