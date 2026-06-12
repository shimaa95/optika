import type { ProductDetailData } from "@/lib/products/product-detail"

interface ProductHeaderProps {
  name: ProductDetailData["name"]
  subtitle: ProductDetailData["subtitle"]
}

export function ProductHeader({ name, subtitle }: ProductHeaderProps) {
  return (
    <section className="relative z-10 flex min-h-[clamp(200px,28vh,280px)] w-full">
      {/* Green block — diagonal top edge slopes up toward the right */}
      <div
        className="relative flex min-h-[clamp(200px,28vh,280px)] w-[58%] shrink-0 items-center bg-primary-green sm:w-[56%] lg:w-[54%]"
        style={{
          clipPath: "polygon(0 14%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      >
        <div className="px-6 py-10 sm:px-10 lg:px-[120px] lg:py-12">
          <h2 className="text-[clamp(1.85rem,3.8vw,3rem)] font-bold uppercase leading-[1.02] tracking-[0.03em] text-white">
            {name}
          </h2>
          <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.24em] text-white sm:text-[12px]">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Light panel behind the lens graphic */}
      <div className="min-h-[clamp(200px,28vh,280px)] flex-1 bg-table-gray" aria-hidden />
    </section>
  )
}
