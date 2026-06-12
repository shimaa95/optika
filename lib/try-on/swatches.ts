export type TryOnSwatchId = "brown" | "purple" | "navy"

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
]

export function getSwatch(id: TryOnSwatchId): TryOnSwatch {
  return TRY_ON_SWATCHES.find((s) => s.id === id) ?? TRY_ON_SWATCHES[1]!
}
