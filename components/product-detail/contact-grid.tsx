import Link from "next/link"
import { ArrowIcon } from "@/components/product-detail/icons"
import { AnimateInView } from "@/components/product-detail/animate-in-view"
import type { ProductDetailData } from "@/lib/products/product-detail"

interface ContactGridProps {
  contact: ProductDetailData["contact"]
}

export function ContactGrid({ contact }: ContactGridProps) {
  return (
    <section className="bg-bg-light">
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
        {[contact.left, contact.right].map((column, index) => (
          <AnimateInView
            key={column.title}
            delay={index * 0.08}
            className={`flex flex-col justify-between px-6 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16 ${
              index === 0 ? "md:border-r md:border-[#e5e5e5]" : ""
            }`}
          >
            <div>
              <h3 className="text-[clamp(1.125rem,1.8vw,1.5rem)] font-bold text-text-dark">
                {column.title}
              </h3>
              <p className="mt-3 max-w-md text-[14px] leading-[1.5] text-text-dark/70 sm:text-[15px]">
                {column.description}
              </p>
            </div>
            <Link
              href={column.href}
              className="mt-8 inline-flex w-fit items-center justify-center gap-3 bg-black border border-transparent px-[28px] py-[14px] text-[14px] font-medium tracking-[0.01em] text-white rounded-[4px] transition-all duration-300 ease-in-out hover:bg-transparent hover:text-black hover:border-black/80"
            >
              {column.buttonLabel}
              <ArrowIcon />
            </Link>
          </AnimateInView>
        ))}
      </div>
    </section>
  )
}
