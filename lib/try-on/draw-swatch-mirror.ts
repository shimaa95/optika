import type { FacePose } from "./face-pose"
import type { TryOnSwatch } from "./swatches"

export interface SwatchMirrorState {
  swatch: TryOnSwatch
  activation: number
  showFaceGuide: boolean
  mirrorFlipped: boolean
  facePose?: FacePose | null
  /** Draw landmark debug dots on the feed */
  showLandmarkDebug?: boolean
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "")
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

function activationStrength(activation: number, baseOpacity: number): number {
  const t = Math.max(0, Math.min(100, activation)) / 100
  return t * t * baseOpacity
}

export function drawSwatchMirror(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  width: number,
  height: number,
  state: SwatchMirrorState,
) {
  ctx.save()
  if (state.mirrorFlipped) {
    ctx.translate(width, 0)
    ctx.scale(-1, 1)
  }

  const vw = video.videoWidth || width
  const vh = video.videoHeight || height
  const scale = Math.max(width / vw, height / vh)
  const sw = vw * scale
  const sh = vh * scale
  const sx = (width - sw) / 2
  const sy = (height - sh) / 2
  ctx.drawImage(video, sx, sy, sw, sh)
  ctx.restore()

  drawLensTint(ctx, width, height, state)

  if (state.facePose && state.showLandmarkDebug) {
    drawLandmarkDebug(ctx, width, height, state.facePose)
  }

  if (state.showFaceGuide) {
    drawFaceOval(ctx, width, height)
  }
}

function drawLandmarkDebug(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  pose: FacePose,
) {
  const toPx = (p: { x: number; y: number }) => ({ x: p.x * w, y: p.y * h })

  const leftPupil = toPx(pose.leftPupil)
  const rightPupil = toPx(pose.rightPupil)
  const nose = toPx(pose.noseBridge)
  const leftEar = toPx(pose.leftEar)
  const rightEar = toPx(pose.rightEar)

  const dot = (x: number, y: number, color: string, r = 4) => {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
  }

  ctx.save()
  dot(leftPupil.x, leftPupil.y, "#22d3ee", 5)
  dot(rightPupil.x, rightPupil.y, "#22d3ee", 5)
  dot(nose.x, nose.y, "#60a5fa", 5)
  dot(leftEar.x, leftEar.y, "#fb923c", 4)
  dot(rightEar.x, rightEar.y, "#fb923c", 4)

  ctx.strokeStyle = "rgba(34, 197, 94, 0.6)"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(leftPupil.x, leftPupil.y)
  ctx.lineTo(rightPupil.x, rightPupil.y)
  ctx.stroke()
  ctx.restore()
}

function drawLensTint(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  state: SwatchMirrorState,
) {
  const opacity = activationStrength(state.activation, state.swatch.lensOpacity)
  if (opacity < 0.02) return

  const pose = state.facePose
  const [r, g, b] = hexToRgb(state.swatch.lensHex)

  const cx = pose ? pose.eyeCenter.x * w : w / 2
  const cy = pose ? pose.eyeCenter.y * h : h * 0.4
  const gap = pose ? pose.eyeDistance * w * 0.45 : w * 0.09
  const lensRx = pose ? pose.eyeDistance * w * 0.55 : w * 0.11
  const lensRy = pose ? pose.eyeDistance * h * 0.85 : h * 0.065

  ctx.save()
  ctx.globalAlpha = opacity
  ctx.fillStyle = `rgb(${r},${g},${b})`
  ctx.beginPath()
  ctx.ellipse(cx - gap, cy, lensRx, lensRy, pose?.rotation ?? 0, 0, Math.PI * 2)
  ctx.ellipse(cx + gap, cy, lensRx, lensRy, pose?.rotation ?? 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

function drawFaceOval(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cx = w / 2
  const cy = h * 0.42
  const rx = w * 0.22
  const ry = h * 0.28
  ctx.save()
  ctx.strokeStyle = "rgba(255,255,255,0.75)"
  ctx.lineWidth = 1.5
  ctx.setLineDash([6, 5])
  ctx.beginPath()
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.setLineDash([])
  ctx.restore()
}

export function drawSwatchStaticImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  state: SwatchMirrorState,
) {
  const iw = img.naturalWidth
  const ih = img.naturalHeight
  const scale = Math.max(width / iw, height / ih)
  const sw = iw * scale
  const sh = ih * scale
  const sx = (width - sw) / 2
  const sy = (height - sh) / 2
  ctx.drawImage(img, sx, sy, sw, sh)
  drawLensTint(ctx, width, height, state)
}
