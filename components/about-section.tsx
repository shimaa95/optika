import SplitLayoutHero from './SplitLayoutHero';

export function AboutSection() {
  return (
    <SplitLayoutHero

      imageSrc="/eyewear-group.jpg"
      imageAlt="Diverse group of people wearing stylish eyeglasses"
      tagline={`We Help See Better`}
      heading={`EYEWEAR\nPRODUCTS AND\nOPHTHALMIC\nCARE\nSOLUTIONS`}
      description="Optika is a Provider and Distributor of Exclusive and advanced Digital Lenses, Ophthalmic care products, and Premium Eyewear Solutions."
      buttonLabel="Discover Optika" pageName="about"
    />
  );
}
