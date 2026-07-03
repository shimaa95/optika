export type TryOnSwatchId = "brown" | "purple" | "navy" | "green" | "rose" | "amber" | "gray" | "teal"

export interface TryOnSwatch {
  id: TryOnSwatchId
  /** Display name shown under swatches when selected */
  name: string
  gradient: string
  lensHex: string
  lensOpacity: number
}

export const TRY_ON_SWATCHES: TryOnSwatch[] = [
  {
    id: "brown",
    name: "Brown",
    gradient: "linear-gradient(145deg, #8b2635 0%, #5c4033 100%)",
    lensHex: "#7a2e3a",
    lensOpacity: 0.42,
  },
  {
    id: "purple",
    name: "Purple",
    gradient: "linear-gradient(145deg, #9b6fd4 0%, #6b3fa0 55%, #4a2878 100%)",
    lensHex: "#8b5cf6",
    lensOpacity: 0.48,
  },
  {
    id: "navy",
    name: "Navy",
    gradient: "linear-gradient(145deg, #3730a3 0%, #1e1b4b 100%)",
    lensHex: "#312e81",
    lensOpacity: 0.45,
  },
  {
    id: "green",
    name: "Forest Green",
    gradient: "linear-gradient(145deg, #16a34a 0%, #14532d 100%)",
    lensHex: "#15803d",
    lensOpacity: 0.44,
  },
  {
    id: "rose",
    name: "Rose",
    gradient: "linear-gradient(145deg, #fb7185 0%, #be123c 55%, #881337 100%)",
    lensHex: "#f43f5e",
    lensOpacity: 0.40,
  },
  {
    id: "amber",
    name: "Amber",
    gradient: "linear-gradient(145deg, #f59e0b 0%, #b45309 55%, #78350f 100%)",
    lensHex: "#d97706",
    lensOpacity: 0.43,
  },
  {
    id: "gray",
    name: "Smoke Gray",
    gradient: "linear-gradient(145deg, #9ca3af 0%, #4b5563 55%, #1f2937 100%)",
    lensHex: "#6b7280",
    lensOpacity: 0.50,
  },
  {
    id: "teal",
    name: "Teal",
    gradient: "linear-gradient(145deg, #2dd4bf 0%, #0f766e 55%, #134e4a 100%)",
    lensHex: "#14b8a6",
    lensOpacity: 0.45,
  },
]

export function getSwatch(id: TryOnSwatchId): TryOnSwatch {
  return TRY_ON_SWATCHES.find((s) => s.id === id) ?? TRY_ON_SWATCHES[1]!
}
