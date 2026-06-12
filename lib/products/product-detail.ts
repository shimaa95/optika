export interface ProductMeter {
  label: string
  value: number
}

export interface ProductSpecRow {
  label: string
  value: string
  variant: "green" | "white" | "gray"
}

export interface ProductDetailData {
  slug: string
  name: string
  subtitle: string
  sequenceNumber: number
  hero: {
    eyebrow: string
    headline: string
    /** Full-bleed hero background — swap per lens/product (Sanity-ready) */
    backgroundSrc: string
    backgroundAlt: string
    /** Optional focal point, e.g. "center 40%" */
    backgroundPosition?: string
  }
  /** Lens overlay graphic — swap per lens/product (Sanity-ready) */
  lensGraphic: {
    imageSrc: string
    imageAlt: string
  }
  idealFor: string
  characteristics: string
  meters: ProductMeter[]
  specs: ProductSpecRow[]
  whyTitle: string
  whyPoints: string[]
  brochureUrl: string
  questions: {
    title: string
    subtitle: string
    imageSrc: string
    imageAlt: string
  }
  contact: {
    left: { title: string; description: string; buttonLabel: string; href: string }
    right: { title: string; description: string; buttonLabel: string; href: string }
  }
  footer: {
    imageSrc: string
    imageAlt: string
    discoverNextHref: string
    backToProductsHref: string
  }
  nextProduct?: {
    slug: string
    name: string
    subtitle: string
  }
}

export const ACUTUS_PRODUCT_BASE_PATH = "/products/acutus"
export const ACUTUS_PRODUCT_DETAIL_SLUG = "actus-due-plus"

export function getAcutusProductPath(slug: string): string {
  return `${ACUTUS_PRODUCT_BASE_PATH}/${slug}`
}

const actusDuePlus: ProductDetailData = {
  slug: ACUTUS_PRODUCT_DETAIL_SLUG,
  name: "ACTUS DUE PLUS",
  subtitle: "ORGANIC RX PROGRESSIVE",
  sequenceNumber: 5,
  hero: {
    eyebrow: "We do our best",
    headline: "SO YOU NEVER MISS A MOMENT",
    backgroundSrc: "/acutus-plus.jpg",
    backgroundAlt: "Person reading a book in warm light",
    backgroundPosition: "center 32%",
  },
  lensGraphic: {
    imageSrc: "/lens.png",
    imageAlt: "Acutus Plus lens graphic with landscape and phone wireframe",
  },
  idealFor:
    "Duo+ is a premium individual progressive lens designed for all demanding wearers who require quick adaptation and maximum visual performance.",
  characteristics:
    "The individual modern design and premium quality of ExactDS Duo+ progressive lenses is based on the revolutionary Camber technology. This innovative progressive lens provides an above standard comfort zone at all distances, near, far and medium distance vision.",
  meters: [
    { label: "FAR", value: 95 },
    { label: "INTERMEDIATE", value: 95 },
    { label: "NEAR", value: 95 },
    { label: "COMFORT", value: 95 },
  ],
  specs: [
    { label: "Technology", value: "Freeform", variant: "green" },
    { label: "Free-form design", value: "Individual", variant: "white" },
    {
      label: "Corridor/MFH",
      value: "(R)21mm (S)18mm (I)17 (U)15mm",
      variant: "gray",
    },
    { label: "Addition", value: "0.50-4.00 / 0.25", variant: "white" },
    { label: "Variable inset", value: "0-4 mm, step 0.5", variant: "green" },
  ],
  whyTitle: "Why Acutus DUE+",
  whyPoints: [
    "Instant adaptation to Maximise visual acuity",
    "Natural Curvature Principle (top to bottom increases)",
    "Widest possible reading zone with instant focus",
    "No distortion, swimming or jumping of images. In all directions of view (including side views)",
  ],
  brochureUrl: "#",
  questions: {
    title: "Still have questions?",
    subtitle: "Questions about lenses or ordering or even about us?",
    imageSrc: "/actushero.png",
    imageAlt: "Team members in a professional meeting",
  },
  contact: {
    left: {
      title: "Contact us",
      description:
        "Reach out straight to our mail and our teams will reach back right away",
      buttonLabel: "Contact us",
      href: "/contact",
    },
    right: {
      title: "Enquiry from",
      description:
        "Fill out our enquiry and select from our pre defined categories and specify your requirements, so we deliver faster, more precise response to your Enquiry.",
      buttonLabel: "Fill Form",
      href: "/contact",
    },
  },
  footer: {
    imageSrc: "/model1.png",
    imageAlt: "Close-up of a person wearing glasses",
    discoverNextHref: "/products",
    backToProductsHref: "/products",
  },
  nextProduct: {
    slug: "actus-due-plus",
    name: "ACTUS DUE PLUS",
    subtitle: "ORGANIC RX PROGRESSIVE",
  },
}

const products: Record<string, ProductDetailData> = {
  [ACUTUS_PRODUCT_DETAIL_SLUG]: actusDuePlus,
}

export function getProductBySlug(slug: string): ProductDetailData | undefined {
  return products[slug]
}

export function getAllProductSlugs(): string[] {
  return Object.keys(products)
}
