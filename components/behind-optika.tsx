"use client"

import React from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface BehindOptikaData {
  heading?: string
  topLeftEyebrow?: string
  topLeftBody?: string
  topRightImage?: unknown
  bottomLeftImage?: unknown
  bottomRightEyebrow?: string
  bottomRightBody1?: string
  bottomRightBody2?: string
}

export default function BehindOptika({ data }: { data?: BehindOptikaData } = {}) {
  const heading = data?.heading?.trim() || 'Behind Optika'
  const topLeftEyebrow = data?.topLeftEyebrow?.trim() || 'About\nUs'
  const topLeftBody =
    data?.topLeftBody?.trim() ||
    'Optika is a Global Eyewear Solutions Provider and Distributor of Exclusive and advanced Digital Lenses, Eyecare products, and Premium solutions.'
  const topRightSrc = data?.topRightImage
    ? urlFor(data.topRightImage).width(1200).url()
    : '/about-hero.jpg'
  const bottomLeftSrc = data?.bottomLeftImage
    ? urlFor(data.bottomLeftImage).width(1200).url()
    : '/about-optika2.jpg'
  const bottomRightEyebrow = data?.bottomRightEyebrow?.trim() || 'Ophthalmic\nTechnology\nProvider'
  const bottomRightBody1 =
    data?.bottomRightBody1?.trim() ||
    'Driven by ambition, innovation, Optika supplies eyewear to professionals, hospitals, and users.'
  const bottomRightBody2 =
    data?.bottomRightBody2?.trim() ||
    'We deliver variety of high-end lenses which are manufactured in the Czech Republic and tested according to industry best standards with strict quality controls.'

  // Eyebrows are stored as a single string but rendered with explicit <br/>
  // breaks. Split on newlines so editors can control the line break layout.
  const renderEyebrow = (s: string) =>
    s.split('\n').map((line, i, arr) => (
      <React.Fragment key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </React.Fragment>
    ))

  return (
    <section className="w-full  px-6  lg:px-20 xl:px-24 2xl:px-50 ">
      {/* Header Section */}
      <div className="flex items-center gap-6 mb-12 md:mb-16 lg:mb-20">
        <h2 className="text-[32px] font-bold uppercase tracking-tight text-black whitespace-nowrap">
          {heading}
        </h2>
        <div className="flex-1 h-px bg-black/20" />
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 border border-black/10 w-full">
        {/* Top Left - Text */}
        <div className="flex flex-col justify-center bg-white p-8 md:p-12 lg:p-20 xl:p-32 border-b md:border-b border-black/10 md:border-r">
          <div className="flex max-w-[480px] gap-5">
            <div className="w-[1px] shrink-0 self-stretch bg-black" />
            <div className="flex-1">
              <div className="mb-6 xl:mb-8 text-[13px] md:text-[14px] leading-snug font-medium text-black/60">
                {renderEyebrow(topLeftEyebrow)}
              </div>
              <p className="text-[14px] lg:text-[16px] leading-relaxed text-black/90">
                {topLeftBody}
              </p>
            </div>
          </div>
        </div>

        {/* Top Right - Image */}
        <div className="relative flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 xl:p-24 border-b border-black/10">
          <div className="relative w-full  aspect-[4/5] sm:aspect-square md:aspect-square">
            <Image
              src={topRightSrc}
              alt="Group of models wearing premium eyewear"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Bottom Left - Image */}
        <div className="relative p-8 md:p-12 lg:p-20 xl:p-24 border-b md:border-b-0 md:border-r border-black/10">
          <div className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-square">
            <Image
              src={bottomLeftSrc}
              alt="Models in white polo shirts wearing sunglasses"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Bottom Right - Text */}
        <div className="flex flex-col bg-white justify-center p-8 md:p-12 lg:p-20 xl:p-32">
          <div className="flex max-w-[480px] gap-5">
            <div className="w-[1px] shrink-0 self-stretch bg-black" />
            <div className="flex-1">
              <div className="mb-6 xl:mb-8 text-[13px] md:text-[14px] leading-snug font-medium text-black/60">
                {renderEyebrow(bottomRightEyebrow)}
              </div>
              <p className="mb-6 md:mb-8 text-[14px]  lg:text-[16px] leading-relaxed text-black/90">
                {bottomRightBody1}
              </p>
              <p className="text-[14px] lg:text-[16px] leading-relaxed text-black/90">
                {bottomRightBody2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
