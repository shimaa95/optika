import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function TransitionSection() {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="relative h-[500px] lg:h-[600px] bg-[#1a1a1a] order-2 lg:order-1">
          <Image
            src="/images/transition-model.jpg"
            alt="Woman wearing transition lenses"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Text Content */}
        <div className="px-8 py-16 lg:py-24 flex flex-col justify-center order-1 lg:order-2">
          <div className="max-w-md lg:ml-auto lg:mr-16">
            {/* Label */}
            <p className="text-xs text-black/50 uppercase tracking-wider mb-2">PREMIUM</p>
            <p className="text-xs text-black/50 uppercase tracking-wider mb-6">LINE</p>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight leading-tight mb-4">
              TRANSITION<br />LENSES
            </h2>

            {/* Subtitle */}
            <p className="text-xs text-black/50 uppercase tracking-wider mb-6">
              ADVANCED TECHNOLOGY FOR ALL VISIONS
            </p>

            {/* Description */}
            <p className="text-xs text-black/60 leading-relaxed mb-8 max-w-sm">
              IT IS ULTRA-RESPONSIVE TO LIGHT, OFFERS A SPECTACULAR COLOR PALETTE AND PROVIDES HD VISION AT THE SPEED OF YOUR LIFE.
            </p>

            {/* CTA Button */}
            <button className="bg-[#6b21a8] text-white text-xs py-2.5 px-5 flex items-center gap-2 hover:bg-[#581c87] transition-colors">
              <ArrowRight className="h-4 w-4" />
              <span>Lens Specification</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
