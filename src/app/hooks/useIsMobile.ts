"use client";

import { useEffect, useState } from "react";

const DEFAULT_MOBILE_BREAKPOINT = "(max-width: 767px)";

/**
 * Tracks whether the viewport matches a mobile breakpoint via matchMedia.
 * Defaults to false on the server and first client render (SSR-safe).
 */
export function useIsMobile(breakpoint = DEFAULT_MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(breakpoint);
    setIsMobile(mq.matches);
    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}
