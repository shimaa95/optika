import { useState, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STACK_OFFSETS, VISIBLE_BEHIND, type LensCategory } from "@/lib/lens-categories.config";

gsap.registerPlugin(useGSAP, ScrollTrigger);

ScrollTrigger.config({
  ignoreMobileResize: true,
});

export function useLensCategories(categories: LensCategory[]) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasCompletedCarousel, setHasCompletedCarousel] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const total = categories.length;

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === 0) return total - 1;
      return prev - 1;
    });
  }, [total]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev === total - 1 ? 0 : prev + 1;
      if (next === 0 && prev === total - 1) {
        setHasCompletedCarousel(true);
      }
      return next;
    });
  }, [total]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // We use a very low threshold (1%) to ensure it fires even on tall mobile screens
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Animate images via clip-path
            gsap.fromTo(
              ".lens-image",
              {
                clipPath: "inset(100% 0% 0% 0%)",
                y: 40,
                scale: 0.9
              },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                y: 0,
                scale: 1,
                duration: 1.4,
                ease: "power4.out",
                stagger: 0.1,
              }
            );

            // Disconnect after triggering once
            observer.disconnect();
          }
        },
        { threshold: 0.4 }
      );

      // Pre-hide the images before observing
      gsap.set(".lens-image", { clipPath: "inset(100% 0% 0% 0%)" });
      observer.observe(sectionRef.current);

      return () => observer.disconnect();
    },
    { scope: sectionRef }
  );

  const getCardTransform = (index: number) => {
    let slot = (index - activeIndex + total) % total;
    const isActive = slot === 0;
    const slotBehind = slot <= VISIBLE_BEHIND ? slot : null;

    if (slotBehind === null) {
      return {
        transform: `translate(-50%, -50%) scale(0.85)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none" as const,
      };
    }

    const o = STACK_OFFSETS[slotBehind];
    return {
      transform: `translate(calc(-50% + ${o.x}px), calc(-50% + ${o.y}px)) scale(${o.scale}) rotate(${o.rotate}deg)`,
      opacity: o.opacity,
      zIndex: VISIBLE_BEHIND + 1 - slotBehind,
      pointerEvents: isActive ? ("auto" as const) : ("none" as const),
    };
  };

  return {
    activeIndex,
    hasCompletedCarousel,
    goToNext,
    goToPrevious,
    sectionRef,
    getCardTransform,
    total,
  };
}
