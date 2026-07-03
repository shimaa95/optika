import { MainLayout } from "@/components/main-layout"
import { LuxuryHero } from "@/components/luxury-hero"
import { PowerfulLensesSection } from "@/components/transition/powerful-lenses-section"
import { BenefitsSection } from "@/components/transition/benefits-section"
import { TransitionsBannerGrid } from "@/components/transition/transitions-banner-grid"
import { SingleVisionSection } from "@/components/single-vision-section"
import { PerformanceSection } from "@/components/performance-section"
import { FaqSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import SplitLayoutHero from "@/components/SplitLayoutHero"
import Succeed from "@/components/Succeed"
import { Eye, LayoutGrid, Sun, Palette } from "lucide-react"
import { DiscoverRangeSection } from "@/components/transition/DiscoverRangeSection"
import { Footer } from "@/components/footer"
import { SolutionsGridSection } from "@/components/SolutionsDetailSection"


const transitionFaqs = [
  {
    question: "Are Transitions lenses recommended?",
    answer: "Yes! Transitions lenses are recommended for anyone looking for the convenience of photochromic technology, offering seamless adaptation to changing light conditions."
  },
  {
    question: "What is photochromic?",
    answer: "Photochromic lenses contain special molecules that react to UV light, causing the lenses to darken outdoors and return to clear when indoors."
  },
  {
    question: "How do Transitions work?",
    answer: "Transitions lenses contain photochromic dyes that darken when exposed to ultraviolet (UV) rays from the sun, providing optimal vision and comfort."
  },
  {
    question: "Is there a warranty?",
    answer: "Yes, our Transitions lenses come with a standard warranty that covers manufacturing defects and guarantees the photochromic performance."
  },
  {
    question: "Are they good for driving?",
    answer: "Transitions lenses are great for everyday use, and certain ranges like Transitions XTRActive are specially designed to darken even behind the windshield of a car."
  },
  {
    question: "Are Transitions good for kids?",
    answer: "Absolutely. Children's eyes are more sensitive to UV light, making the 100% UV protection and blue light filtering of Transitions lenses ideal for them."
  },
  {
    question: "What are the benefits?",
    answer: "They provide 100% UV protection, filter harmful blue-violet light, reduce glare, and eliminate the need to constantly switch between prescription glasses and sunglasses."
  },
  {
    question: "Can I get them in my prescription?",
    answer: "Yes, Transitions lenses are compatible with most frame styles and can be made in almost any prescription, including single vision and progressives."
  }
]

export default function TransitionPage() {
  return (
    <>
      <LuxuryHero
        imageSrc="/eye.jpg"
        imageAlt="Cinematic close-up of an eye representing Transitions light intelligent lenses"
        imagePosition="50% 40%"
        tagline="Our Story" size="lg"
        title={
          <>
            TRANSITIONS&reg;
            <br />
            LIGHT
            <br />
            INTELLIGENT
            <br />
            LENSES
          </>
        }
        description="The world's #1 photochromic lenses"
      />
      <PowerfulLensesSection title="Light Intelligent Lenses" description=" Light-responsive lenses that adapt naturally to changing environments. Transition lenses help deliver effortless comfort indoors and outdoors, with powerful performance throughout the day."
      />
      <Succeed
        videoUrl="/transition2.mp4"
        SucceedHeader={false}
        boxes={[
          {
            icon: Eye,
            title: "Light Intelligent",
            description: "Automatically adjust to changing light conditions for optimal vision."
          },
          {
            icon: LayoutGrid,
            title: "Seamlessly adaptation",
            description: "Quickly fade back to clear indoors and darken outdoors."
          },
          {
            icon: Sun,
            title: "Block 100% of UVA and UVB",
            description: "Complete protection against harmful ultraviolet rays in all lighting."
          },
          {
            icon: Palette,
            title: "Personal style wide colour choices",
            description: "Available in multiple stylish colors to match your favorite frames."
          }
        ]}
      />

      <DiscoverRangeSection description="your eyes from UV and filtering blue-violet light, Transitions® lenses darken outdoors and clear indoors. Transitions® adapt naturally to changing environments." />
      <TransitionsBannerGrid />
      <SolutionsGridSection />
      <FaqSection
        faqs={transitionFaqs}
        subheading="Find Answers to Questions about the Transitions Lenses"
      />
      <ContactSection /> <Footer />
    </>
  )
}
