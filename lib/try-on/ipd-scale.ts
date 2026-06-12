/**
 * Dynamic glasses sizing from Interpupillary Distance (IPD).
 * IPD is measured in canvas pixels between pupil centers; ~63 mm average in adults.
 * As the user moves closer/farther from the camera, pixel IPD changes and the frame scales with it.
 */

/** Reference adult IPD (mm) — for docs / future real-world calibration */
export const AVERAGE_IPD_MM = 63

/** Temple-to-temple frame width ≈ IPD (px) × this ratio (2.1–2.4 for typical GLB padding) */
export const IPD_TO_FRAME_WIDTH_RATIO = 2.3

/** Frame height / width (matches GLB render aspect) */
export const GLASSES_FRAME_ASPECT = 133 / 400

export const MIN_FRAME_WIDTH_PX = 180
export const MAX_FRAME_WIDTH_PX = 680

export interface GlassesFrameSize {
  width: number
  height: number
  /** Measured IPD in canvas buffer pixels */
  ipdPixels: number
}

export function frameSizeFromIpdPixels(ipdPixels: number): GlassesFrameSize {
  const width = Math.min(
    MAX_FRAME_WIDTH_PX,
    Math.max(MIN_FRAME_WIDTH_PX, ipdPixels * IPD_TO_FRAME_WIDTH_RATIO),
  )
  const height = width * GLASSES_FRAME_ASPECT

  return { width, height, ipdPixels }
}

const REFERENCE_FRAME_WIDTH_PX = 400

/** Uniform scale for live Three.js overlay (tuned to match IPD-based 2D sizing) */
export function scale3DFromIpdPixels(ipdPixels: number): number {
  const { width } = frameSizeFromIpdPixels(ipdPixels)
  return (width / REFERENCE_FRAME_WIDTH_PX) * 1.12
}
