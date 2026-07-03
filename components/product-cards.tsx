import { ArrowRight } from "lucide-react"

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
        <img
          src="/images/lens-product.png"
          alt="Lens product view"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Divider */}
      <div className="border-t border-[#e0e0e0] mx-0" />

      {/* Content */}
      <div className="px-4 pt-4 pb-4 flex flex-col flex-1">

        {/* Title */}
        <h3 className="text-[13px] font-extrabold text-black tracking-tight leading-tight mb-0.5">
          {title}
        </h3>

        {/* Subtitle */}
        <p className="text-[9px] font-semibold text-black/50 uppercase tracking-widest mb-3">
          {subtitle}
        </p>

        {/* Description */}
        <p className="text-[11px] text-black/65 leading-relaxed mb-3">
          {description}
        </p>

        {/* Bullet Features */}
        <ul className="space-y-1.5 mb-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-[11px] text-black/60">
              <span className="w-1.5 h-1.5 rounded-full bg-black/25 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Technology Badge — CUSTOMFORM */}
        <div className="mb-4 mt-auto">
          <img
            src="/images/customform-badge.png"
            alt="CustomForm technology"
            className="h-5 object-contain"
          />
        </div>

        {/* CTA Button */}
        <button className="w-full border border-black bg-white text-black text-[11px] font-medium py-2.5 px-4 flex items-center gap-2 hover:bg-black hover:text-white transition-colors duration-200 group">
          <ArrowRight className="h-4 w-4 shrink-0" />
          <span>Product Details</span>
        </button>

      </div>
    </div>
  )
}
