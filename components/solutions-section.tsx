import Image from "next/image"
import { ArrowRight, Sparkles, LayoutGrid, Globe } from "lucide-react"

export function SolutionsSection() {
  return (
    <section className="w-full bg-[#f5f5f5]">
      <div className="grid min-h-[50vh] lg:min-h-screen grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 lg:px-20 xl:px-24 2xl:px-50 ">
        {/* Left Content Area */}
        <div className="flex flex-col items-center lg:items-end justify-center px-6 xl:py-12 py-4 sm:px-8 sm:py-20 md:px-12 lg:px-10 xl:px-16 xl:px-24">
          <div className="w-full max-w-md lg:max-w-[480px] xl:max-w-[540px]">
            {/* Tagline */}
            <p
              className="mb-6 sm:mb-6 lg:mb-6 text-black/70 text-[10px] sm:text-[11px] lg:text-xs tracking-[0.1em] leading-[135%] font-playfair font-normal"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Exceptional Optical Solutions
            </p>

            {/* Main Heading */}
            <h2
              className="mb-6 sm:mb-8 font-inter font-bold lg:mb-8 relative z-10 text-[36px] sm:text-[44px] md:text-[50px] lg:text-[48px] xl:text-[56px] tracking-[-0.02em] text-black leading-[1.1]"
            >
              SOLUTIONS
              <br />
              FOR PARTNERS
            </h2>

            {/* Description */}
            <p
              className="mb-8 max-w-sm sm:mb-10 md:max-w-[440px] lg:mb-10 text-black/80 text-[13px] sm:text-sm lg:text-[15px] leading-[1.6] tracking-[0.01em]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              We are committed to advancing how you see the world. Our teams are perfecting the science of digital optics, providing diverse solutions and lenses that meet different Use-cases, Taste, and style.
            </p>

            {/* Bullet Points */}
            <ul className="mb-10 lg:mb-12 space-y-3 lg:space-y-4">
              <li className="flex items-center gap-4 text-black text-[13px] sm:text-[14px] lg:text-[14px] tracking-[0.01em] font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                <div className="flex items-center justify-center w-5 h-5 opacity-70">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                </div>
                100% quality commitment
              </li>
              <li className="flex items-center gap-4 text-black text-[13px] sm:text-[14px] lg:text-[14px] tracking-[0.01em] font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                <div className="flex items-center justify-center w-5 h-5 opacity-70">
                  <LayoutGrid className="w-3.5 h-3.5 text-black" />
                </div>
                Premium digital lenses
              </li>
              <li className="flex items-center gap-4 text-black text-[13px] sm:text-[14px] lg:text-[14px] tracking-[0.01em] font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                <div className="flex items-center justify-center w-5 h-5 opacity-70">
                  <Globe className="w-3.5 h-3.5 text-black" />
                </div>
                Global industry standards
              </li>
            </ul>

            {/* CTA Button */}
            <button
              className="group inline-flex w-fit items-center gap-3 text-[13px] sm:text-[14px] font-medium text-black transition-colors hover:text-black/80"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center border border-black/30 transition-all group-hover:border-black group-hover:bg-black group-hover:text-white">
                <ArrowRight className="h-4 w-4" />
              </span>
              <span>Become Partner</span>
            </button>
          </div>
        </div>

        {/* Right Image Area */}
        <div className="relative w-full min-h-[30vh]  lg:min-h-screen flex items-center justify-center lg:justify-start ">
          <div className="lg:absolute relative lg:-left-20 left-0 w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[600px] aspect-square rounded-full overflow-hidden shrink-0 shadow-2xl">
            <Image
              src="/solutions-digital-len.png"
              alt="Hand holding an advanced digital optical lens with glowing tech patterns"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
