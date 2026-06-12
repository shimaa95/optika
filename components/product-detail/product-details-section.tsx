import { ProductBuiltInTechnology } from "@/components/product-detail/product-built-in-technology"
import { ProductOverview } from "@/components/product-detail/product-overview"
import { ProductSpecs } from "@/components/product-detail/product-specs"
import { ProductSpecsActions } from "@/components/product-detail/product-specs-actions"
import type { ProductDetailData } from "@/lib/products/product-detail"

interface ProductDetailsSectionProps {
  product: Pick<
    ProductDetailData,
    | "idealFor"
    | "characteristics"
    | "meters"
    | "specs"
    | "whyTitle"
    | "whyPoints"
    | "brochureUrl"
  >
}

export function ProductDetailsSection({ product }: ProductDetailsSectionProps) {
  return (
    <section className="bg-bg-light py-20 sm:py-24 lg:py-[120px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 2xl:max-w-[1600px] 2xl:px-[120px]">
        <div className="grid grid-cols-1 items-stretch gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-20 2xl:gap-32">
          <div className="flex flex-col 2xl:pr-[140px]">
            <ProductOverview
              idealFor={product.idealFor}
              characteristics={product.characteristics}
              meters={product.meters}
            />
            <ProductBuiltInTechnology />
          </div>

          <div className="flex flex-col 2xl:pr-[60px]">
            <ProductSpecs
              specs={product.specs}
              whyTitle={product.whyTitle}
              whyPoints={product.whyPoints}
            />
            <ProductSpecsActions brochureUrl={product.brochureUrl} />
          </div>
        </div>
      </div>
    </section>
  )
}
