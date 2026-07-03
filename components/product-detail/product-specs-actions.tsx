import Link from "next/link"
import { AnimateInView } from "@/components/product-detail/animate-in-view"

interface ProductSpecsActionsProps {
  brochureUrl: string
  themeColor: string
}

export function ProductSpecsActions({ brochureUrl, themeColor }: ProductSpecsActionsProps) {
  return (
    <AnimateInView
      delay={0.1}
      className="mt-auto flex min-h-[48px] flex-wrap items-center justify-start gap-4 pt-12 sm:pt-14"
    >
      <Link
        href="/contact"
        className="inline-flex min-w-[140px] items-center justify-center bg-neutral-200 px-8 py-3 text-[13px] font-semibold uppercase tracking-wide text-text-dark transition-opacity hover:opacity-90 sm:text-[14px]"
      >
        Enquire
      </Link>
      <Link
        href={brochureUrl}
        className="inline-flex min-w-[140px] items-center justify-center px-8 py-3 text-[13px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 sm:text-[14px]"
        style={{ backgroundColor: themeColor }}
      >
        Download Brochure
      </Link>
    </AnimateInView>
  )
}
