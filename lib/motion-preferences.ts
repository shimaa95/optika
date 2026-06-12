export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Scroll-lock after loader (ms). Skipped when reduced motion is on. */
export function reelScrollLockMs(isMobile: boolean): number {
  if (prefersReducedMotion()) return 0;
  return isMobile ? 2400 : 4200;
}
