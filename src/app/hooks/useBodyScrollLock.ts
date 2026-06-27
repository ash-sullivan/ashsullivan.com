"use client";

import { useEffect } from "react";

/**
 * Prevents background page scroll while an overlay or modal is open.
 * Restores the previous overflow value on unmount.
 */
export function useBodyScrollLock() {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);
}
