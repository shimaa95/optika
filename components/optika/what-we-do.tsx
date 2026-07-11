import Image from 'next/image'
import { FeatureCard } from './feature-card'

const features = [
  {
    image: '/left.jpeg',
    title: 'End-to-end system integration',
    description: 'Everything connects seamlessly from prescription input to final delivery.',
  },
  {
    image: '/center.jpeg',
    title: 'End-to-end system integration',
    description: 'Everything connects seamlessly from prescription input to final delivery.',
  },
  {
    image: '/right.jpeg',
    title: 'End-to-end system integration',
    description: 'Everything connects seamlessly from prescription input to final delivery.',
  },
]

export function WhatWeDo() {
  return (
    <section className="relative">
      <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
        {/* Left: hero image + cards — flush to the top-left corner */}
        <div className="flex flex-col gap-1  lg:col-span-3">
          <div className="relative aspect-[2.5/1] w-full overflow-hidden">
            <Image
              src="/abouttop.png"
              alt="Two people relaxing in the sun wearing designer sunglasses"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>

        {/* Right: heading + copy */}
        <div className="flex flex-col justify-center px-5 pt-6 sm:px-8 lg:col-span-2 lg:max-w-md lg:pl-0 lg:pr-8 lg:pt-16">
          {/* Tagline — smallest, most muted, sets context */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-3">
            What We Do
          </p>

          {/* Headline — largest, brightest, dominant focal point */}
          <h2 className="text-[32px] font-bold text-white leading-[1.1] tracking-tight mb-5">
            Eyewear products and ophthalmic care Solutions
          </h2>

          {/* Body — medium size, comfortable read color, generous line-height */}
          <p className="text-sm lg:text-base text-white/60 leading-7 max-w-sm">
            Optika is a Provider and Distributor of Exclusive and advanced Digital Lenses,
            Ophthalmic care products, and Premium Eyewear Solutions.
          </p>
        </div>
      </div>
    </section>
  )
}
