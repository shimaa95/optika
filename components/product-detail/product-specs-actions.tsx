import Link from "next/link"
import { AnimateInView } from "@/components/product-detail/animate-in-view"

interface ProductSpecsActionsProps {
  brochureUrl: string
}

export function ProductSpecsActions({ brochureUrl }: ProductSpecsActionsProps) {
  return (
    <AnimateInView
      delay={0.1}
      className="mt-auto flex min-h-[48px] flex-wrap items-center justify-between gap-6 pt-12 sm:pt-14"
    >
      <Link
        href={brochureUrl}
        className="text-[14px] font-medium text-text-dark underline-offset-4 transition-opacity hover:opacity-70 hover:underline sm:text-[15px]"
      >
        Download Brochure
      </Link>
      <Link
        href="/contact"
        className="inline-flex min-w-[140px] items-center justify-center bg-primary-green px-8 py-3 text-[13px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 sm:text-[14px]"
      >
        Enquire
      </Link>
    </AnimateInView>
  )
}
