import { MainLayout } from "@/components/main-layout"
import { LuxuryHero } from "@/components/luxury-hero"
import { PowerfulLensesSection } from "@/components/transition/powerful-lenses-section"
import { BenefitsSection } from "@/components/transition/benefits-section"
import { SingleVisionSection } from "@/components/single-vision-section"
import { FaqSection, faqs } from "@/components/faq-section"
import { SharedFooter } from "@/components/shared-footer"
import { client } from '@/sanity/lib/client'
import { SHARED_FOOTER_QUERY } from '@/sanity/lib/queries'

export default async function SingleVisionPage() {
  const footerData = await client.fetch(SHARED_FOOTER_QUERY, {}, { next: { revalidate: 3600 } })
  return (
    <MainLayout>
      <div className="flex flex-col gap-32 bg-white">
        <LuxuryHero
          imageSrc="/hero.jpg"
          imageAlt="Single vision lenses showcase"
          imagePosition="50% 40%"
          tagline="Our Products"
          title={
            <>
              SINGLE VISION
              <br />
              LENSES
            </>
          }
          description="Advanced technology for all visions"
        />

        <PowerfulLensesSection
          title="Engineered for modern visual performance, Acutus Single Vision"
          description="Acutus Single Vision lenses deliver exceptional clarity, precise focus, and seamless visual comfort throughout the day."
        />

        <SingleVisionSection />

        <BenefitsSection
          title="Digital Freeform Technology"
          benefits={[
            {
              title: "Blue Light Protection",
              description:
                "Advanced filtering of harmful blue-violet light for healthier, more comfortable vision.",
            },
            {
              title: "Premium Anti Reflective Coatings",
              description:
                "Superior clarity and reduced glare with our high-performance anti-reflective treatment.",
            },
            {
              title: "Photochromic Options",
              description:
                "Seamlessly adapts from clear indoors to dark outdoors for ultimate visual comfort.",
            },
            {
              title: "Customized Visual Optimization",
              description:
                "Precisely tailored to your prescription and lifestyle for personalized clarity.",
            },
          ]}
        />

        <FaqSection faqs={faqs} />

        <SharedFooter data={footerData} />
      </div>
    </MainLayout>
  )
}
