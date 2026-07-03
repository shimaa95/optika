import { AnimateInView } from "@/components/product-detail/animate-in-view"

export function ProductBuiltInTechnology() {
  return (
    <AnimateInView delay={0.05} className="mt-12 flex min-h-[48px] items-center gap-4 pt-12 sm:pt-14">
      <p className="mr-4 whitespace-nowrap text-[13px] font-medium text-text-dark sm:text-[14px]">
        Built in Technology
      </p>
      <div className="inline-flex items-center justify-center  bg-neutral-100 px-5 py-2 text-[13px] font-normal tracking-wide text-black/80 sm:text-[14px]">
        Custom form
      </div>
    </AnimateInView>
  )
}
