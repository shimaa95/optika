export type LensProductId = "gen-s" | "xtractive"

export type LensColorId =
  | "gray"
  | "brown"
  | "graphite-green"
  | "emerald"
  | "sapphire"
  | "amethyst"
  | "amber"
  | "ruby"

export type GenderFilter = "female" | "male" | "unisex"
export type StyleFilter = "iconic" | "oversized" | "discreet" | "flashy"
export type FaceShape = "oval" | "round" | "square" | "heart" | "oblong"
export type SkinTone = "fair" | "medium" | "dark"

export interface LensColor {
  id: LensColorId
  label: string
  productIds: LensProductId[]
  swatch: string
  /** RGB tint at full activation */
  tint: [number, number, number]
}

export interface LensProduct {
  id: LensProductId
  label: string
  description: string
}

export interface FrameStyle {
  id: StyleFilter
  label: string
}

export interface FrameColor {
  id: string
  label: string
  value: string
}

export interface Brand {
  id: string
  label: string
}

export interface TryOnFrame {
  id: string
  name: string
  brandId: string
  gender: GenderFilter[]
  style: StyleFilter
  frameColorId: string
  lensProductIds: LensProductId[]
  /** SVG path for frame overlay (viewBox 0 0 400 120) */
  framePath: string
}

export const LENS_PRODUCTS: LensProduct[] = [
  {
    id: "gen-s",
    label: "Acutus Gen S",
    description: "Everyday photochromic lenses — responsive to light.",
  },
  {
    id: "xtractive",
    label: "Acutus XTRActive",
    description: "Extra darkness outdoors for bright light sensitivity.",
  },
]

export const LENS_COLORS: LensColor[] = [
  { id: "gray", label: "Gray", productIds: ["gen-s", "xtractive"], swatch: "#9ca3af", tint: [107, 114, 128] },
  { id: "brown", label: "Brown", productIds: ["gen-s", "xtractive"], swatch: "#8b6914", tint: [139, 105, 20] },
  {
    id: "graphite-green",
    label: "Graphite Green",
    productIds: ["gen-s", "xtractive"],
    swatch: "#4a5d4a",
    tint: [74, 93, 74],
  },
  { id: "emerald", label: "Emerald", productIds: ["gen-s"], swatch: "#2d6a4f", tint: [45, 106, 79] },
  { id: "sapphire", label: "Sapphire", productIds: ["gen-s"], swatch: "#1e3a5f", tint: [30, 58, 95] },
  { id: "amethyst", label: "Amethyst", productIds: ["gen-s"], swatch: "#6b4c7a", tint: [107, 76, 122] },
  { id: "amber", label: "Amber", productIds: ["gen-s"], swatch: "#c4841d", tint: [196, 132, 29] },
  { id: "ruby", label: "Ruby", productIds: ["gen-s"], swatch: "#9b2335", tint: [155, 35, 53] },
]

export const FRAME_STYLES: FrameStyle[] = [
  { id: "iconic", label: "Iconic" },
  { id: "oversized", label: "Oversized" },
  { id: "discreet", label: "Discreet" },
  { id: "flashy", label: "Flashy" },
]

export const GENDERS: { id: GenderFilter; label: string }[] = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "unisex", label: "Unisex" },
]

export const FRAME_COLORS: FrameColor[] = [
  { id: "beige", label: "Beige", value: "#F5F5DC" },
  { id: "black", label: "Black", value: "#1a1a1a" },
  { id: "blue", label: "Blue", value: "#2563eb" },
  { id: "brown", label: "Brown", value: "#7d5446" },
  { id: "gold", label: "Gold", value: "#c9a227" },
  { id: "gray", label: "Gray", value: "#6b7280" },
  { id: "green", label: "Green", value: "#166534" },
  { id: "ivory", label: "Ivory", value: "#FFFFF0" },
  { id: "orange", label: "Orange", value: "#ea580c" },
  { id: "pink", label: "Pink", value: "#db2777" },
  { id: "red", label: "Red", value: "#dc2626" },
  { id: "silver", label: "Silver", value: "#c0c0c0" },
  { id: "transparent", label: "Transparent", value: "#e5e7eb" },
  { id: "tortoise", label: "Tortoise", value: "#7d5446" },
  { id: "white", label: "White", value: "#f5f5f5" },
  { id: "yellow", label: "Yellow", value: "#eab308" },
  { id: "violet", label: "Violet", value: "#7c3aed" },
]

export const BRANDS: Brand[] = [
  { id: "ray-ban", label: "Ray-Ban" },
  { id: "oakley", label: "Oakley" },
  { id: "persol", label: "Persol" },
  { id: "oliver-peoples", label: "Oliver Peoples" },
  { id: "vogue", label: "Vogue Eyewear" },
  { id: "michael-kors", label: "Michael Kors" },
  { id: "dolce-gabbana", label: "Dolce & Gabbana" },
  { id: "prada", label: "Prada" },
  { id: "versace", label: "Versace" },
  { id: "optika", label: "Optika" },
]

const classicPath =
  "M 20 55 Q 60 20 120 28 L 280 28 Q 340 20 380 55 L 380 75 Q 340 95 280 88 L 120 88 Q 60 95 20 75 Z"
const aviatorPath =
  "M 30 50 Q 100 10 200 25 Q 300 10 370 50 L 365 70 Q 300 90 200 78 Q 100 90 35 70 Z M 198 52 L 202 52 L 202 68 L 198 68 Z"
const roundPath =
  "M 70 50 A 55 45 0 1 1 69.9 50 M 250 50 A 55 45 0 1 1 249.9 50 M 198 52 L 202 52 L 202 68 L 198 68 Z"
const catPath =
  "M 25 60 L 80 25 L 140 35 L 200 30 L 260 35 L 320 25 L 375 60 L 370 78 L 320 88 L 200 82 L 80 88 L 30 78 Z"

export const FRAMES: TryOnFrame[] = [
  {
    id: "rb-wayfarer",
    name: "Classic Wayfarer",
    brandId: "ray-ban",
    gender: ["male", "female", "unisex"],
    style: "iconic",
    frameColorId: "black",
    lensProductIds: ["gen-s", "xtractive"],
    framePath: classicPath,
  },
  {
    id: "rb-aviator",
    name: "Aviator",
    brandId: "ray-ban",
    gender: ["male", "unisex"],
    style: "iconic",
    frameColorId: "gold",
    lensProductIds: ["gen-s", "xtractive"],
    framePath: aviatorPath,
  },
  {
    id: "ok-holbrook",
    name: "Holbrook",
    brandId: "oakley",
    gender: ["male", "unisex"],
    style: "oversized",
    frameColorId: "black",
    lensProductIds: ["xtractive"],
    framePath: classicPath,
  },
  {
    id: "persol-round",
    name: "Round Classic",
    brandId: "persol",
    gender: ["female", "unisex"],
    style: "discreet",
    frameColorId: "gold",
    lensProductIds: ["gen-s"],
    framePath: roundPath,
  },
  {
    id: "op-tortoise",
    name: "Tortoise Square",
    brandId: "oliver-peoples",
    gender: ["female", "male"],
    style: "discreet",
    frameColorId: "tortoise",
    lensProductIds: ["gen-s"],
    framePath: classicPath,
  },
  {
    id: "vogue-cat",
    name: "Cat Eye",
    brandId: "vogue",
    gender: ["female"],
    style: "flashy",
    frameColorId: "black",
    lensProductIds: ["gen-s"],
    framePath: catPath,
  },
  {
    id: "mk-glam",
    name: "Glam Oversized",
    brandId: "michael-kors",
    gender: ["female"],
    style: "oversized",
    frameColorId: "gold",
    lensProductIds: ["gen-s", "xtractive"],
    framePath: catPath,
  },
  {
    id: "dng-bold",
    name: "Bold Square",
    brandId: "dolce-gabbana",
    gender: ["female", "male"],
    style: "flashy",
    frameColorId: "black",
    lensProductIds: ["gen-s"],
    framePath: classicPath,
  },
  {
    id: "opt-minimal",
    name: "Minimal Rimless",
    brandId: "optika",
    gender: ["male", "female", "unisex"],
    style: "discreet",
    frameColorId: "silver",
    lensProductIds: ["gen-s", "xtractive"],
    framePath: roundPath,
  },
  {
    id: "prada-slim",
    name: "Slim Rectangle",
    brandId: "prada",
    gender: ["female", "male"],
    style: "iconic",
    frameColorId: "black",
    lensProductIds: ["gen-s"],
    framePath: classicPath,
  },
  {
    id: "versace-gold",
    name: "Medusa Gold",
    brandId: "versace",
    gender: ["female", "male"],
    style: "flashy",
    frameColorId: "gold",
    lensProductIds: ["gen-s"],
    framePath: aviatorPath,
  },
  {
    id: "opt-sport",
    name: "Sport Wrap",
    brandId: "optika",
    gender: ["male", "unisex"],
    style: "oversized",
    frameColorId: "blue",
    lensProductIds: ["xtractive"],
    framePath: classicPath,
  },
]

export const TOUR_STEPS = [
  "Get advice on the best frames to suit your face and style.",
  "Try all our lens colors to get the best match for your frames.",
  "Swap between your selected frames to find your favorite.",
  "See how your lenses look in all light conditions, from indoors to bright sun.",
  "Take a selfie and find your nearest Optika partner.",
  "Select from our full range of frames.",
]

export const FACE_SHAPES: { id: FaceShape; label: string }[] = [
  { id: "oval", label: "Oval" },
  { id: "round", label: "Round" },
  { id: "square", label: "Square" },
  { id: "heart", label: "Heart" },
  { id: "oblong", label: "Oblong" },
]

export const SKIN_TONES: { id: SkinTone; label: string }[] = [
  { id: "fair", label: "Fair" },
  { id: "medium", label: "Medium" },
  { id: "dark", label: "Dark" },
]

/** Max tint opacity at full outdoor activation (0–1) */
export function activationOpacity(activation: number, productId: LensProductId): number {
  const base = productId === "xtractive" ? 0.88 : 0.72
  const t = Math.max(0, Math.min(100, activation)) / 100
  return t * t * base
}

export function filterFrames(opts: {
  gender?: GenderFilter | null
  style?: StyleFilter | null
  frameColorId?: string | null
  brandId?: string | null
  lensProductId: LensProductId
}): TryOnFrame[] {
  return FRAMES.filter((f) => {
    if (!f.lensProductIds.includes(opts.lensProductId)) return false
    if (opts.gender && !f.gender.includes(opts.gender)) return false
    if (opts.style && f.style !== opts.style) return false
    if (opts.frameColorId && f.frameColorId !== opts.frameColorId) return false
    if (opts.brandId && f.brandId !== opts.brandId) return false
    return true
  })
}

export function recommendFrames(
  faceShape: FaceShape,
  skinTone: SkinTone,
  genders: GenderFilter[],
  lensProductId: LensProductId,
): TryOnFrame[] {
  const styleMap: Record<FaceShape, StyleFilter> = {
    oval: "iconic",
    round: "discreet",
    square: "iconic",
    heart: "flashy",
    oblong: "oversized",
  }
  const preferred = styleMap[faceShape] ?? "iconic"
  let pool = filterFrames({ lensProductId })
  if (genders.length) {
    pool = pool.filter((f) => genders.some((g) => f.gender.includes(g)))
  }
  const scored = pool.map((f) => {
    let score = 0
    if (f.style === preferred) score += 3
    if (skinTone === "fair" && f.frameColorId === "gold") score += 1
    if (skinTone === "dark" && f.frameColorId === "silver") score += 1
    if (skinTone === "medium" && f.frameColorId === "tortoise") score += 1
    return { f, score }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 4).map((s) => s.f)
}
