import ProductsHero from "@/components/ProductsHero"

import { ContactSection } from "@/components/contact-section"
import DiscoverLensesSection from "@/components/discover-lenses-section"
import { FaqSection, faqs } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { ProductsRangeSection } from "@/components/products-range-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">


      <ProductsRangeSection />      <FaqSection faqs={faqs} />
      <ContactSection />
      <Footer />
    </main>
  )
}
