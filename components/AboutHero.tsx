import { HeroSection } from './hero-section';
import { HeroProps } from './HeroProps';

const config: Partial<HeroProps> = {
  tagline: "Our Story",
  description: "Optika delivers to you Premium Digital Lenses and Solutions manufactured to the highest standards.",
  title: <>Exceptional <br />optical <br />solutions</>,
  imageSrc: '/about-hero.jpg',
  imageAlt: 'Modern office interior with natural lighting',
  sectionClassName: 'relative h-[75vh] w-full overflow-hidden',
  overlayClassName: 'bg-black/70',
  theme: 'dark',
  // Pin the text block to bottom-left, left edge aligns with navbar logo
  containerClassName: 'absolute bottom-0 left-0 w-full px-6 lg:px-20 xl:px-24 2xl:px-50 pb-10',
  textContainerClassName: 'z-10 flex flex-col items-start',
}

const heroLayout = {
  sectionClassName: 'relative h-[75vh] w-full overflow-hidden',
  gridClassName: 'grid h-full w-full grid-cols-12 gap-6 items-end px-6 lg:px-20 xl:px-24 2xl:px-50',
  textColClassName: 'col-span-12 lg:col-span-5 lg:col-start-1 z-10 lg:mb-10 xl:mb-20', // bg-red-500/10 is for debugging layout, remove in production
};

const AboutHero = () => {
  return (
    <HeroSection config={config} heroLayout={heroLayout} />
  );
};

export default AboutHero;
