import { ArrowDownToLine } from "lucide-react"
import Link from "next/link"
import { Menu } from "lucide-react"
import Image from "next/image"
export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden ">
      {/* Background Image */}
      <Image
        src="/Rectangle.png"
        alt="Modern office interior with natural lighting"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dark Overlay - strictly bg-black/60 as per design system requirements */}



      {/* Hero Content */}
      <div className="relative z-10 flex h-full w-full  px-6 sm:px-10 md:px-16 lg:px-[120px] items-end pb-16">
        <div className="w-full max-w-2xl">
          {/* Eyebrow text */}
          <p className="mb-4 text-[13px] font-normal tracking-wide text-white/90 sm:mb-5 sm:text-[14px]">
            We do our best          </p>

          {/* Main Heading - Extra bold, all caps, tight line height */}
          <h1 className="mb-6 font-inter text-[44px] font-extrabold uppercase leading-[98%] tracking-tight text-white  lg:text-[56px] 2xl:text-[64px]">
            SO YOU NEVER<br />
            MISS A MOMENT
          </h1>

          {/* Description */}
          <p className="mb-6 text-[14px] font-normal leading-[1.6] text-white/90 sm:text-[15px] md:text-[16px]">
            Optoka delivers to you Premium lenses <br /> solutions across three professional lines. built <br /> according to highest standards and delivered <br />within 48 hours.
          </p>

          {/* CTA / Scroll Arrow - Square white box with black stroke arrow */}
          <button

            className="group flex h-[32px] w-[32px] items-center justify-center cursor-pointer bg-black text-white transition-colors hover:bg-white hover:text-black"
            aria-label="Scroll down"
          >
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-[2px] group-hover:stroke-black  "
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <path d="M12 4v16M19 13l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>

  )
}
