import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function PartnersSection() {
  return (
    <section className="relative px-6 lg:px-20 xl:px-24 py-16 lg:py-24 bg-black">
      <div className="flex flex-col-reverse lg:flex-row items-center w-full gap-12 lg:gap-16 xl:gap-24">
        {/* Left: Text Content */}
        <div className="flex flex-col w-full lg:w-[35%] xl:w-[32%] justify-center pr-0 lg:pr-8">
          {/* Tagline */}
          <p className="text-[14px]  text-white/70 mb-4 xl:mb-8 font-light  tracking-wide">
            Exceptional Optical Solutions
          </p>

          {/* Headline */}
          <h2 className="text-[32px] font-bold text-white tracking-tight mb-6 xl:mb-8 leading-[1.1]">
            Partners integrated solutions
          </h2>

          {/* Body */}
          <div className="text-sm xl:text-base text-white/70 leading-relaxed max-w-[400px] mb-8">
            <p>
              Optika supports business partners with automated solutions that are designed to perform
              well today and adaptable tomorrow. Whether it&apos;s distribution, specification, or
              tailored support, we help partners move faster and to serve better.
            </p>
          </div>

          <Link href="#" className='cursor-pointer w-fit group'>
            <div className="flex items-center gap-3 text-[16px] font-normal text-white/80 transition-colors group-hover:text-white" style={{ fontFamily: "var(--font-inter)" }}>
              <span className="flex h-8 w-8 items-center justify-center border border-white/30 transition-all group-hover:bg-white group-hover:text-black">
                <ArrowRight className="h-4 w-4" />
              </span>
              <span>Become a Partner</span>
            </div>
          </Link>
        </div>

        {/* Right: Image */}
        <div className="relative w-full lg:w-[65%] xl:w-[68%] aspect-[4/3] md:aspect-[16/9] lg:aspect-[2.1/1] overflow-hidden">
          <Image
            src="/whatwedo.jpeg"
            alt="Partners section image"
            fill
            sizes="(min-width: 1024px) 68vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}
