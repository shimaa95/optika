"use client";

import React from 'react';
import Image from 'next/image';
import ArrowButton from './ArrowButton';
import { useRouter } from 'next/navigation';
import Tagline from './Tagline';
import Headline from './Headline';
import Description from './Description';

interface Props {
  id?: string;
  imageSrc?: string;
  imageAlt?: string;
  tagline?: string;
  heading?: string;
  description?: string;
  buttonLabel?: string;
  pageName?: string;
  className?: string;
  theme?: "dark" | "light";
  reverseLayout?: boolean;
  contentClassName?: string; textSize?: string; subHeading?: string;
  bottomCards?: { imageSrc: string; alt?: string }[];
}

const SplitLayoutHero = ({
  id,
  imageSrc,
  imageAlt,
  tagline,
  heading,
  description,
  buttonLabel, theme = "dark",
  pageName,
  className = 'bg-black',
  reverseLayout = false,
  contentClassName = '',
  subHeading,
  bottomCards
}: Props) => {
  const router = useRouter();

  const defaultSpacing = "lg:ml-[58px] px-6 sm:px-8 md:px-12 lg:px-20 xl:px-20";
  const wrapperClass = contentClassName || defaultSpacing;

  return (
    <section id={id} className={`relative z-10 flex min-h-screen w-full items-center justify-center ${className}`} style={{ willChange: 'transform' }}>
      <div className="grid w-full grid-cols-1 lg:grid-cols-2">
        {/* Image Side */}
        <div className={`flex flex-col  w-full items-start justify-start ${reverseLayout ? 'lg:order-2' : ''}`}>
          <div className="relative w-full  h-[50vh]">
            <Image
              src={imageSrc || " "}
              alt={imageAlt || ""}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
          {/* Bottom Cards */}
          {bottomCards && bottomCards.length > 0 && (
            <div className="grid grid-cols-3 w-full h-[50vh]">
              {bottomCards.map((card, idx) => (
                <div key={idx} className="relative w-full h-full overflow-hidden border border-white/20">
                  <Image
                    src={card.imageSrc}
                    alt={card.alt || `Card ${idx + 1}`}
                    fill
                    className="lg:object-contain xl:object-cover"
                    sizes="(max-width: 1024px) 33vw, 16vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Side */}
        <div className={`flex items-center justify-center ${reverseLayout ? 'lg:order-1' : ''} ${wrapperClass}`}>
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl xl:max-w-2xl font-playfair">
            {/* Tagline */}
            <Tagline theme={theme} className="max-w-xs  ">
              {tagline}
            </Tagline>

            {/* Main Heading */}
            <Headline theme={theme} className=" max-w-[220px] md:max-w-[300px] xl:max-w-[320px] " >
              {heading}
            </Headline>
            {subHeading && (<p className="text-black/80 font-inter mt-4 xl:mt-8 mb-16">
              {subHeading}
            </p>)}
            {/* Description */}
            <Description theme={theme} maxWidth="lg:max-w-[400px] max-w-[300px] " className="mb-8 xl:mb-16 font-medium">
              {description}
            </Description>

            {/* CTA Button */}
            {buttonLabel && <ArrowButton variant={theme} label={buttonLabel} onClick={() => router.push(`/${pageName ?? ''}`)} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitLayoutHero;
