import Image from "next/image"
import { AnimateInView } from "@/components/product-detail/animate-in-view"

export function ProductBuiltInTechnology() {
  return (
    <AnimateInView delay={0.05} className="mt-12 flex min-h-[48px] items-center gap-4 pt-12 sm:pt-14">
      <p className="whitespace-nowrap mr-4 text-[13px] font-medium text-text-dark sm:text-[14px]">
        Built in Technology
      </p>
      <Image
        src="/45.png"
        alt="Camber"
        width={300}
        height={60}
        className="block h-25 w-25 object-contain object-left"
        style={{ width: "120px", height: "auto" }}
        sizes="160px"
      />
    </AnimateInView>
  )
}
