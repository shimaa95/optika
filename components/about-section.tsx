import Image from 'next/image';

export function AboutSection() {
  return (
    /*
     * Layout: no section-level padding
     * Left column = images flush to left edge
     * Right column = text with internal left + right padding
     */
    <section className="relative w-full text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start">

        {/* ── LEFT: Images — no padding, flush to left edge ── */}
        <div className="flex flex-col gap-[3px]">
          {/* Main hero image */}
          <div className="relative w-full h-[280px] lg:h-[380px] xl:h-[420px] overflow-hidden">
            <Image
              src="/about-hero.jpg"
              alt="Women wearing sunglasses"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* 3 Bottom Cards — equal width, no gap */}
          <div className="grid grid-cols-3 gap-[3px]">
            {[
              { src: "/left.jpeg",   title: "End-to-end system integration", desc: "Everything connects seamlessly from prescription input to final delivery." },
              { src: "/center.jpeg", title: "End-to-end system integration", desc: "Everything connects seamlessly from prescription input to final delivery." },
              { src: "/right.jpeg",  title: "End-to-end system integration", desc: "Everything connects seamlessly from prescription input to final delivery." },
            ].map((card, i) => (
              <div key={i} className="flex flex-col bg-white text-black overflow-hidden">
                {/* Card image — aspect-ratio ~4:3 */}
                <div className="relative w-full" style={{ paddingBottom: '62%' }}>
                  <Image src={card.src} alt="" fill className="object-cover absolute inset-0" />
                </div>
                {/* Card text */}
                <div className="px-2 pt-2 pb-3">
                  <h4 className="font-bold text-[9px] lg:text-[10px] leading-tight mb-1">
                    {card.title}
                  </h4>
                  <p className="text-[8px] lg:text-[9px] leading-tight text-[#666]">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Text — padded internally ── */}
        <div className="flex flex-col justify-start px-6 lg:px-10 xl:px-14 pt-10 lg:pt-14 pb-10">
          <p className="text-[10px] font-medium tracking-[0.24em] uppercase mb-4 text-gray-400">
            What We Do
          </p>
          <h2 className="text-[32px] font-bold mb-6 leading-[1.1]">
            Eyewear products and<br />
            ophthalmic care<br />
            Solutions
          </h2>
          <p className="text-gray-400 text-[12px] lg:text-[13px] max-w-[300px] leading-relaxed">
            Optika is a Provider and Distributor of Exclusive and advanced Digital Lenses,
            Ophthalmic care products, and Premium Eyewear Solutions.
          </p>
        </div>

      </div>
    </section>
  );
}
