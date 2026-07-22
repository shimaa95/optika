import { HeroSection } from './hero-section';
import { HeroProps } from './HeroProps';
import { urlFor } from '@/sanity/lib/image';

const FALLBACK: Partial<HeroProps> = {
 overlayClassName: 'bg-black/70'
}

interface AboutHeroData {
  tagline?: string
  headline?: string
  description?: string
  image?: unknown
}

const heroLayout = {
  sectionClassName: 'relative h-[75vh] w-full overflow-hidden',
  gridClassName: 'grid h-full w-full grid-cols-12 gap-6 items-end px-6 lg:px-20 xl:px-24 2xl:px-50',
  textColClassName: 'col-span-12 lg:col-span-5 lg:col-start-1 z-10 lg:mb-10 xl:mb-20',
};

const AboutHero = ({ data }: { data?: AboutHeroData } = {}) => {
  const config: Partial<HeroProps> = { ...FALLBACK }

  if (data?.image) {
    config.imageSrc = urlFor(data.image).width(2400).url()
  }
  if (data?.tagline?.trim()) {
    config.tagline = data.tagline
  }
  config.theme = 'dark'
  config.TaglineclassaName = 'text-white'

  if (data?.headline?.trim()) {
    // Headline comes from Sanity as a single string. Split into words
    // so each word renders on its own line in the About hero.
    const words = data.headline.split(/\s+/).filter((word) => word.length > 0)
    if (words.length > 0) {
      config.title = (
        <>
          {words.map((word, i) => (
            <span key={i} className="text-white block">
              {word}
            </span>
          ))}
        </>
      )
      config.headlineClassName = 'max-w-xs whitespace-nowrap text-white'
    }
  }
  if (data?.description?.trim()) {
    config.description = <span className="text-white">{data.description}</span>
  }

  return (
    <HeroSection config={config} heroLayout={heroLayout} />
  );
};

export default AboutHero;
