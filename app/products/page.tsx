import FilterLensesSection from "@/components/filter-lenses-section"
import { SharedFooter } from "@/components/shared-footer"
import { FaqSection } from "@/components/faq-section"
import { sanityFetch } from '@/sanity/lib/live'
import { SHARED_SOLUTIONS_GRID_QUERY, SHARED_FOOTER_QUERY, PRODUCTS_PAGE_QUERY } from '@/sanity/lib/queries'
import { LuxuryHero } from "@/components/luxury-hero"

import { ProductsRangeSection } from "@/components/products-range-section"
import { SolutionsGridSection } from "@/components/SolutionsDetailSection"

export default async function ProductsPage() {
  const [
    { data: sharedGridData },
    { data: footerData },
    { data: productsData },
  ] = await Promise.all([
    sanityFetch({ query: SHARED_SOLUTIONS_GRID_QUERY }),
    sanityFetch({ query: SHARED_FOOTER_QUERY }),
    sanityFetch({ query: PRODUCTS_PAGE_QUERY }),
  ])

  return (
    <main className="min-h-screen flex flex-col gap-32 bg-white">
      <ProductsRangeSection
        eyebrow={productsData?.rangeEyebrow}
        headline={productsData?.rangeHeadline}
        ranges={productsData?.productRanges}
      />
      <FilterLensesSection />
      <SolutionsGridSection data={sharedGridData} />
      <FaqSection
        faqs={productsData?.faqs?.faqs ?? []}
        subheading={productsData?.faqs?.subheading}
      />
      <SharedFooter data={footerData} />
    </main>
  )
}
