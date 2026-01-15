"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function scrollAllToTop() {
  // window scroll
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // common scroll containers (covers cases where you scroll inside a wrapper)
  const candidates = [
    document.querySelector("main"),
    document.querySelector("[data-scroll-container]"),
    document.querySelector("#__next"),
    document.querySelector("body > div"),
  ].filter(Boolean) as HTMLElement[];

  for (const el of candidates) {
    // only attempt if it can scroll
    if (el && el.scrollTop !== undefined) el.scrollTop = 0;
  }
}

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Run immediately
    scrollAllToTop();

    // Run again after layout + focus effects
    requestAnimationFrame(() => scrollAllToTop());
    setTimeout(() => scrollAllToTop(), 0);
    setTimeout(() => scrollAllToTop(), 50);
    setTimeout(() => scrollAllToTop(), 200);
  }, [pathname]);

  return null;
}
