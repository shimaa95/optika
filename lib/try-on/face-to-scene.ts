import type { FacePose, NormalizedPoint } from "./face-pose"
import { adjustedAnchorY } from "./face-pose"
import { IPD_TO_FRAME_WIDTH_RATIO } from "./ipd-scale"
import { GLASSES_MODEL_WIDTH_WORLD } from "./glasses-model"

const CAMERA_Z = 3.8
const CAMERA_FOV_DEG = 36

/** Visible world size at z=0 for the overlay camera */
export function visibleSceneExtents(aspect: number) {
  const vFov = (CAMERA_FOV_DEG * Math.PI) / 180
  const height = 2 * Math.tan(vFov / 2) * CAMERA_Z
  return { width: height * aspect, height }
}

/** Map normalized MediaPipe point (0–1, y down) → R3F scene XY (y up) */
export function landmarkToSceneXY(
  point: NormalizedPoint,
  aspect: number,
): { x: number; y: number } {
  const { width, height } = visibleSceneExtents(aspect)
  return {
    x: (point.x - 0.5) * width,
    y: -(point.y - 0.5) * height,
  }
}

export interface GlassesTransform3D {
  position: { x: number; y: number; z: number }
  rotationX: number
  rotationY: number
  rotationZ: number
  scale: number
}

/**
 * Anchor on eye midpoint, lowered slightly toward the nose bridge (not the brow).
 * Scale from inter-pupil distance in scene units.
 */
export function glassesTransformFromFacePose(
  facePose: FacePose,
  viewportAspect: number,
): GlassesTransform3D {
  const left = landmarkToSceneXY(facePose.leftPupil, viewportAspect)
  const right = landmarkToSceneXY(facePose.rightPupil, viewportAspect)

  const eyeX = (left.x + right.x) / 2
  const adjustedY = adjustedAnchorY(
    facePose.leftPupil.y,
    facePose.rightPupil.y,
    facePose.faceHeight,
  )
  const anchorScene = landmarkToSceneXY(
    { x: facePose.eyeCenter.x, y: adjustedY, z: facePose.eyeCenter.z },
    viewportAspect,
  )

  const ipdWorld = Math.hypot(right.x - left.x, right.y - left.y)
  const scale =
    ipdWorld > 0.001
      ? (ipdWorld * IPD_TO_FRAME_WIDTH_RATIO) / Math.max(GLASSES_MODEL_WIDTH_WORLD, 0.001)
      : 0.5

  const zLeft = facePose.leftPupil.z ?? 0
  const zRight = facePose.rightPupil.z ?? 0
  const zDepth = ((zLeft + zRight) / 2) * 0.25

  return {
    position: {
      x: eyeX,
      y: anchorScene.y,
      z: zDepth,
    },
    rotationX: 0,
    rotationY: 0,
    rotationZ: Math.atan2(right.y - left.y, right.x - left.x),
    scale,
  }
}
