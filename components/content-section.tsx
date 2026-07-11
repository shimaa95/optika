"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ensureGsap } from "@/lib/gsap"

interface ContentSectionProps {
  title: string
  description: string
  index: number
}

export function ContentSection({ title, description, index }: ContentSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Set initial states
    gsap.set([titleRef.current, descriptionRef.current], {
      opacity: 0,
      y: 60,
    })
    gsap.set(lineRef.current, {
      scaleX: 0,
    })

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none reverse",
      },
    })

    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 0.8,
      ease: "power2.out",
    })
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-6 py-24 "
    >
      <div className="max-w-2xl">
        {/* Decorative line */}
        <div
          ref={lineRef}
          className="mb-8 h-[1px] w-16 origin-left bg-white/40"
        />

        {/* Section number */}
        <span className="mb-4 block font-mono text-xs tracking-wider text-white/40">
          0{index + 1}
        </span>

        <h2
          ref={titleRef}
          className="mb-6 font-inter text-2xl font-light tracking-tight text-white md:text-3xl lg:text-4xl"
        >
          {title}
        </h2>

        <p
          ref={descriptionRef}
          className="font-inter text-sm leading-relaxed text-white/60 md:text-base lg:text-lg"
        >
          {description}
        </p>
      </div>
    </section>
  )
}
