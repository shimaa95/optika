import type { FacePose } from "./face-pose"

export interface OverlayCanvasSize {
  /** CSS layout width (px) */
  cssWidth: number
  /** CSS layout height (px) */
  cssHeight: number
  /** Backing-store width */
  bufferWidth: number
  /** Backing-store height */
  bufferHeight: number
}

/** Sync backing store to the element's layout box; returns dimensions used for drawing */
export function syncOverlayCanvasSize(canvas: HTMLCanvasElement): OverlayCanvasSize | null {
  const rect = canvas.getBoundingClientRect()
  const cssWidth = Math.max(1, Math.floor(rect.width))
  const cssHeight = Math.max(1, Math.floor(rect.height))

  if (rect.width < 1 || rect.height < 1) return null

  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1
  const bufferWidth = Math.max(1, Math.floor(cssWidth * dpr))
  const bufferHeight = Math.max(1, Math.floor(cssHeight * dpr))

  if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
    canvas.width = bufferWidth
    canvas.height = bufferHeight
  }

  return { cssWidth, cssHeight, bufferWidth, bufferHeight }
}

/** Normalized landmark → canvas buffer pixels (0–1 × canvas.width/height) */
export function landmarkToCanvas(
  landmark: { x: number; y: number },
  canvasWidth: number,
  canvasHeight: number,
) {
  return {
    x: landmark.x * canvasWidth,
    y: landmark.y * canvasHeight,
  }
}

export interface ScaledFacePose {
  noseX: number
  noseY: number
  leftX: number
  leftY: number
  rightX: number
  rightY: number
  /** Interpupillary distance in canvas buffer pixels (left pupil → right pupil) */
  eyeDistancePx: number
  rotation: number
}

export function scaleFacePoseToCanvas(facePose: FacePose, canvas: HTMLCanvasElement): ScaledFacePose {
  const w = canvas.width
  const h = canvas.height
  const nose = landmarkToCanvas(facePose.glassesAnchor, w, h)
  const left = landmarkToCanvas(facePose.leftPupil, w, h)
  const right = landmarkToCanvas(facePose.rightPupil, w, h)

  return {
    noseX: nose.x,
    noseY: nose.y,
    leftX: left.x,
    leftY: left.y,
    rightX: right.x,
    rightY: right.y,
    eyeDistancePx: Math.hypot(right.x - left.x, right.y - left.y),
    rotation: Math.atan2(right.y - left.y, right.x - left.x),
  }
}

/** Bright red dot on nose bridge — confirms tracking + coordinate math */
export function drawNoseDebugDot(ctx: CanvasRenderingContext2D, noseX: number, noseY: number) {
  ctx.save()
  ctx.beginPath()
  ctx.arc(noseX, noseY, 10, 0, 2 * Math.PI)
  ctx.fillStyle = "#ff0000"
  ctx.fill()
  ctx.strokeStyle = "#ffffff"
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.restore()
}

/** Corner marker so a blank canvas is obvious when the loop runs */
export function drawOverlayActiveFallback(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.save()
  ctx.strokeStyle = "rgba(34, 197, 94, 0.85)"
  ctx.lineWidth = 3
  ctx.strokeRect(8, 8, 28, 28)
  ctx.fillStyle = "rgba(34, 197, 94, 0.35)"
  ctx.font = "11px system-ui, inter-serif"
  ctx.fillText("overlay", 12, h - 12)
  ctx.restore()
}
