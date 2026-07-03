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
  themeColor: string
}

export function ProductDetailsSection({ product, themeColor }: ProductDetailsSectionProps) {
  return (
    <section className="bg-bg-light px-6 md:px-26 xl:px-50 py-20 sm:py-24 lg:py-[120px]">
      <div className=" ">
        <div className="grid grid-cols-1  gap-14 lg:grid-cols-2 justify-between w-full lg:gap-10 xl:gap-20">
          <div className="flex flex-col ">
            <ProductOverview
              idealFor={product.idealFor}
              characteristics={product.characteristics}
              meters={product.meters}
              themeColor={themeColor}
            />
            <ProductBuiltInTechnology />
          </div>

          <div className="flex flex-col ">
            <ProductSpecs
              specs={product.specs}
              whyTitle={product.whyTitle}
              whyPoints={product.whyPoints}
              themeColor={themeColor}
            />
            <ProductSpecsActions brochureUrl={product.brochureUrl} themeColor={themeColor} />
          </div>
        </div>
      </div>
    </section>
  )
}
