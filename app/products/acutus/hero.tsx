import { HeroSection } from "@/components/hero-section"
import { HeroProps } from "@/components/HeroProps"



const acutusConfig: HeroProps = {
  tagline: "Our Exclusive Range of Premium lenses",
  description: "Optoka delivers to you Premium lenses solutions across three professional lines built according to highest standards and delivered within 48 hours.",
  title: <>Acutus</>,
  imageSrc: '/actushero.png',
  imageAlt: 'Modern office interior with natural lighting',
  sectionClassName: 'relative h-[75vh] w-full overflow-hidden',
  theme: 'dark',
  // Pin the text block to bottom-left, left edge aligns with navbar logo
  containerClassName: 'absolute bottom-0 left-0 w-full px-6 lg:px-26 xl:px-50 pb-10',
  textContainerClassName: 'z-10 flex flex-col items-start',
  containerStyle: {},
  TaglineclassaName: "max-w-[150px]"
}

export default function AcutusHeroSection() {
  return (

    <HeroSection config={acutusConfig} />



  )
}
