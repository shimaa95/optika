import FilterLensesSection from "@/components/filter-lenses-section"
import { ContactSection } from "@/components/contact-section"
import { FaqSection, faqs } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { ProductsRangeSection } from "@/components/products-range-section"
import { SolutionsGridSection } from "@/components/SolutionsDetailSection"

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-black">
      <ProductsRangeSection />
      <FilterLensesSection />  <SolutionsGridSection />
      <FaqSection faqs={faqs} />
      <ContactSection />
      <Footer />
    </main>
  )
}
