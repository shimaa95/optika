import { ContactGrid } from "@/components/product-detail/contact-grid"
import { NextProductFooter } from "@/components/product-detail/next-product-footer"
import { ProductDetailsSection } from "@/components/product-detail/product-details-section"
import { ProductHero } from "@/components/product-detail/product-hero"
import { QuestionsBanner } from "@/components/product-detail/questions-banner"
import type { ProductDetailData } from "@/lib/products/product-detail"

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
      />

      <ProductDetailsSection product={product} />

      <QuestionsBanner
        title={product.questions.title}
        subtitle={product.questions.subtitle}
        imageSrc={product.questions.imageSrc}
        imageAlt={product.questions.imageAlt}
      />

      <ContactGrid contact={product.contact} />

      <NextProductFooter
        sequenceNumber={product.sequenceNumber}
        name={product.name}
        subtitle={product.subtitle}
        footer={product.footer}
        nextProduct={product.nextProduct}
      />
    </main>
  )
}
