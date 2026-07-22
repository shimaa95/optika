import Image from "next/image"
import { Fragment } from "react"
import { urlFor } from "@/sanity/lib/image"

export function PerformanceSection({
  headline,
  backgroundImage,
}: {
  headline?: string
  backgroundImage?: unknown
} = {}) {
  const defaultHeadline =
    "Designed to perform\nwell today and\nremain adaptable\ntomorrow."
  const resolvedHeadline = headline?.trim() || defaultHeadline
  const imageSrc = backgroundImage
    ? urlFor(backgroundImage).width(2000).url()
    : "/pr.jpeg"
  const imageAlt =
    backgroundImage != null
      ? "Performance section background"
      : "Professional team in a modern office boardroom"

  // Mobile and desktop variants of the headline: when there are
  // explicit newlines, render them as <br/> on desktop; on mobile,
  // collapse to a single line. When the string is a single line
  // (no newlines), use it as-is on both.
  const desktopLines = resolvedHeadline.split("\n")
  const mobileLine = resolvedHeadline.replace(/\n/g, " ")

  return (
    <section className="relative h-[60vh]   w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Centered Content */}
      <div className="hidden lg:block relative z-10 w-full max-w-[30%] lg:max-w-[60%]  text-center   px-8">
        <h2
          className="text-white font-inter  uppercase tracking-normal font-inter
                     text-[32px]  font-bold
                     leading-[1.1]"
          style={{ textShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
        >
          {desktopLines.map((line, i) => (
            <Fragment key={i}>
              {line}
              {i < desktopLines.length - 1 && (
                <br className="hidden sm:block" />
              )}
            </Fragment>
          ))}
        </h2>
      </div>

      {/* Mobile Content */}
      <div className="lg:hidden relative z-10 w-full max-w-[90%] text-center px-4">
        <h2
          className="text-white font-inter uppercase tracking-normal font-inter
                     text-[32px] font-bold
                     leading-[1.1]"
          style={{ textShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
        >
          {mobileLine}
        </h2>
      </div>
    </section>
  )
}
