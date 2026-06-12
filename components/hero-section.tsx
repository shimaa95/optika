import React from 'react';
import HeroCTA from './HeroCTA';
import Tagline from './Tagline';
import Headline from './Headline';
import Description from './Description';
import HeroBackground from './HeroBackground';
import { HeroProps } from './HeroProps';

const defaultConfig: Partial<HeroProps> = {
  imageSrc: '/hero.jpg',
  imageAlt: 'Premium optical lenses showcasing modern eyecare technology',
  imagePosition: '50% 20%',
  title: (
    <>
      HIGH-END
      <br />
      LENSES
      <br />
      FOR MODERN
      <br />
      EYECARE
    </>
  ),
  description: 'Optika delivers to you Premium Digital Lenses and Solutions manufactured to the highest standards.',
  ctaText: 'Learn More',
  theme: 'light', size: 'lg',
  TaglineclassaName: 'max-w-2'
};

// Sensible layout fallbacks — callers override these via config
const LAYOUT_DEFAULTS = {
  sectionClassName: 'lg:px-24 2xl:px-36 relative min-h-[70vh] [70vh] w-full overflow-hidden px-6',
  containerClassName: 'relative mx-auto flex h-screen  2xl:h-[70vh] items-end justify-end  ml-0 px-0 sm:px-8 md:px-16 lg:px-24 xl:px-32 ',
  containerStyle: { bottom: '8vh' } as React.CSSProperties,
  textContainerClassName: 'z-10 flex flex-col   justify-center py-8 md:py-0 pl-0 lg:mr-16 lg:mb-6 2xl:mb-0 2xl:pl-0 2xl:mr-50 lg:py-0',
};

const TEXT_ALIGN_MAP = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;


export function HeroSection({ config = {} }: { config?: Partial<HeroProps> }) {
  const props = { ...defaultConfig, ...config };

  const sectionClassName = props.sectionClassName || LAYOUT_DEFAULTS.sectionClassName;
  const containerClassName = props.containerClassName || LAYOUT_DEFAULTS.containerClassName;
  const containerStyle = props.containerStyle || LAYOUT_DEFAULTS.containerStyle;
  const textContainerClassName = props.textContainerClassName || LAYOUT_DEFAULTS.textContainerClassName;
  const textAlignClass = TEXT_ALIGN_MAP[props.textAlign || 'left'];
  const size = props.size || 'lg';

  return (
    <section className={sectionClassName}>
      {props.imageSrc && (
        <HeroBackground
          src={props.imageSrc}
          alt={props.imageAlt || ''}
          position={props.imagePosition || 'center'}
          overlayClassName={props.overlayClassName}
        />
      )}
      <div className={containerClassName} style={containerStyle}>
        <div className={textContainerClassName}>
          <div className={textAlignClass}>
            {props.tagline && <Tagline text={props.tagline} theme={props.theme} className={props.TaglineclassaName} />}
            {props.title && <Headline theme={props.theme} >{props.title}</Headline>}
            {props.description && <Description text={props.description} theme={props.theme} />}
          </div>
          {props.customCta
            ? props.customCta
            : (props.ctaText && props.ctaHref && (
              <HeroCTA
                text={props.ctaText}
                href={props.ctaHref}
                className={props.ctaClassName}
                variant={props.theme}
              />
            ))
          }
        </div>
      </div>
    </section>
  );
}
