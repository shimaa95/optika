import Image from "next/image"
import { AnimateInView } from "@/components/product-detail/animate-in-view"
import type { ProductDetailData } from "@/lib/products/product-detail"

interface ProductOverviewProps {
  idealFor: string
  characteristics: string
  meters: ProductDetailData["meters"]
  themeColor: string
}

export function ProductOverview({
  idealFor,
  characteristics,
  meters,
  themeColor,
}: ProductOverviewProps) {
  return (
    <AnimateInView className="flex flex-col">
      <div>
        <h3 className="text-[15px] font-bold text-text-dark sm:text-[20px]">
          Ideal for
        </h3>
        <p className="mt-3 max-w-xl text-[14px] leading-[1.5] text-text-dark sm:text-[15px]">
          {idealFor}
        </p>
      </div>

      <div className="mt-10 sm:mt-12">
        <h3 className="text-[15px] font-bold text-text-dark sm:text-[20px]">
          Characteristics
        </h3>
        <p className="mt-3 max-w-md text-[14px] leading-[1.5] text-text-dark sm:text-[15px]">
          {characteristics}
        </p>
      </div>

      <div className="mt-10 space-y-4 sm:mt-12 max-w-md">
        {meters.map((meter) => (
          <div
            key={meter.label}
            className="grid grid-cols-[120px_1fr] items-center gap-4 sm:grid-cols-[140px_1fr]"
          >
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-text-dark sm:text-[13px]">
              {meter.label}
            </span>
            <div className="h-[18px] border bg-white p-[2px]" style={{ borderColor: themeColor }}>
              <div
                className="h-full"
                style={{ width: `${meter.value}%`, backgroundColor: themeColor }}
              />
            </div>
          </div>
        ))}
      </div>

    </AnimateInView>
  )
}
