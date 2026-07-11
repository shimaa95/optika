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
// Full-bleed image background; text sits on top, aligned to the right
// 12-col grid, 24px gutter, 46px margin (matches the design panel)
// Text starts at col 7 and spans 5 cols (cols 7-11) per the reference design
//
// Exported so other hero variants (e.g. AboutHero) can import the same
// defaults and pass a `heroLayout` override to swap or extend them.
export const LAYOUT_DEFAULTS = {
  sectionClassName: 'relative min-h-[70vh] h-[100vh] w-full overflow-hidden bg-white',
  gridClassName: 'grid h-full w-full grid-cols-12 gap-6 items-center lg:pt-16 px-6 lg:px-[46px]',
  textColClassName: 'col-span-12 lg:col-span-5 lg:col-start-7 z-10 ', // bg-red-500/10 is for debugging layout, remove in production
};

const TEXT_ALIGN_MAP = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;


export interface HeroLayout {
  sectionClassName?: string;
  gridClassName?: string;
  textColClassName?: string;
}

export function HeroSection({
  config = {},
  heroLayout,
}: {
  config?: Partial<HeroProps>;
  /**
   * Replace the default layout tokens. Spread on top of LAYOUT_DEFAULTS so
   * partial overrides work. Example:
   *
   *   <HeroSection config={...} heroLayout={{ textColClassName: 'col-span-12 lg:col-span-6' }} />
   *
   * Or import the defaults and extend:
   *
   *   import { LAYOUT_DEFAULTS, HeroSection } from '@/components/hero-section'
   *   <HeroSection heroLayout={{ ...LAYOUT_DEFAULTS, textColClassName: 'col-span-12' }} />
   *
   * Also accepted inside the `config` object as a fallback for callers that
   * only know the `config` API.
   */
  heroLayout?: HeroLayout;
}) {
  const props = { ...defaultConfig, ...config };
  const layout = { ...LAYOUT_DEFAULTS, ...(heroLayout || props.heroLayout || {}) };

  const sectionClassName = props.sectionClassName || layout.sectionClassName;
  const gridClassName = props.gridClassName || layout.gridClassName;
  const textColClassName = props.textColClassName || layout.textColClassName;
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

      <div className={gridClassName + ' overflow-hidden'}>
        <div className={textColClassName}>
          <div className={textAlignClass}>
            {props.tagline && <Tagline text={props.tagline} theme={props.theme} className={props.TaglineclassaName} />}
            {props.title && <Headline theme={props.theme} className='' >{props.title}</Headline>}
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
           
              left: 0; 
              margin: auto;
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
          <div className={"scroll-downs    bottom-14 xl:bottom-20 w-4 h-8 xl:w-[34px] xl:h-14 "}>
            <div className="mousey">
              <div className="scroller"></div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
