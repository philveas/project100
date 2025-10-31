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
import Logo from "./Logo";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";


export function Header() {
  const pathnameRaw = usePathname();
  const pathname = pathnameRaw ?? "/";
  const [isSheetOpen, setSheetOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href;
  };

  const servicesActive =
    SERVICES.some((s) => pathname.startsWith(s.href)) ||
    pathname === "/services";

  // Color helpers
  const cFg = "text-[hsl(var(--foreground))]";           // default (black-ish)
  const cAccentDark = "text-[hsl(var(--accent-dark))]";  // hover color
  const cSecondary = "text-[hsl(var(--secondary))]";     // ACTIVE (current page)

  // Interaction helpers
  const growHover = "transition-all duration-150 hover:scale-105";

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
        "transition-all focus:outline-none",
        isActive(href) ? cn(cSecondary, "font-semibold") : cFg,
        "hover:text-[hsl(var(--accent-dark))]",
        growHover,
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
            "flex items-center gap-1 outline-none transition-all text-base",
            servicesActive ? cn(cSecondary, "font-semibold") : cFg,
            "hover:text-[hsl(var(--accent-dark))]",
            growHover
          )}
        >
          Services
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] shadow-lg rounded-md p-2"
        >
          {SERVICES.map((service) => {
            const itemActive = pathname.startsWith(service.href);
            return (
              <DropdownMenuItem
                key={service.href}
                asChild
                // Force our own colors and suppress shadcn default highlight background
                className={cn(
                  "p-0 bg-transparent",
                  "hover:bg-transparent focus:bg-transparent",
                  // handle Radix `data-[highlighted]` state too:
                  "data-[highlighted]:bg-transparent data-[highlighted]:text-[hsl(var(--accent-dark))]"
                )}
              >
                <Link
                  href={service.href}
                  className={cn(
                    "block px-3 py-2 transition-all duration-150",
                    itemActive ? cn(cSecondary, "font-semibold") : cFg,
                    "hover:text-[hsl(var(--accent-dark))]",
                    growHover
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

      <p className={cn(servicesActive ? cn(cSecondary, "font-semibold") : cFg)}>
        Services
      </p>

      <div className="grid gap-2 pl-4">
        {SERVICES.map((service) => {
          const itemActive = pathname.startsWith(service.href);
          return (
            <Link
              key={service.href}
              href={service.href}
              onClick={() => setSheetOpen(false)}
              className={cn(
                "transition-all duration-150",
                itemActive ? cn(cSecondary, "font-semibold") : cFg,
                "hover:text-[hsl(var(--accent-dark))]",
                growHover
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
    <header className="sticky top-0 z-50 w-full bg-[hsl(var(--card))] shadow-md">
      <div className="container flex h-20 items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <div className="flex items-center mt-2">
          <Logo />
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-4">
          {mainNav}

          {/* Mobile menu */}
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  "md:hidden inline-flex items-center justify-center rounded-md border px-3 py-2 transition-all duration-150",
                  cFg,
                  "hover:text-[hsl(var(--accent-dark))] hover:scale-105 focus-visible:scale-105"
                )}
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
  side="left"
  className="bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border-r border-[hsl(var(--border))]"
>
  <VisuallyHidden>
    <h2>Mobile navigation menu</h2>
  </VisuallyHidden>

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
