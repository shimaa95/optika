import Image from "next/image"

export function PerformanceSection() {
  return (
    <section className="relative h-[60vh]   w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/pr.png"
          alt="Professional team in a modern office boardroom"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Centered Content */}
      <div className="hidden lg:block relative z-10 w-full max-w-[30%] lg:max-w-[60%]  text-center   px-8">
        <h2
          className="text-white font-inter  uppercase tracking-normal font-inter 
                     text-[20px] sm:text-[35px] md:text-[40px] lg:text-[45px] xl:text-[50px] xl:text-[55px]  font-bold
                     leading-[.1] md:leading-[1.05]"
          style={{ textShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
        >
          Designed to perform
          <br className="hidden sm:block" />
          well today and
          <br className="hidden sm:block" />
          remain adaptable
          <br className="hidden sm:block" />
          tomorrow.
        </h2>
      </div>

      {/* Mobile Content */}
      <div className="lg:hidden relative z-10 w-full max-w-[90%] text-center px-4">
        <h2
          className="text-white font-inter uppercase tracking-normal font-inter 
                     text-[24px] sm:text-[28px] md:text-[32px] font-bold
                     leading-[1.1]"
          style={{ textShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
        >
          Designed to perform well today and remain adaptable tomorrow.
        </h2>
      </div>
    </section>
  )
}
