import Image from "next/image"
import { AnimateInView } from "@/components/product-detail/animate-in-view"

interface QuestionsBannerProps {
  title: string
  subtitle: string
  imageSrc: string
  imageAlt: string
}

export function QuestionsBanner({
  title,
  subtitle,
  imageSrc,
  imageAlt,
}: QuestionsBannerProps) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative min-h-[clamp(220px,32vw,380px)] w-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden />
        <AnimateInView className="relative z-10 flex min-h-[clamp(220px,32vw,380px)] flex-col items-center justify-center px-6 py-16 text-center sm:px-8">
          <h2 className="text-balance text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold leading-tight text-white">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-white/85 sm:text-[15px]">
            {subtitle}
          </p>
        </AnimateInView>
      </div>
    </section>
  )
}
