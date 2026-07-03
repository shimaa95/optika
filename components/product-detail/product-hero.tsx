"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import type { ProductDetailData } from "@/lib/products/product-detail"
import HeroBackground from "../HeroBackground"

interface ProductHeroProps {
  hero: ProductDetailData["hero"]
  name: ProductDetailData["name"]
  subtitle: ProductDetailData["subtitle"]
  lensGraphic: ProductDetailData["lensGraphic"]
  themeColor: string
}

/** Bottom band geometry — matches 1920 comp */
const SLANT_LEFT_Y = 20
const SLANT_RIGHT_Y = 6

export function ProductHero({
  hero,
  name,
  subtitle,
  lensGraphic,
  themeColor,
}: ProductHeroProps) {
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = [eyebrowRef.current, headlineRef.current].filter(Boolean)
      gsap.fromTo(
        targets,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          delay: 0.15,
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative mx-auto h-[90vh] w-full ">
      {/* Upper photo */}
      <HeroBackground
        src={hero.backgroundSrc}
        alt={hero.backgroundAlt}
        position={hero.backgroundPosition}
      />

      {/* Product name — bottom-left in theme banner */}
      <div
        className="absolute bottom-0 left-0 w-full z-10 px-6 lg:px-26 xl:px-50 pb-6 pt-6"
        style={{ backgroundColor: themeColor }}
      >
        <h2 className="text-[36px] font-bold capitalize leading-[1.02] tracking-[0.03em] text-white xl:text-[40px]">
          {name.toLowerCase()}
        </h2>
        <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.24em] text-white sm:text-[12px] xl:text-[14px] xl:tracking-[0.26em]">
          {subtitle}
        </p>
      </div>

      {/* Lens graphic — right, overlaps diagonal */}
      <div
        className="pointer-events-none absolute -bottom-10 right-[45%] z-20 w-[min(56vw,480px)] sm:right-[15%] sm:w-[min(52vw,340px)] lg:right-[6%] lg:w-87 xl:right-[6%] xl:min-w-[500px]"
        aria-hidden
      >
        <Image
          src={lensGraphic.imageSrc}
          alt={lensGraphic.imageAlt}
          width={800}
          height={454}
          className="xl:h-[350px] xl:w-[500px] w-full h-full translate-y-[14%] object-cover object-bottom sm:translate-y-[12%] lg:translate-y-[11%] xl:translate-y-[10%]"
          sizes="(max-width: 1024px) 52vw, (max-width: 1535px) 1000px, 1200px"
          priority
          quality={100}
        />
      </div>
    </section>
  )
}
