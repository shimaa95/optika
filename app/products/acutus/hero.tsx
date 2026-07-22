import { HeroSection } from "@/components/hero-section"
import { HeroProps } from "@/components/HeroProps"



const acutusConfig: HeroProps = {
  tagline: <>Our Exclusive<br />Range of<br />Premium lenses</>,
  description: "Optoka delivers to you Premium lenses solutions across three professional lines built according to highest standards and delivered within 48 hours.",
  title: <>Acutus</>,
  imageSrc: '/actushero.png',
  imageAlt: 'Modern office interior with natural lighting',
  sectionClassName: 'relative h-[75vh] w-full overflow-hidden',
  overlayClassName: 'bg-black/70',
  theme: 'dark',
  // Pin the text block to bottom-left, left edge aligns with navbar logo
  containerClassName: 'absolute bottom-0 left-0 w-full px-6 lg:px-20 xl:px-24 2xl:px-50 pb-10',
  textContainerClassName: 'z-10 flex flex-col items-start', TaglineclassaName:'max-w-xs',
  headlineClassName: 'max-w-7xl whitespace-nowrap',
}
const heroLayout = {
  sectionClassName: 'relative h-[75vh] w-full overflow-hidden',
  gridClassName: 'grid h-full w-full grid-cols-12 gap-6 items-end px-6 lg:px-20 xl:px-24 2xl:px-50',
  textColClassName: 'col-span-12 lg:col-span-5 lg:col-start-1 z-10 lg:mb-10 xl:mb-20',
};
export default function AcutusHeroSection() {
  return (

    <HeroSection config={acutusConfig} heroLayout={heroLayout} />



  )
}
