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
  theme: 'light', size: 'lg',
  TaglineclassaName: 'max-w-2'
};

// Sensible layout fallbacks — callers override these via config
const LAYOUT_DEFAULTS = {
  sectionClassName: 'lg:px-24 xl:px-36 relative min-h-[70vh] h-[100vh] w-full overflow-hidden px-6',
  containerClassName: 'relative mx-auto flex h-screen  lg:h-full   lg:items-center items-end justify-start md:justify-end  ml-0 px-0 sm:px-8 md:px-16 lg:px-24 xl:px-32 ',
  containerStyle: { bottom: '8vh' } as React.CSSProperties,
  textContainerClassName: 'z-10 flex flex-col   xl:self-end   py-10 md:py-0 pl-0 lg:mr-36 lg:mt-[200px] xl:mb-[20vh] xl:pl-0  lg:py-0',
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
            {props.description && <Description text={props.description} theme={props.theme} className='max-w-xs' size='sm' />}
            {props.customCta}
            {!props.customCta && props.ctaText && (
              <div className="mt-8">
                <HeroCTA text={props.ctaText} href={props.ctaHref || '#'} variant={props.theme} />
              </div>
            )}
          </div>

        </div>
      </div>

      {props.showScrollIndicator && (
        <>
          <style>{`
            .scroll-downs {
              position: absolute;
              right: 0; 
              bottom: 80px;
              left: 0; 
              margin: auto;
              width: 34px;
              height: 55px;
            }
            .mousey {
              width: 3px;
              padding: 10px 15px;
              height: 35px;
              border: 2px solid #000;
              border-radius: 25px;
              opacity: 0.75; 
              box-sizing: content-box;
            }
            .scroller {
              width: 3px;
              height: 10px;
              border-radius: 25%;
              background-color: #000;
              animation-name: scroll;
              animation-duration: 2.2s;
              animation-timing-function: cubic-bezier(.69,.41,.69,.94);
              animation-iteration-count: infinite;
            }
            @keyframes scroll {
              0% { opacity: 0; }
              10% { transform: translateY(0); opacity: 1; }
              100% { transform: translateY(20px); opacity: 0;}
            }
          `}</style>
          <div className="scroll-downs">
            <div className="mousey">
              <div className="scroller"></div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
