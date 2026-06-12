import type { LensColor, LensProductId, TryOnFrame } from "./data"
import { activationOpacity } from "./data"
import { FRAME_COLORS } from "./data"

export interface MirrorDrawState {
  activation: number
  lensColor: LensColor
  lensProductId: LensProductId
  frame: TryOnFrame | null
  showFaceGuide: boolean
  mirrorFlipped: boolean
}

export function drawMirrorFrame(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  width: number,
  height: number,
  state: MirrorDrawState,
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

  if (state.showFaceGuide) {
    drawFaceOval(ctx, width, height)
  }

  if (state.frame) {
    drawGlassesOverlay(ctx, width, height, state)
  }
}

function drawFaceOval(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cx = w / 2
  const cy = h * 0.42
  const rx = w * 0.22
  const ry = h * 0.28
  ctx.save()
  ctx.strokeStyle = "rgba(255,255,255,0.85)"
  ctx.lineWidth = 2
  ctx.setLineDash([8, 6])
  ctx.beginPath()
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.setLineDash([])
  ctx.fillStyle = "rgba(0,0,0,0.35)"
  ctx.font = "13px system-ui, inter-serif"
  ctx.textAlign = "center"
  ctx.fillText("Center your face inside the oval", cx, cy + ry + 28)
  ctx.restore()
}

function drawGlassesOverlay(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  state: MirrorDrawState,
) {
  const frame = state.frame!
  const color = FRAME_COLORS.find((c) => c.id === frame.frameColorId)?.value ?? "#1a1a1a"
  const overlayW = w * 0.72
  const overlayH = overlayW * 0.28
  const x = (w - overlayW) / 2
  const y = h * 0.38 - overlayH / 2

  ctx.save()
  ctx.translate(x, y)
  ctx.scale(overlayW / 400, overlayH / 120)

  const opacity = activationOpacity(state.activation, state.lensProductId)
  const [tr, tg, tb] = state.lensColor.tint

  // Lens tint (left & right lens regions approximated)
  if (opacity > 0.02) {
    ctx.globalAlpha = opacity
    ctx.fillStyle = `rgb(${tr},${tg},${tb})`
    ctx.beginPath()
    ctx.ellipse(100, 55, 48, 38, 0, 0, Math.PI * 2)
    ctx.ellipse(300, 55, 48, 38, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1
  }

  // Frame outline
  ctx.strokeStyle = color
  ctx.lineWidth = 5
  ctx.lineJoin = "round"
  ctx.fillStyle = "rgba(0,0,0,0.04)"
  const path = new Path2D(frame.framePath)
  ctx.fill(path)
  ctx.stroke(path)

  // Bridge highlight
  ctx.strokeStyle = color
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(196, 52)
  ctx.lineTo(204, 52)
  ctx.stroke()

  ctx.restore()
}

export function drawStaticImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  state: MirrorDrawState,
) {
  const iw = img.naturalWidth
  const ih = img.naturalHeight
  const scale = Math.max(width / iw, height / ih)
  const sw = iw * scale
  const sh = ih * scale
  const sx = (width - sw) / 2
  const sy = (height - sh) / 2
  ctx.drawImage(img, sx, sy, sw, sh)

  if (state.frame) {
    drawGlassesOverlay(ctx, width, height, state)
  }
}
