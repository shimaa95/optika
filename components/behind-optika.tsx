"use client"

import React from 'react'
import Image from 'next/image'

export default function BehindOptika() {
  return (
    <section className="w-full bg-[#f4f6f8]  px-6 py-16 md:py-24 lg:px-26 xl:px-50 lg:py-32">
      {/* Header Section */}
      <div className="flex items-center gap-6 mb-12 md:mb-16 lg:mb-20">
        <h2 className="text-xl md:text-4xl font-bold uppercase tracking-tight text-black whitespace-nowrap">
          Behind Optika
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
                About<br />Us
              </div>
              <p className="text-[14px] md:text-[14px]  lg:text-[16px] leading-relaxed text-black/90">
                Optika is a Global Eyewear Solutions Provider and Distributor of Exclusive and advanced Digital Lenses, Eyecare products, and Premium solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Top Right - Image */}
        <div className="relative flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 xl:p-24 border-b border-black/10">
          <div className="relative w-full  aspect-[4/5] sm:aspect-square md:aspect-square">
            <Image
              src="/about-hero.jpg"
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
              src="/about-optika2.jpg"
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
                Ophthalmic<br />Technology<br />Provider
              </div>
              <p className="mb-6 md:mb-8 text-[14px] md:text-[14px] lg:text-[16px] leading-relaxed text-black/90">
                Driven by ambition, innovation, Optika supplies eyewear to professionals, hospitals, and users.
              </p>
              <p className="text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed text-black/90">
                We deliver variety of high-end lenses which are manufactured in the Czech Republic and tested according to industry best standards with strict quality controls.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
