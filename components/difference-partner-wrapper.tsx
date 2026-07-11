"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ensureGsap } from "@/lib/gsap"

export function DifferencePartnerWrapper({
  difference,
  partner,
}: {
  difference: React.ReactNode
  partner: React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const differenceRef = useRef<HTMLDivElement>(null)
  const partnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ensureGsap()

    const ctx = gsap.context(() => {
      if (!containerRef.current || !partnerRef.current || !differenceRef.current) return

      // --- SCROLL-DRIVEN PARALLAX & STACKING PREPARATION ---

      // Parallax: move Difference video slightly as the container scrolls through viewport
      // This creates a creative depth effect without interfering with playback
      const videoEl = differenceRef.current.querySelector("video")
      if (videoEl) {
        gsap.fromTo(
          videoEl,
          { y: 50 },
          {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        )
      }

      // As the wrapper scrolls over the sticky About section,
      // dim / recede the About section so the new card on top feels dominant
      const aboutSection = document.getElementById("about")
      if (aboutSection) {
        gsap.fromTo(
          aboutSection,
          { filter: "brightness(1)", scale: 1 },
          {
            filter: "brightness(0.35)",
            scale: 0.96,
            transformOrigin: "center top",
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "top top",
              scrub: 1,
            },
          }
        )

        // Creative parallax: About image drifts upward for depth
        const aboutImage = aboutSection.querySelector("img")
        if (aboutImage) {
          gsap.fromTo(
            aboutImage,
            { y: 40, scale: 1.05 },
            {
              y: -40,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "top top",
                scrub: 1.5,
              },
            }
          )
        }

        // Creative parallax: About text drifts slightly for layered depth
        const aboutText = aboutSection.querySelector("h2, p")
        if (aboutText) {
          gsap.fromTo(
            aboutText,
            { y: 15 },
            {
              y: -15,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "top top",
                scrub: 2,
              },
            }
          )
        }
      }

      // --- PINNED STACKING TIMELINE (Difference -> Partner) ---

      // Give the Difference "card" an initial subtle shadow so it already feels
      // like a physical layer sitting above About
      gsap.set(differenceRef.current, {
        transformOrigin: "center top",
        boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
      })

      // Partner starts fully off-screen (below), slightly scaled down,
      // invisible, with a pronounced top shadow and rounded corners for a card look
      gsap.set(partnerRef.current, {
        yPercent: 100,
        scale: 0.92,
        opacity: 0,
        borderRadius: "32px",
        boxShadow: "0 -40px 80px rgba(0,0,0,0.65)",
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      })

      // 1. MAIN STACK: Partner card slides up and covers Difference card
      tl.to(
        partnerRef.current,
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          borderRadius: "0px",
          ease: "power2.out",
          duration: 1,
        },
        0
      )

      // 2. PARALLAX叠化: Difference recedes underneath — scale down, dim, round corners
      tl.to(
        differenceRef.current,
        {
          scale: 0.9,
          filter: "brightness(0.45)",
          borderRadius: "24px",
          ease: "power2.out",
          duration: 1,
        },
        0
      )

      // 3. Parallax inside Partner image (Next/Image fill equivalent = <img>)
      const partnerImg = partnerRef.current.querySelector("img")
      if (partnerImg) {
        tl.fromTo(
          partnerImg,
          { y: 40, scale: 1.08 },
          { y: -20, scale: 1, ease: "none", duration: 1 },
          0
        )
      }

      // 4. CONTENT PARALLAX: partner text/content drifts slightly for depth
      const partnerText = partnerRef.current.querySelector("h2, p")
      if (partnerText) {
        tl.fromTo(
          partnerText,
          { y: 20 },
          { y: -10, ease: "none", duration: 1 },
          0
        )
      }

      // 5. Brief settle / hold so the pinned moment feels intentional
      tl.to({}, { duration: 0.35 })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative z-20 w-full bg-black">
      {/* Difference Section — treated as the lower card in this pair */}
      <div
        ref={differenceRef}
        className="relative z-10 w-full overflow-hidden bg-black will-change-transform"
      >
        {difference}
      </div>

      {/* Partner Section — animates in from below like a card stacking on top */}
      <div
        ref={partnerRef}
        className="absolute top-0 left-0 right-0 z-20 w-full overflow-hidden will-change-transform"
      >
        {partner}
      </div>
    </div>
  )
}
