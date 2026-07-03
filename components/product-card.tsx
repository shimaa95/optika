import { ArrowRight } from "lucide-react"
import Image from "next/image"

interface ProductCardProps {
  title: string
  subtitle: string
  description: string
  features: string[]
}

export function ProductCard({
  title,
  subtitle,
  description,
  features,
}: ProductCardProps) {
  return (
    <div className="bg-white border border-[#e0e0e0] flex flex-col">

      {/* Lens Image — no background fill, just white */}
      <div className="bg-white pt-6 px-6 pb-2 flex items-center justify-center h-40">
        <Image
          src="/83.png"
          alt="Lens product view"
          className="w-full h-full object-contain" width={100} height={100}
        />
      </div>



      {/* Content */}
      <div className="pt-4 pb-4 flex flex-col flex-1">

        {/* Title */}
        <h3 className="text-[13px] mx-4 font-extrabold text-black tracking-tight leading-tight mb-1">
          {title}
        </h3>

        {/* Subtitle */}
        <p className="text-[9px] mx-4 font-semibold text-black/50 uppercase tracking-widest mb-4">
          {subtitle}
        </p>

        {/* Description */}
        <p className="text-[11px] mx-4 text-black/65 leading-relaxed mb-4">
          {description}
        </p>

        {/* Bullet Features */}
        <ul className="space-y-1.5 mx-4 mb-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-[11px] text-black/60">
              <span className="w-1.5 h-1.5 rounded-full bg-black/25 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Technology Badge — CUSTOMFORM */}
        <div className="mb-4 mt-auto mx-4">
          <img
            src="/45.png"
            alt="CustomForm technology"
            className="h-5 w-auto object-contain"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
        <div className="border-b-[1px] border-[#252525] mb-4" />        {/* CTA Button */}
        <button className="w-[150px] border self-center mt border-black bg-black text-white text-[11px] font-medium py-1 px-4 flex items-center gap-2 hover:bg-white hover:text-black transition-colors duration-200 group">
          <ArrowRight className="h-4 w-4 shrink-0" />
          <span>Product Details</span>
        </button>

      </div>
    </div>
  )
}
