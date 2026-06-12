import type { FacePose } from "./face-pose"

export interface OverlayPaintOptions {
  facePose: FacePose | null
  showLandmarkDebug?: boolean
}

/** Optional debug overlay — pupils, nose bridge, ears */
export function paintTryOnOverlay(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  options: OverlayPaintOptions,
) {
  ctx.clearRect(0, 0, width, height)

  if (options.showLandmarkDebug && options.facePose) {
    drawLandmarkDebug(ctx, options.facePose, width, height)
  }
}

function drawLandmarkDebug(
  ctx: CanvasRenderingContext2D,
  pose: FacePose,
  w: number,
  h: number,
) {
  const px = (p: { x: number; y: number }) => ({ x: p.x * w, y: p.y * h })
  const leftPupil = px(pose.leftPupil)
  const rightPupil = px(pose.rightPupil)
  const anchor = px(pose.glassesAnchor)
  const noseLandmark = px(pose.noseBridge)
  const leftEar = px(pose.leftEar)
  const rightEar = px(pose.rightEar)

  const dot = (x: number, y: number, color: string, r = 4) => {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
  }

  ctx.save()
  dot(leftPupil.x, leftPupil.y, "#22d3ee", 5)
  dot(rightPupil.x, rightPupil.y, "#22d3ee", 5)
  dot(anchor.x, anchor.y, "#ef4444", 5)
  dot(noseLandmark.x, noseLandmark.y, "#60a5fa", 4)
  dot(leftEar.x, leftEar.y, "#fb923c", 4)
  dot(rightEar.x, rightEar.y, "#fb923c", 4)
  ctx.strokeStyle = "rgba(34, 197, 94, 0.55)"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(leftPupil.x, leftPupil.y)
  ctx.lineTo(rightPupil.x, rightPupil.y)
  ctx.stroke()
  ctx.restore()
}
