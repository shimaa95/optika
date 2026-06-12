import Image from "next/image"
import Link from "next/link"



export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-black text-white z-100">
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-black">
        {/* Full-bleed hero background */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/actushero.png"
            alt=""
            fill
            priority
            loading="eager"
            className="object-cover object-[center_2%]"
            sizes="100vw"
          />
        </div>
        {/* Side vignettes — keeps outer columns readable over the photo */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/55 via-black/15 to-black/55"
          aria-hidden
        />



        {/* Left | clear center (figure from bg) | right — tops align */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1920px] flex-1 flex-col 2xl:justify-center justify-end px-6 pb-14 pt-[148px] sm:px-10 sm:pb-16 sm:pt-[160px] md:px-16 md:pb-20 md:pt-[104px] lg:px-[120px] lg:pb-24 lg:pt-[112px]">
          <div className="grid w-full grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0 xl:gap-x-12">
            {/* Left — one third */}
            <div className="flex flex-col text-left  lg:col-span-4">
              <p
                className="mb-7 text-[14px] font-normal leading-[1.45] tracking-[0.02em] text-white sm:mb-8 sm:text-[15px] md:mb-9 md:text-[16px]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Our Exclusive Range of Premium lenses
              </p>

              <h1 className="mb-9 font-inter text-[48px] font-bold uppercase leading-[0.93] tracking-[-0.03em] text-white sm:mb-10 sm:text-[58px] md:mb-10 md:text-[72px] lg:text-[88px] xl:text-[100px]">
                ACUTUS
              </h1>

              <p className="mb-12 max-w-[440px] font-inter text-[14px] font-normal leading-[1.72] text-white sm:mb-14 sm:text-[15px] md:max-w-[460px] md:text-[16px] md:leading-[1.68] lg:mb-16 lg:text-[17px]">
                Optoka delivers to you Premium lenses solutions across three professional lines,
                built according to highest standards and delivered within 48 hours.
              </p>

              <Link
                href="/products"
                className="group inline-flex w-fit items-center gap-4 text-[13px] font-medium tracking-normal text-white transition-opacity hover:opacity-85 sm:gap-5 sm:text-[14px]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-white sm:h-9 sm:w-9">
                  <svg
                    className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-y-0.5 sm:h-5 sm:w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M12 5v14M19 13l-7 7-7-7"
                      stroke="#000000"
                      strokeWidth="2.25"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                    />
                  </svg>
                </span>
                <span>Explore Lenses</span>
              </Link>
            </div>

            {/* Right — stats from column 10–12 (two-line labels per design) */}
            <div className="flex flex-col items-start gap-[4.5rem] text-left sm:gap-20 lg:col-start-12 lg:col-span-3 xl:gap-24">
              <div>
                <p className="font-inter text-[48px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[56px] md:text-[64px] lg:text-[72px] xl:text-[80px]">
                  03
                </p>
                <div
                  className="mt-3 flex flex-col font-inter text-[11px] font-bold uppercase leading-[1.2] tracking-[0.16em] text-white sm:mt-3.5 sm:text-[12px] md:text-[13px]"
                >
                  <span>Product</span>
                  <span>lines</span>
                </div>
              </div>

              <div>
                <p className="font-inter text-[48px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[56px] md:text-[64px] lg:text-[72px] xl:text-[80px]">
                  15+
                </p>
                <div
                  className="mt-3 flex flex-col font-inter text-[11px] font-bold uppercase leading-[1.2] tracking-[0.16em] text-white sm:mt-3.5 sm:text-[12px] md:text-[13px]"
                >
                  <span>Lens</span>
                  <span>solutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
