import * as React from "react"
import { cn } from "@/lib/utils"
import { HeroSubheading, HeroHeadline, HeroParagraph, HeroCTA } from "./HeroElements"

interface HeroSectionProps {
  subheading?: React.ReactNode
  headline?: React.ReactNode
  paragraph?: React.ReactNode
  cta?: React.ReactNode
  className?: string
  contentClassName?: string
  align?: "left" | "center" | "right"
}

export function HeroSection({
  subheading,
  headline,
  paragraph,
  cta,
  className,
  contentClassName,
  align = "left",
}: HeroSectionProps) {
  // Mosh Code Style: The Total Flexibility Contract
  // Only render if at least one piece of content exists
  if (!subheading && !headline && !paragraph && !cta) return null

  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  }

  return (
    <section className={cn("w-full py-20 md:py-32", className)}>
      {/* Gary UI Style: Responsive Margin Alignment mirroring global site navigation */}
      <div className="mx-auto px-4 md:px-8 lg:px-20 w-full max-w-7xl">
        <div className={cn("flex flex-col", alignmentClasses[align], contentClassName)}>
          <HeroSubheading subheading={subheading} />
          <HeroHeadline headline={headline} />
          <HeroParagraph paragraph={paragraph} />
          <HeroCTA>{cta}</HeroCTA>
        </div>
      </div>
    </section>
  )
}
