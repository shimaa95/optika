import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ArrowButton from './ArrowButton';

export function PartnersSection() {
  return (
    /*
     * Partners = roughly half the height of About
     * Left: text with standard padding
     * Right: photo takes up more than half the width, full height
     */
    <section className="relative w-full text-white ">
      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] items-stretch min-h-0">

        {/* ── LEFT: Text ── */}
        <div className="flex flex-col justify-start pl-6 lg:pl-26 xl:pl-50 pr-6 lg:pr-10 xl:pr-14 py-10 lg:py-14">

          {/* Eyebrow — italic, spaced, muted */}
          <h3 className="text-[20px] font-bold tracking-[0.1em] leading-[28px] text-[#e7e7e7] mb-4 xl:mb-8 font-light">
            Exceptional Optical Solutions
          </h3>


          {/* Heading — bold, lowercase */}
          <h2 className="text-[32px] w-full font-bold text-[#ffffff] tracking-wide uppercase mb-4 xl:mb-8">
            partners integrated<br />
            solutions
          </h2>

          <div className="text-[#afaaaa] text-sm xl:text-base leading-relaxed mb-4 xl:mb-8 max-w-sm">
            Optika supports business partners with automated solutions that are designed to
            perform well today and adaptable tomorrow. whether its distribution, specification,
            or tailored support, we help partners move faster and to serve better.

            <ArrowButton label={'Join Partner Programs'} variant={"light"} href='#' />

          </div>
        </div>

        {/* ── RIGHT: Image — flush right, no right padding ── */}
        <div className="relative w-full h-[260px] lg:h-full min-h-[300px] overflow-hidden">
          <Image
            src="/partner.jpg"
            alt="Woman with green earrings laughing"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </div>

      </div>

    </section>
  );
}