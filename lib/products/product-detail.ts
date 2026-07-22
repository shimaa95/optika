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
  themeColor: string
  hero: {
    /** Full-bleed hero background — swap per lens/product (Sanity-ready) */
    backgroundSrc: string
    backgroundAlt: string
    /** CSS `object-position` (e.g. "center 65%"). Optional. */
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

export const actusDuePlus: ProductDetailData = {
  slug: ACUTUS_PRODUCT_DETAIL_SLUG,
  name: "ACUTUS PLUS",
  subtitle: "ORGANIC RX PROGRESSIVE",
  sequenceNumber: 1,
  themeColor: "#2b64e3",
  hero: {
    backgroundSrc: "/acutusplus.jpeg",
    backgroundAlt: "Person reading a book in warm light",
  },
  lensGraphic: {
    imageSrc: "/Lens1.png",
    imageAlt: "Acutus Plus lens graphic with landscape and phone wireframe",
  },
  idealFor:
    "ACUTUS PLUS is a premium, highly personalised progressive lens.",
  characteristics:
    "The individual modern design and premium quality of ExactDS Duo+ progressive lenses is based on the revolutionary Camber technology. This innovative progressive lens provides an above standard comfort zone at all distances, near, far and medium distance vision.",
  meters: [
    { label: "FAR", value: 80 },
    { label: "INTERMEDIATE", value: 80 },
    { label: "NEAR", value: 80 },
    { label: "COMFORT", value: 80 },
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
  whyTitle: "Why ACUTUS PLUS",
  whyPoints: [
    "Dynamic vision",
    "Wide distance fields",
    "Ideal for outdoor activities",
  ],
  brochureUrl: "#",
  questions: {
    title: "Still have questions?",
    subtitle: "Questions about lenses or ordering or even about us?",
    imageSrc: "/acutushero.jpeg",
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
      href: "/contact/enquiry",
    },
  },
  footer: {
    imageSrc: "/model1.png",
    imageAlt: "Close-up of a person wearing glasses",
    discoverNextHref: "/products",
    backToProductsHref: "/products",
  },
}

const otherProductsData = [
  {
    slug: "acutus-smart",
    name: "ACUTUS SMART",
    subtitle: "DIGITAL SINGLE VISION",
    themeColor: "#1e40af",
    idealFor: "Precision surfacing for crisp everyday clarity with minimal peripheral distortion.",
    whyPoints: ["Sharp central vision", "Thin profile options", "Fast adaptation"],
  },
  {
    slug: "acutus-elite",
    name: "ACUTUS ELITE",
    subtitle: "HIGH-INDEX VARIFOCAL",
    themeColor: "#0369a1",
    idealFor: "Advanced corridor design balancing near and intermediate zones for demanding lifestyles.",
    whyPoints: ["Smooth transitions", "Stable reading zone", "Premium coatings"],
  },
  {
    slug: "acutus-air",
    name: "ACUTUS AIR",
    subtitle: "ULTRA-LIGHT ORGANIC",
    themeColor: "#0d9488",
    idealFor: "Featherweight blanks engineered for comfort without compromising optical performance.",
    whyPoints: ["Reduced edge thickness", "Comfortable all-day wear", "Modern aesthetics"],
  },
  {
    slug: "acutus-sharp",
    name: "ACUTUS SHARP",
    subtitle: "OFFICE PROGRESSIVE",
    themeColor: "#b45309",
    idealFor: "Optimised intermediate and near zones for screens, desks, and collaborative workspaces.",
    whyPoints: ["Wide intermediate band", "Reduced neck tilt", "Screen clarity"],
  },
  {
    slug: "acutus-drive",
    name: "ACUTUS DRIVE",
    subtitle: "POLARIZED SUN RX",
    themeColor: "#be123c",
    idealFor: "Glare-controlled outdoor lens with faithful colour perception behind the wheel.",
    whyPoints: ["Glare reduction", "True colour perception", "Durability outdoors"],
  },
  {
    slug: "acutus-kids",
    name: "ACUTUS KIDS",
    subtitle: "IMPACT-SAFE ORGANIC",
    themeColor: "#a21caf",
    idealFor: "Tough yet light lenses tailored for active younger wearers and everyday safety.",
    whyPoints: ["Impact-minded materials", "Easy-care surfaces", "Stable vision"],
  },
  {
    slug: "acutus-night",
    name: "ACUTUS NIGHT",
    subtitle: "BLUE-LIGHT OPTIMIZED",
    themeColor: "#4338ca",
    idealFor: "Designed for evening screen sessions with tuned transmission for visual comfort.",
    whyPoints: ["Comfort under LEDs", "Reduced stray glare", "Balanced contrast"],
  },
  {
    slug: "acutus-sport",
    name: "ACUTUS SPORT",
    subtitle: "WRAP OPTIMIZED RX",
    themeColor: "#047857",
    idealFor: "Compensation geometry for curved frames so motion stays sharp at every angle.",
    whyPoints: ["Stable gaze during motion", "Wide field wrap", "Secure peripheral cues"],
  },
  {
    slug: "acutus-read",
    name: "ACUTUS READ",
    subtitle: "NEAR-VISION BOOST",
    themeColor: "#0f766e",
    idealFor: "Dedicated enhancement for sustained reading and fine-detail tasks at close range.",
    whyPoints: ["Expanded near zone", "Comfortable posture", "Crisp small print"],
  },
  {
    slug: "acutus-custom",
    name: "ACUTUS CUSTOM",
    subtitle: "FREEFORM DIGITAL",
    themeColor: "#1d4ed8",
    idealFor: "Fully personalised freeform computation mapped to frame fit and wearing posture.",
    whyPoints: ["Individual optimisation", "Predictable performance", "Premium finishing"],
  }
]

const productsList: ProductDetailData[] = [
  actusDuePlus,
  ...otherProductsData.map((data, index) => ({
    ...actusDuePlus,
    slug: data.slug,
    name: data.name,
    subtitle: data.subtitle,
    themeColor: data.themeColor,
    idealFor: data.idealFor,
    whyTitle: `Why ${data.name}`,
    whyPoints: data.whyPoints,
    sequenceNumber: index + 2,
  }))
]

// Link nextProducts in a loop
productsList.forEach((product, i) => {
  const nextP = productsList[(i + 1) % productsList.length]
  product.nextProduct = {
    slug: nextP.slug,
    name: nextP.name,
    subtitle: nextP.subtitle,
  }
})

const products: Record<string, ProductDetailData> = {}
productsList.forEach(p => {
  products[p.slug] = p
})

export function getProductBySlug(slug: string): ProductDetailData | undefined {
  return products[slug]
}

export function getAllProductSlugs(): string[] {
  return Object.keys(products)
}
