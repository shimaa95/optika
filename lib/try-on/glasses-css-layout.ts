import type { FacePose } from "./face-pose"
import { facePoseToCanvasPixels } from "./face-pose"
import {
  GLASSES_DRAW_HEIGHT,
  GLASSES_DRAW_WIDTH,
} from "./glasses-canvas-renderer"
import { IPD_TO_FRAME_WIDTH_RATIO } from "./ipd-scale"

/** GLB offscreen render size — keeps CSS aspect-ratio in sync with the sprite */
const GLASSES_SPRITE_WIDTH = GLASSES_DRAW_WIDTH
const GLASSES_SPRITE_HEIGHT = GLASSES_DRAW_HEIGHT

export interface GlassesCssLayout {
  leftPx: number
  topPx: number
  /** Render width in CSS px; height follows asset aspect via `height: auto` */
  widthPx: number
  angleDeg: number
}

/** Temple-to-temple multiplier when ear landmarks are available */
const FACE_WIDTH_MULTIPLIER = 3.15

/**
 * CSS overlay box: centered on eye midpoint, rotated to match eye line,
 * scaled to match the dynamic frame width.
 */
export function glassesCssLayout(
  facePose: FacePose,
  stageWidth: number,
  stageHeight: number,
  videoWidth = 0,
  videoHeight = 0,
): GlassesCssLayout {
  let leftPx: number
  let topPx: number
  let angleDeg: number
  let faceWidthPx: number

  if (videoWidth > 0 && videoHeight > 0) {
    const mapped = facePoseToCanvasPixels(
      facePose,
      videoWidth,
      videoHeight,
      stageWidth,
      stageHeight,
    )
    leftPx = mapped.noseBridge.x
    topPx = mapped.noseBridge.y
    angleDeg = (mapped.rotation * 180) / Math.PI
    faceWidthPx = mapped.faceWidth
  } else {
    const leftX = facePose.leftPupil.x * stageWidth
    const leftY = facePose.leftPupil.y * stageHeight
    const rightX = facePose.rightPupil.x * stageWidth
    const rightY = facePose.rightPupil.y * stageHeight

    // Precise Midpoint Positioning
    leftPx = (leftX + rightX) / 2
    topPx = (leftY + rightY) / 2

    angleDeg = (facePose.rotation * 180) / Math.PI

    // Scale by actual face width (temple-to-temple) instead of just pupillary distance
    const leftEarX = facePose.leftEar.x * stageWidth
    const leftEarY = facePose.leftEar.y * stageHeight
    const rightEarX = facePose.rightEar.x * stageWidth
    const rightEarY = facePose.rightEar.y * stageHeight
    faceWidthPx = Math.hypot(rightEarX - leftEarX, rightEarY - leftEarY)
  }

  const widthPx =
    faceWidthPx > 0
      ? faceWidthPx * FACE_WIDTH_MULTIPLIER
      : Math.hypot(
          facePose.rightPupil.x - facePose.leftPupil.x,
          facePose.rightPupil.y - facePose.leftPupil.y,
        ) *
        stageWidth *
        IPD_TO_FRAME_WIDTH_RATIO

  return {
    leftPx,
    topPx,
    widthPx,
    angleDeg,
  }
}

/** Natural GLB sprite aspect (width / height) — 400×133 */
export const GLASSES_SPRITE_ASPECT_RATIO =
  GLASSES_SPRITE_WIDTH / GLASSES_SPRITE_HEIGHT

// Fine-tune the vertical position of the glasses on the face (pixels)
// A negative value moves the glasses UP towards the forehead
// A positive value moves them DOWN towards the nose tip
const VERTICAL_OFFSET_PX = -15

export function glassesCssTransform(angleDeg: number): string {
  // Uniform translate + rotate only — width scales the asset; height stays `auto`
  return `translate(-50%, calc(-50% + ${VERTICAL_OFFSET_PX}px)) rotate(${angleDeg}deg)`
}
