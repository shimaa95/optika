import * as React from "react"
import { cn } from "@/lib/utils"

export function HeroSubheading({ subheading, className }: { subheading?: React.ReactNode; className?: string }) {
  if (!subheading) return null

  return (
    <h3 className={cn("text-sm md:text-base font-semibold tracking-widest uppercase text-neutral-500 dark:text-neutral-400", className)}>
      {subheading}
    </h3>
  )
}

export function HeroHeadline({ headline, className }: { headline?: React.ReactNode; className?: string }) {
  if (!headline) return null

  // Gary UI Style: high typographic contrast, mathematical 8px alignment, heavy/bold impact weight, off-black text
  return (
    <h1 className={cn("mt-4 text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#111111] dark:text-neutral-50", className)}>
      {headline}
    </h1>
  )
}

export function HeroParagraph({ paragraph, className }: { paragraph?: React.ReactNode; className?: string }) {
  if (!paragraph) return null

  // Gary UI Style: premium lighter weights, soft colors
  return (
    <p className={cn("mt-8 text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-3xl", className)}>
      {paragraph}
    </p>
  )
}

export function HeroCTA({ children, className }: { children?: React.ReactNode; className?: string }) {
  if (!children) return null

  // MT-8 provides the 8px alignment grid spacing
  return (
    <div className={cn("mt-8 flex flex-col sm:flex-row items-center gap-4", className)}>
      {children}
    </div>
  )
}
