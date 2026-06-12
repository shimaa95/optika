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
  subHeading
}: Props) => {
  const router = useRouter();

  const defaultSpacing = "lg:ml-[58px] px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 lg:py-0 xl:px-20 2xl:px-28";
  const wrapperClass = contentClassName || defaultSpacing;

  return (
    <section id={id} className={`relative z-10 w-full  ${className}`} style={{ willChange: 'transform' }}>
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Image Side */}
        <div className={`relative min-h-[50vh] w-full lg:min-h-screen ${reverseLayout ? 'lg:order-2' : ''}`}>
          <Image
            src={imageSrc || " "}
            alt={imageAlt || ""}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
          />
        </div>

        {/* Content Side */}
        <div className={`flex items-center justify-center ${reverseLayout ? 'lg:order-1' : ''} ${wrapperClass}`}>
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl font-playfair">
            {/* Tagline */}
            <Tagline theme={theme} className="max-w-xs  ">
              {tagline}
            </Tagline>

            {/* Main Heading */}
            <Headline theme={theme} className=" max-w-[350px] 2xl:max-w-[500px]">
              {heading}
            </Headline>
            {subHeading && (<p className="text-black/80 font-inter mt-4 2xl:mt-8 mb-16">
              {subHeading}
            </p>)}
            {/* Description */}
            <Description theme={theme} maxWidth="max-w-[400px]" className="mb-8 2xl:mb-16 font-medium">
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
