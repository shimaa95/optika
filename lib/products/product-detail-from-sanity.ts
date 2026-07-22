import { urlFor } from "@/sanity/lib/image"
import {
  actusDuePlus,
  type ProductDetailData,
} from "@/lib/products/product-detail"

/**
 * Shape returned by `ACUTUS_PRODUCT_BY_SLUG_QUERY` in `sanity/lib/queries.ts`.
 * Kept narrow (and loose on the image fields) so the mapper can be the single
 * place that calls `urlFor()`.
 */
export type SanityAcutusProduct = {
  slug: string
  name: string
  subtitle: string
  sequenceNumber: number
  themeColor: string
  hero: {
    background: unknown
    backgroundAlt?: string
    backgroundPosition?: string
  }
  lensGraphic: {
    image: unknown
    imageAlt?: string
  }
  idealFor: string
  characteristics: string
  meters: { label: string; value: number }[]
  specs: { label: string; value: string; variant?: "green" | "white" | "gray" }[]
  whyTitle: string
  whyPoints: string[]
  brochureUrl: string
  footer: {
    image: unknown
    imageAlt?: string
    discoverNextHref?: string
    backToProductsHref?: string
  }
  nextProduct?: { slug: string; name: string; subtitle: string } | null
}

const safeUrl = (source: unknown): string => {
  if (!source) return ""
  try {
    return urlFor(source as Parameters<typeof urlFor>[0]).url()
  } catch {
    return ""
  }
}

/**
 * Map a Sanity `acutusProduct` document to the `ProductDetailData` shape that
 * `components/product-detail/*` already consumes.
 *
 * The `questions` and `contact` blocks are NOT defined in the Sanity schema
 * — they are site-wide UI and live in the static module. We borrow the
 * values from `actusDuePlus` so the layout renders unchanged.
 */
export function acutusProductFromSanity(
  doc: SanityAcutusProduct | null | undefined,
): ProductDetailData | null {
  if (!doc) return null

  const heroBackground = safeUrl(doc.hero?.background)
  const lensImage = safeUrl(doc.lensGraphic?.image)
  const footerImage = safeUrl(doc.footer?.image)

  const specs = (doc.specs ?? []).map((s) => ({
    label: s.label,
    value: s.value,
    variant: (s.variant ?? "white") as "green" | "white" | "gray",
  }))

  const meters = (doc.meters ?? []).map((m) => ({
    label: m.label,
    value: typeof m.value === "number" ? m.value : 0,
  }))

  return {
    slug: doc.slug,
    name: doc.name,
    subtitle: doc.subtitle,
    sequenceNumber: doc.sequenceNumber,
    themeColor: doc.themeColor,
    hero: {
      backgroundSrc: heroBackground || actusDuePlus.hero.backgroundSrc,
      backgroundAlt: doc.hero?.backgroundAlt || doc.name,
      backgroundPosition: doc.hero?.backgroundPosition || undefined,
    },
    lensGraphic: {
      imageSrc: lensImage || actusDuePlus.lensGraphic.imageSrc,
      imageAlt: doc.lensGraphic?.imageAlt || doc.name,
    },
    idealFor: doc.idealFor,
    characteristics: doc.characteristics,
    meters,
    specs,
    whyTitle: doc.whyTitle,
    whyPoints: doc.whyPoints,
    brochureUrl: doc.brochureUrl,
    questions: actusDuePlus.questions,
    contact: actusDuePlus.contact,
    footer: {
      imageSrc: footerImage || actusDuePlus.footer.imageSrc,
      imageAlt: doc.footer?.imageAlt || doc.name,
      discoverNextHref:
        doc.footer?.discoverNextHref ||
        actusDuePlus.footer.discoverNextHref,
      backToProductsHref:
        doc.footer?.backToProductsHref ||
        actusDuePlus.footer.backToProductsHref,
    },
    nextProduct: doc.nextProduct ?? undefined,
  }
}
