import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function PartnersSection() {
  return (
    <section className="relative px-6 lg:px-24 xl:px-50 pb-20 lg:pb-28">
      <div className=" items-center  flex flex-col lg:flex-row gap-20">
        {/* Left: copy */}
        <div className="flex flex-col lg:max-w-md w-[50%]   justify-center">
          {/* Tagline — smallest, most muted, sets context */}
          <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-white/40 mb-4  ">
            Exceptional Optical Solutions
          </p>

          {/* Headline — largest, brightest, dominant focal point */}
          <h2 className="text-3xl lg:text-4xl xl:text-[2.75rem] font-bold text-white leading-[1.1] tracking-tight mb-4">
            partners integrated solutions
          </h2>

          {/* Body — medium size, comfortable read color, generous line-height */}
          <div className="text-sm xl:text-base text-white/60 leading-7 mb-8 xl:mb-16 max-w-md">
            <p>
              Optika supports business partners with automated solutions that are designed to perform
              well today and adaptable tomorrow. Whether it&apos;s distribution, specification, or
              tailored support, we help partners move faster and to serve better.
            </p>
          </div>
          <Link href="#" className='cursor-pointer  '>
            <div className="flex items-center gap-3 text-sm font-medium text-white/80 transition-colors hover:text-white sm:text-base lg:text-[16px]  group-hover:border-white group-hover:bg-white group-hover:text-white" style={{ fontFamily: "var(--font-inter)" }}>
              <span className="flex h-6 w-6 sm:h-6 sm:w-6 items-center justify-center border border-white/30 transition-all">
                <ArrowRight className="h-4 w-4" />
              </span>
              <span>Become a Partner</span>
            </div>
          </Link>
        </div>

        {/* Right: portrait */}
        <div className="relative xl:aspect-[18/8] lg:aspect-[18/11] w-full xl:w-[90%] lg:w-[51%] overflow-hidden">
          <Image
            src="/partners.jpg"
            alt="A woman laughing outdoors while wearing cat-eye eyeglasses"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
