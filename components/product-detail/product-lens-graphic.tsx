import Image from "next/image"
import type { ProductDetailData } from "@/lib/products/product-detail"

interface ProductLensGraphicProps {
  lensGraphic: ProductDetailData["lensGraphic"]
}

/** Wide lens asset — ~10% height overlaps hero, rest sits on the gray panel */
export function ProductLensGraphic({ lensGraphic }: ProductLensGraphicProps) {
  return (
    <div
      className="pointer-events-none absolute z-30 w-[min(58vw,538px)] -translate-x-1/2 -translate-y-[10%] left-[72%] sm:left-[70%] md:left-[68%] lg:left-[66%]"
      style={{ top: "var(--pdp-hero-height)" }}
      aria-hidden
    >
      <Image
        src={lensGraphic.imageSrc}
        alt={lensGraphic.imageAlt}
        width={538}
        height={341}
        className="h-auto w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.28)]"
        style={{ width: "auto", height: "auto" }}
        sizes="(max-width: 768px) 58vw, 538px"
        priority
      />
    </div>
  )
}
