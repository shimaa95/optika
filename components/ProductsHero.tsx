import React from 'react';
import { ArrowDown } from 'lucide-react';
import { HeroSection } from './hero-section';
import { HeroProps } from './HeroProps';
import ArrowButton from './ArrowButton';

const config: Partial<HeroProps> = {
  tagline: "We do our best",
  description: (
    <>
      Optoka delivers to you Premium lenses <br /> solutions across three professional lines. built <br /> according to highest standards and delivered <br />within 48 hours.
    </>
  ),
  title: (
    <>
      SO YOU NEVER<br />MISS A MOMENT
    </>
  ),
  imageSrc: '/products.jpeg',
  imageAlt: 'Modern office interior with natural lighting',
  sectionClassName: 'relative h-[80vh] xl:h-[70vh] w-full overflow-hidden',
  TaglineclassaName: 'max-w-sm',
  containerClassName: 'absolute bottom-0 left-0 w-full px-6  lg:px-20 xl:px-24 2xl:px-50 pb-16',
  textContainerClassName: 'z-10 flex flex-col items-start',
  containerStyle: {},
  theme: 'dark',
  customCta: (
    <ArrowButton
      label=" "
      href="#"
      icon={ArrowDown}
      variant="light"
      className="mt-6"
    />
  ),
}

const ProductsHero = () => {
  return (
    <HeroSection config={config} />
  );
};

export default ProductsHero;
