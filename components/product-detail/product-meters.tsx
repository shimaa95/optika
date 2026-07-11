"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ensureGsap } from "@/lib/gsap"
import type { ProductDetailData } from "@/lib/products/product-detail"

ensureGsap()

interface ProductMetersProps {
  meters: ProductDetailData["meters"]
}

export function ProductMeters({ meters }: ProductMetersProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const barRefs = useRef<(HTMLDivElement | null)[]>([])
  const hasAnimated = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[]
    const bars = barRefs.current.filter(Boolean) as HTMLDivElement[]

    if (rows.length === 0 || bars.length === 0) return

    const ctx = gsap.context(() => {
      gsap.set(bars, { width: "0%", transformOrigin: "left center" })
      gsap.set(rows, { opacity: 0, x: -16 })

      const playAnimation = () => {
        if (hasAnimated.current) return
        hasAnimated.current = true

        const tl = gsap.timeline()
        tl.to(rows, {
          opacity: 1,
          x: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power2.out",
        }).to(
          bars,
          {
            width: (index) => `${meters[index]?.value ?? 0}%`,
            duration: 1,
            stagger: 0.14,
            ease: "power2.out",
          },
          "-=0.2",
        )
      }

      ScrollTrigger.create({
        trigger: container,
        start: "top 88%",
        end: "bottom 20%",
        onEnter: playAnimation,
        once: true,
      })

      // If already in view on load (e.g. short viewport / deep link)
      const rect = container.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.88 && rect.bottom > 0
      if (inView) playAnimation()
    }, container)

    return () => {
      ctx.revert()
      hasAnimated.current = false
    }
  }, [meters])

  return (
    <div ref={containerRef} className="mt-10 space-y-4 sm:mt-12">
      {meters.map((meter, index) => (
        <div
          key={meter.label}
          ref={(el) => {
            rowRefs.current[index] = el
          }}
          className="grid grid-cols-[120px_1fr] items-center gap-4 sm:grid-cols-[140px_1fr]"
        >
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-text-dark sm:text-[13px]">
            {meter.label}
          </span>
          <div className="h-[18px] overflow-hidden border border-primary-green bg-white p-[2px]">
            <div
              ref={(el) => {
                barRefs.current[index] = el
              }}
              className="h-full w-0 bg-primary-green"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
