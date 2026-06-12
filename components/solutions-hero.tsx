"use client";

import { ArrowDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface SolutionsHeroProps {
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  eyebrowText?: string;
  title?: React.ReactNode;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function SolutionsHero({
  imageSrc = "/solutions-hero.jpg", // Adjust to actual solutions image path
  imageAlt = "Modern office workspace for optical solutions",
  imagePosition = "50% 20%",
  eyebrowText = "Our Story",
  title = (
    <>
      EXCEPTIONAL
      <br />
      OPTICAL
      <br />
      SOLUTIONS
    </>
  ),
  description = "Total support for partners across",
  ctaText = "Learn More",
  ctaHref = "#details",
}: SolutionsHeroProps) {
  return (
    <section className="lg:px-26 2xl:px-50 relative min-h-screen 2xl:min-h-[70vh] 2xl:h-[70vh] w-full">
      {/* Hero Image */}
      <div className="absolute inset-0 min-h-screen 2xl:h-[70vh] 2xl:min-h-[70vh]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          style={{ objectPosition: imagePosition }}
          fill
          className="object-cover"
          priority
        />
        {/* Subtle Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content Container - Mirrored from Home Hero */}
      <div className="relative mx-auto flex min-h-screen 2xl:min-h-[70vh] 2xl:h-[70vh] items-end 2xl:items-center 2xl:pt-40 ml-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20" style={{ bottom: '15vh' }}>
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Spacer for layout balance on large screens */}
          <div className="hidden lg:block" />

          {/* Text Content - Using White Theme for dark background */}
          <div className="z-10 flex flex-col justify-center py-12 md:py-0 pl-0 lg:pl-20 lg:py-0">
            {/* Eyebrow text */}
            {eyebrowText && (
              <p
                className="mb-4 text-white/70 sm:mb-6 text-[9px] sm:text-[10px] lg:text-xs tracking-[0.11em] leading-[135%] font-playfair font-normal uppercase"
              >
                {eyebrowText}
              </p>
            )}

            {/* Main Heading */}
            {title && (
              <h1
                className="mb-6 text-white sm:mb-8 relative z-10 text-[32px] sm:text-[40px] md:text-[40px] lg:text-[50px] xl:text-[56px] font-bold leading-[0.98] tracking-[-0.03em] uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                }}
              >
                {title}
              </h1>
            )}

            {/* Description */}
            {description && (
              <p
                className="mb-8 max-w-md text-white/70 sm:mb-10 md:max-w-lg lg:max-w-md xl:max-w-lg text-[13px] sm:text-sm lg:text-base leading-[150%] tracking-[0.02em]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
              >
                {description}
              </p>
            )}

            {/* CTA Button */}
            {ctaText && ctaHref && (
              <Link
                href={ctaHref}
                className="group inline-flex w-fit items-center gap-3 text-sm font-medium text-white transition-colors hover:text-white/80 sm:text-base lg:text-[16px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center bg-white text-black transition-colors group-hover:bg-gray-200">
                  <ArrowDown className="h-3 w-3 sm:h-4 sm:w-4" />
                </span>
                <span>{ctaText}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
