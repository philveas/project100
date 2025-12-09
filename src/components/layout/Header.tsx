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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SERVICES } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, type ReactNode } from "react";
import Logo from "./Logo";

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

  const idle = "text-foreground";
  const hover = "hover:text-accent-dark";
  const active = "text-secondary font-semibold";

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
      onClick={() => setSheetOpen(false)}
      className={cn(
        "transition-colors focus:outline-none",
        isActive(href) ? active : cn(idle, hover),
        className
      )}
    >
      {children}
    </Link>
  );

  // ---------------------
  // DESKTOP NAVIGATION
  // ---------------------
  const mainNav = (
    <nav className="hidden md:flex items-center space-x-8 text-base font-medium">
      <span className="text-sm text-foreground">0207 118 0504</span>

      <NavLink href="/">Home</NavLink>

      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "flex items-center gap-1 outline-none transition-colors",
            servicesActive ? active : cn(idle, hover)
          )}
        >
          Services
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="bg-card shadow-md border-0"
          sideOffset={8}
          align="end"
          alignOffset={-16}
        >
          {SERVICES.filter((s) => s.slug !== "home").map((service) => { 
            const itemActive = pathname.startsWith(service.href);

            return (
              <DropdownMenuItem
                key={service.href}
                asChild
                className="
                  flex justify-end w-full p-0
                  bg-card
                  data-[highlighted]:bg-card
                  data-[highlighted]:text-accent-dark
                "
              >
                <Link
                  href={service.href}
                  onClick={() => setSheetOpen(false)}
                  className={cn(
                    "block w-full px-3 py-1 text-right transition-colors focus:outline-none",
                    itemActive
                      ? active
                      : cn(idle, "hover:text-accent-dark")
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

  // ---------------------
  // MOBILE NAVIGATION
  // ---------------------
  const mobileNav = (
    <nav className="grid gap-4 text-lg">
      <NavLink href="/">Home</NavLink>

      <p className={cn(servicesActive ? active : idle)}>Services</p>

      <div className="grid gap-2 pl-4">
       {SERVICES.filter((s) => s.slug !== "home").map((service) => {
          const itemActive = pathname.startsWith(service.href);

          return (
            <Link
              key={service.href}
              href={service.href}
              onClick={() => setSheetOpen(false)}
              className={cn(
                "transition-colors focus:outline-none",
                itemActive ? active : cn(idle, hover)
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
      <div className="container flex h-24 items-center justify-between px-10">
        <div className="flex items-center mt-3">
          <Logo />
        </div>

        <div className="flex items-center space-x-4">
          {mainNav}

          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  "md:hidden inline-flex items-center justify-center rounded-md border px-3 py-2 transition-colors",
                  idle,
                  "hover:text-accent-dark"
                )}
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>

            <SheetContent side="left">
           <VisuallyHidden>
           <h2>Navigation Menu</h2>
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
