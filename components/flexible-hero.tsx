"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type TextPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface FlexibleHeroProps {
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  textPosition?: TextPosition;
  eyebrowText?: string;
  title: React.ReactNode;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
}

const positionMap: Record<TextPosition, string> = {
  "top-left": "top-12 left-12 items-start text-left",
  "top-center": "top-12 left-1/2 -translate-x-1/2 items-center text-center",
  "top-right": "top-12 right-12 items-end text-right",
  "center-left": "top-1/2 -translate-y-1/2 left-12 items-start text-left",
  "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center text-center",
  "center-right": "top-1/2 -translate-y-1/2 right-12 items-end text-right",
  "bottom-left": "bottom-12 left-12 items-start text-left",
  "bottom-center": "bottom-12 left-1/2 -translate-x-1/2 items-center text-center",
  "bottom-right": "bottom-12 right-12 items-end text-right",
};

export function FlexibleHero({
  imageSrc = "/hero.jpg",
  imageAlt = "Hero background image",
  imagePosition = "center",
  textPosition = "center",
  eyebrowText,
  title,
  description,
  ctaText,
  ctaHref,
  className,
  contentClassName,
  overlayClassName,
}: FlexibleHeroProps) {
  return (
    <section
      className={cn(
        "relative w-full min-h-screen overflow-hidden flex items-center justify-center",
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          style={{ objectPosition: imagePosition }}
        />
        {/* Optional Overlay for readability */}
        <div className={cn("absolute inset-0 bg-black/20", overlayClassName)} />
      </div>

      {/* Flexible Content Container */}
      <div
        className={cn(
          "absolute z-10 flex flex-col transition-all duration-500 px-6 md:px-12 lg:px-20",
          positionMap[textPosition],
          contentClassName
        )}
      >
        {eyebrowText && (
          <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-80">
            {eyebrowText}
          </p>
        )}

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          {title}
        </h1>

        {description && (
          <p className="text-lg md:text-xl max-w-xl mb-8 opacity-90">
            {description}
          </p>
        )}

        {ctaText && ctaHref && (
          <Link
            href={ctaHref}
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider hover:opacity-80 transition-opacity"
          >
            <span className="flex h-8 w-8 items-center justify-center bg-white text-black rounded-full transition-transform group-hover:scale-110">
              <ArrowDown className="h-4 w-4 animate-scroll-down" />
            </span>
            <span>{ctaText}</span>
          </Link>
        )}
      </div>
    </section>
  );
}
