"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

/**
 * Custom React hook to implement a premium GSAP ScrollTrigger sticky stacking animation
 * for the about, difference, and partners sections on the homepage.
 *
 * It uses gsap.matchMedia() to target desktop screens (min-width: 1024px) for the sticky effect,
 * while allowing standard scroll behavior on mobile/tablet screens for perfect responsiveness.
 */
export function useStickySections(isReady: boolean = true) {
  useEffect(() => {
    // Only run on the client side when elements are ready and mounted
    if (typeof window === "undefined" || !isReady) return

    gsap.registerPlugin(ScrollTrigger)

    // Match media query to ensure the pinning is desktop-only (>= 1024px)
    // On smaller screens, standard vertical layout is preserved to prevent content overlap or truncation.
    const mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      const sections = ["#about", "#difference", "#partners"]

      sections.forEach((selector, index) => {
        const element = document.querySelector(selector) as HTMLElement
        if (!element) return

        const isLast = index === sections.length - 1

        // Do not pin the final section. It should scroll away naturally, 
        // dragging the rest of the page with it to avoid a "scroll pause"
        if (isLast) return;

        // 1. Pin the section at the top
        // pinSpacing: false allows the next section to smoothly overlap it
        ScrollTrigger.create({
          trigger: element,
          start: "top top",
          end: "+=100%", // Pin for exactly one screen height of scrolling
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        })


      })
    })

    // Cleanup all matchMedia observers and animations on component unmount
    return () => {
      mm.revert()
    }
  }, [isReady])
}
