import { client } from '@/sanity/lib/client'
import { SHARED_SOLUTIONS_GRID_QUERY, SHARED_FOOTER_QUERY } from '@/sanity/lib/queries'
import Solutions from "@/components/Solutions"
import { LuxuryHero } from "@/components/luxury-hero"
import { SolutionsIntroSection } from "@/components/solutions-intro-section"
import { BuiltInTechnologies } from "@/components/built-in-technologies"
import { InnovativeToolsBanner } from "@/components/innovative-tools-banner"
import {  SolutionsGridSection } from "@/components/SolutionsDetailSection"
import { PerformanceSection } from "@/components/performance-section"
import FilterLensesSection from "@/components/filter-lenses-section"
import { SharedFooter } from "@/components/shared-footer"

const SHOWCASE_SLIDES = [
  {
    id: "digital-freeform",
    category: "Digital",
    series: "DIGITAL SERIES - 1.67 INDEX",
    productName: "Digital Freeform",
    price: "$189.00",
    rating: 5,
    description:
      "Personalised digital surfacing technology that maps the exact position of the eye relative to the frame for razor-sharp vision at every angle.",
    sizes: ["1.50", "1.60", "1.67", "1.74"],
    image: "/solutions-digital-len.png",
    imageAlt: "Digital Freeform lens with precision surfacing detail",
  },
  {
    id: "single-vision",
    category: "Classic",
    series: "CORE SERIES - 1.50 INDEX",
    productName: "Single Vision",
    price: "$79.00",
    rating: 4,
    description:
      "Reliable, optically pure single-vision lenses engineered for everyday comfort and clarity with minimal distortion across the entire surface.",
    sizes: ["1.50", "1.60", "1.67"],
    image: "/single-vision.jpeg",
    imageAlt: "Single vision lens product photography",
  },
  {
    id: "progressive-elite",
    category: "Premium",
    series: "ELITE SERIES - VARIFOCAL",
    productName: "Progressive Elite",
    price: "$249.00",
    rating: 5,
    description:
      "Advanced progressive design with wider corridor geometry and reduced peripheral swim for seamless near-to-far adaptation.",
    sizes: ["1.60", "1.67", "1.74"],
    image: "/products.jpeg",
    imageAlt: "Progressive Elite premium varifocal lens",
  },
];

export default async function SolutionsPage() {
  const [sharedGridData, footerData] = await Promise.all([
    client.fetch(SHARED_SOLUTIONS_GRID_QUERY, {}, { next: { revalidate: 60 } }),
    client.fetch(SHARED_FOOTER_QUERY, {}, { next: { revalidate: 3600 } }),
  ])

  return (
<> <div className="bg-[#f4f6f8] flex flex-col gap-32"> <div className="flex flex-col gap-32 bg-[#f4f6f8]">    <LuxuryHero
        imageSrc="/Rectangle.png"
        imageAlt="Optika premium optical solutions"
        imagePosition="50% 40%"
        tagline="Our Solutions"
        title={
          <>
            EXCEPTIONAL
            <br />
            OPTICAL
            <br />
            SOLUTIONS
          </>
        }
        description="Total support for partners and opticians across every touch-point."
      />

      <SolutionsIntroSection
        taglineLogo="/1Black.svg"
        description="Optika equips clinics and independent stores with personalised lenses and an ordering flow designed to reduce remakes and improve patient outcomes."

      />
</div>
      <BuiltInTechnologies />
      <FilterLensesSection />

      <Solutions className="px-6 lg:px-20 xl:px-24 2xl:px-50" />
      <div className="flex flex-col  gap-32 bg-white"> 

      <InnovativeToolsBanner />



      <SolutionsGridSection data={sharedGridData} />
      <PerformanceSection />

      <div className="flex flex-col bg-white "> 
                  <SharedFooter data={footerData} /> </div></div></div>
    </>
  );
}

