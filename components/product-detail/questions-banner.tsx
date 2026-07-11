import { AnimateInView } from "@/components/product-detail/animate-in-view"

interface QuestionsBannerProps {
  title: string
  subtitle: string
  themeColor: string
}

export function QuestionsBanner({
  title,
  subtitle,
  themeColor,
}: QuestionsBannerProps) {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: themeColor }}>
      <AnimateInView className="relative z-10 flex min-h-[clamp(200px,28vw,320px)] flex-col items-start justify-center px-6 py-16 lg:px-20 xl:px-24 2xl:px-50">
        <h2 className="text-balance text-[32px] font-bold leading-tight text-white">
          {title}
        </h2>
        <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-white/85 sm:text-[15px]">
          {subtitle}
        </p>
      </AnimateInView>
    </section>
  )
}
