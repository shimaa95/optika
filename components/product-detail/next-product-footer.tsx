import Image from "next/image"
import Link from "next/link"
import { AnimateInView } from "@/components/product-detail/animate-in-view"
import {
  getAcutusProductPath,
  type ProductDetailData,
} from "@/lib/products/product-detail"

interface NextProductFooterProps {
  sequenceNumber: number
  name: string
  subtitle: string
  footer: ProductDetailData["footer"]
  nextProduct?: ProductDetailData["nextProduct"]
}

export function NextProductFooter({
  sequenceNumber,
  name,
  subtitle,
  footer,
  nextProduct,
}: NextProductFooterProps) {
  const displayName = nextProduct?.name ?? name
  const displaySubtitle = nextProduct?.subtitle ?? subtitle
  const discoverHref = nextProduct
    ? getAcutusProductPath(nextProduct.slug)
    : footer.discoverNextHref

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative min-h-[clamp(320px,48vw,520px)] w-full">
        <Image
          src={footer.imageSrc}
          alt={footer.imageAlt}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden />
        <AnimateInView className="relative z-10 flex min-h-[clamp(320px,48vw,520px)] flex-col items-center justify-center px-6 py-20 text-center sm:px-8">
          <p className="text-[14px] tracking-[0.2em] text-white">— {sequenceNumber} —</p>
          <Link href={discoverHref} className="flex flex-col items-center group">
            <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-bold uppercase leading-[1.05] tracking-[0.03em] text-white transition-opacity group-hover:opacity-75">
              {displayName}
            </h2>
            <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition-opacity group-hover:opacity-75 sm:text-[13px]">
              {displaySubtitle}
            </p>
          </Link>
          <Link
            href={discoverHref}
            className="mt-6 text-[13px] text-white underline underline-offset-4 transition-opacity hover:opacity-75 sm:text-[14px]"
          >
            Discover Next
          </Link>
          <Link
            href={footer.backToProductsHref}
            className="mt-8 inline-flex min-w-[200px] items-center justify-center bg-white px-8 py-3 text-[13px] font-semibold text-text-dark transition-opacity hover:opacity-90 sm:text-[14px]"
          >
            Back to Products
          </Link>
        </AnimateInView>
      </div>
    </section>
  )
}
