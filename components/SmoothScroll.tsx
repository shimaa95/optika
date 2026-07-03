"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with valid v1 options
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Correctly wire Lenis scroll position into GSAP ScrollTrigger
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    // Keep ScrollTrigger in sync on every Lenis scroll event
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP ticker for frame-perfect sync
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      ScrollTrigger.scrollerProxy(document.documentElement, undefined as any);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
