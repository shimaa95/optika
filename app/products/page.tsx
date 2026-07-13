import FilterLensesSection from "@/components/filter-lenses-section"
import { SharedFooter } from "@/components/shared-footer"
import { FaqSection, faqs } from "@/components/faq-section"
import { client } from '@/sanity/lib/client'
import { SHARED_SOLUTIONS_GRID_QUERY, SHARED_FOOTER_QUERY } from '@/sanity/lib/queries'
import { LuxuryHero } from "@/components/luxury-hero"

import { ProductsRangeSection } from "@/components/products-range-section"
import { SolutionsGridSection } from "@/components/SolutionsDetailSection"

export default async function ProductsPage() {
  const [sharedGridData, footerData] = await Promise.all([
    client.fetch(SHARED_SOLUTIONS_GRID_QUERY, {}, { next: { revalidate: 60 } }),
    client.fetch(SHARED_FOOTER_QUERY, {}, { next: { revalidate: 3600 } }),
  ])
  return (
    <main className="min-h-screen flex flex-col gap-32 bg-white">
      <ProductsRangeSection />
      <FilterLensesSection />  <SolutionsGridSection data={sharedGridData} />
      <FaqSection faqs={faqs} />
      <SharedFooter data={footerData} />
    </main>
  )
}
