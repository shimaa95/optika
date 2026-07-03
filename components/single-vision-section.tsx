import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function SingleVisionSection() {
  return (
    <section className="bg-white  min-h-screen mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* Text Content */}
        <div className="flex items-center px-16 py-10 lg:py-10 lg:ml-20">
          <div className="max-w-[420px]">

            {/* Stacked labels */}
            <p
              className="text-[11px] text-black/50 mb-0 leading-snug"
            >
              Specialised
            </p>
            <p
              className="text-[11px] text-black/50 mb-7 leading-snug"
            >
              LINE
            </p>

            {/* Title */}
            <h2
              className="text-[48px] leading-[1.0] font-bold text-black mb-5  w-full"
              style={{ fontFamily: " inter" }}
            >
              SINGLE VISION<br />LENSES
            </h2>

            {/* Subtitle */}
            <p
              className="text-[10px] text-black/50 uppercase mb-8 leading-snug"
              style={{
                fontFamily: "Inter",
                letterSpacing: "0.12em",
              }}
            >
              ADVANCED TECHNOLOGY FOR ALL<br />VISIONS
            </p>

            {/* Description */}
            <p
              className="text-[10px] text-black/55 uppercase leading-[1.75] mb-10"
              style={{
                fontFamily: "var(--font-geist-inter, inter-serif)",
                letterSpacing: "0.04em",
                maxWidth: "270px",
              }}
            >
              OUR SINGLE VISION LENS DELIVERS OPTIMAL
              VISUAL CLARITY AT ONE FOCAL DISTANCE.
              ENGINEERED ON A DIGITAL ASPHERIC PLATFORM,
              IT IS COMPATIBLE WITH THE COMPLETE OPTOKA
              COATING SYSTEM AND AVAILABLE ACROSS ALL
              MAJOR INDEX VALUES
            </p>

            {/* CTA — bordered arrow box + text */}
            <button
              className="flex items-center gap-3 group"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              <span
                className="flex items-center justify-center border border-black/30 w-[28px] h-[28px] group-hover:border-black transition-colors"
              >
                <ArrowRight className="h-4 w-4 text-black" />
              </span>
              <span
                className="text-[10px] text-black uppercase"
                style={{
                  fontFamily: "var(--font-geist-inter, inter-serif)",
                  letterSpacing: "0.08em",
                }}
              >
                Lens Specification
              </span>
            </button>

          </div>
        </div>

        {/* Image — right column, with white space padding around (not full bleed) */}
        <div className="flex items-center justify-center h-screen">
          <div className="relative   h-screen w-full">
            <Image
              src="/model1.png"
              alt="Woman wearing transition lenses"
              fill
              className="object-cover object-center px-16 py-8"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
