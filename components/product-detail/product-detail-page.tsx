import { ContactGrid } from "@/components/product-detail/contact-grid"
import { NextProductFooter } from "@/components/product-detail/next-product-footer"
import { ProductDetailsSection } from "@/components/product-detail/product-details-section"
import { ProductHero } from "@/components/product-detail/product-hero"
import type { ProductDetailData } from "@/lib/products/product-detail"
import { ContactSection } from "../contact-section"
import { Footer } from "../footer"

interface ProductDetailPageProps {
  product: ProductDetailData
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  return (
    <main className="bg-bg-light font-[family-name:var(--font-inter)] text-text-dark">
      <ProductHero
        hero={product.hero}
        name={product.name}
        subtitle={product.subtitle}
        lensGraphic={product.lensGraphic}
        themeColor={product.themeColor}
      />

      <ProductDetailsSection product={product} themeColor={product.themeColor} />

      <ContactSection themeColor={product.themeColor} />
      <NextProductFooter
        sequenceNumber={product.sequenceNumber}
        name={product.name}
        subtitle={product.subtitle}
        footer={product.footer}
        nextProduct={product.nextProduct}
      /> <Footer />
    </main>
  )
}
