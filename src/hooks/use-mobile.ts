"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when viewport width is below the given breakpoint (default 768px).
 * Works on the client and updates on resize.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const getInitial = () =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false;

  const [isMobile, setIsMobile] = useState<boolean>(getInitial);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    // set once on mount
    setIsMobile(mq.matches);

    // add/remove listener (support older Safari)
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange as unknown as (this: MediaQueryList, ev: MediaQueryListEvent) => void);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange as unknown as (this: MediaQueryList, ev: MediaQueryListEvent) => void);
    };
  }, [breakpoint]);

  return isMobile;
}
