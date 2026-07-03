"use client"

export function PhilosophySection() {
  return (
    <section className="reel-stage bg-transparent">
      <div className="reel-stage-inner reel-stage-inner--split">
        <div aria-hidden className="min-h-0 md:min-h-dvh" />

        <div className="reel-stage-copy-intro reel-stage-copy-start max-w-lg lg:mt-16">
          <p
            className="gs-scene-1-title lg:ml-3 text-gray-300 gs-dynamic-text mb-4 xl:mb-8 w-full font-playfair text-[16px] xl:text-[20px] font-medium leading-[1.36] tracking-[0.11em]"
            style={{

              opacity: 0,
            }}
          >
            WELCOME TO OPTIKA
          </p>
          <h2
            className="gs-scene-1-title gs-dynamic-text max-w-none lg:max-w-md xl:max-w-none xl:mb-8 mb-4 w-full font-inter xl:text-[64px] lg:text-[48px] text-[32px]  font-bold uppercase leading-[0.98] tracking-[-0.04em] "
            style={{
              color: "#ffffff",
              opacity: 0,
            }}
          >
            An EyeCare Technology Providing Company
          </h2>

          <p
            className="gs-scene-1-p text-gray-300 gs-dynamic-text-light xl:mb-16 mb-8 max-w-[50ch] font-inter xl:text-[20px] text-[16px] font-medium leading-[1.5] tracking-[0.02em] lg:pr-[84px]"
            style={{

              opacity: 0,
            }}
          >

            Optika provide Users, Eyewear Professionals, and Hospitals with an Exclusive and Advanced Digital Lenses. </p>
        </div>
      </div>

      <div className="reel-stage-scroll-hint gs-scene-1-scroll" style={{ opacity: 0 }}>
        <span className="gs-dynamic-text-light font-inter text-[10px] uppercase tracking-[0.25em] text-white" style={{ color: "#ffffff" }}>
          SCROLL NEXT
        </span>
      </div>
    </section>
  )
}
