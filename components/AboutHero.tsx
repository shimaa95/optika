
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
  containerClassName: 'absolute bottom-0 left-0 w-full px-6 lg:px-26 xl:px-50 pb-10',
  textContainerClassName: 'z-10 flex flex-col items-start',
  containerStyle: {},

}

const AboutHero = () => {
  return (
    <HeroSection config={config} />
  );
};

export default AboutHero;
