"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ProductDetailNav } from "@/components/product-detail/product-detail-nav"
import type { ProductDetailData } from "@/lib/products/product-detail"

interface ProductHeroProps {
  hero: ProductDetailData["hero"]
  name: ProductDetailData["name"]
  subtitle: ProductDetailData["subtitle"]
  lensGraphic: ProductDetailData["lensGraphic"]
}

/** Bottom band geometry — matches 1920 comp */
const SLANT_LEFT_Y = 20
const SLANT_RIGHT_Y = 6

export function ProductHero({
  hero,
  name,
  subtitle,
  lensGraphic,
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
    <section className="relative mx-auto h-[100dvh] min-h-[100vh] w-full max-w-[1920px] bg-primary-green">
      {/* Upper photo */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 bottom-[28%] 2xl:bottom-[18%]"
      >
        <Image
          src={hero.backgroundSrc}
          alt={hero.backgroundAlt}
          fill
          priority
          className="object-cover"
          style={{
            objectPosition: hero.backgroundPosition ?? "center 32%",
          }}
          sizes="(max-width: 1920px) 100vw, 1920px"
        />
      </div>

      {/* Green bottom band */}
      <div
        className="absolute inset-x-0 bottom-0 z-[4] bg-primary-green h-[28%] 2xl:h-[18%]"
        style={{
          clipPath: `polygon(0 ${SLANT_LEFT_Y}%, 100% ${SLANT_RIGHT_Y}%, 100% 100%, 0 100%)`,
        }}
        aria-hidden
      />

      {/* Gray wedge — upper-left of bottom band */}
      <div
        className="absolute bottom-0 left-0 z-[6] bg-table-gray w-[50%] h-[28%] 2xl:h-[18%]"
        style={{
          clipPath: `polygon(0 0, 100% 0, 0 ${SLANT_LEFT_Y}%)`,
        }}
        aria-hidden
      />




      <ProductDetailNav />

      {/* Headline — middle-left over photo */}
      <div className="absolute left-0 top-[calc(80px+14vh)] z-10 max-w-[min(92vw,580px)] px-6 sm:top-[calc(80px+15vh)] sm:px-10 lg:top-[calc(80px+16vh)] lg:max-w-[520px] lg:px-[120px] xl:top-[calc(80px+17vh)] 2xl:top-[50%] 2xl:translate-y-1/2">
        <p
          ref={eyebrowRef}
          className="font-[family-name:var(--font-playfair)] text-[14px] italic leading-snug text-white sm:text-[15px] lg:text-[15px] 2xl:text-[16px]"
        >
          {hero.eyebrow}
        </p>
        <h1
          ref={headlineRef}
          className="mt-3 text-[clamp(1.875rem,4.2vw,3.625rem)] font-bold uppercase leading-[0.92] tracking-[0.02em] text-white lg:mt-4 lg:text-[clamp(2.25rem,3.2vw,3.625rem)] 2xl:text-[58px] 2xl:leading-[0.92]"
        >
          {hero.headline}
        </h1>
      </div>

      {/* Product name — bottom-left in green band */}
      <div className="absolute bottom-0 left-0 z-10 max-w-[min(92vw,520px)] px-6 pb-8 pt-4 sm:px-10 sm:pb-10 lg:px-[120px] lg:pb-12 2xl:pb-14">
        <h2 className="text-[clamp(1.375rem,2.8vw,2.625rem)] font-bold uppercase leading-[1.02] tracking-[0.03em] text-white 2xl:text-[42px]">
          {name}
        </h2>
        <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.24em] text-white sm:text-[11px] 2xl:text-[11px] 2xl:tracking-[0.26em]">
          {subtitle}
        </p>
      </div>

      {/* Lens graphic — right, overlaps diagonal */}
      <div
        className="pointer-events-none  absolute bottom-0 right-[45%] z-20 w-[min(56vw,480px)] sm:right-[5%] sm:w-[min(52vw,440px)] lg:right-[6%] lg:w-[420px] xl:right-[80px] xl:w-[460px] 2xl:mr-[7%] 2xl:w-[800px] "
        aria-hidden
      >
        <Image
          src={lensGraphic.imageSrc}
          alt={lensGraphic.imageAlt}
          width={600}
          height={341}
          className="h-auto w-full translate-y-[14%] object-cover object-bottom sm:translate-y-[12%] lg:translate-y-[11%] 2xl:translate-y-[10%]"
          style={{ width: "auto", height: "auto" }}
          sizes="(max-width: 1024px) 52vw, (max-width: 1535px) 1000px, 1200px"
          priority
        />
      </div>
    </section>
  )
}
