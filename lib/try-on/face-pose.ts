/** Normalized image coordinates (0–1), origin top-left */
export interface NormalizedPoint {
  x: number
  y: number
  z?: number
}

/**
 * Pose derived from MediaPipe Face Mesh (468 landmarks + optional iris refinement).
 * All x/y are normalized; when `mirrored` is true they match the selfie mirror view.
 */
export interface FacePose {
  detected: true
  /** Total landmarks in the source array (468 or 478) */
  landmarkCount: number
  /** True when iris refinement landmarks (468–477) are present */
  hasRefinedIris: boolean
  leftEye: NormalizedPoint
  rightEye: NormalizedPoint
  leftPupil: NormalizedPoint
  rightPupil: NormalizedPoint
  eyeCenter: NormalizedPoint
  /** MediaPipe landmark 168 (anatomical nose bridge) */
  noseBridge: NormalizedPoint
  /** Draw anchor: eye midpoint, Y dropped slightly onto the bridge — not the nose tip */
  glassesAnchor: NormalizedPoint
  leftEar: NormalizedPoint
  rightEar: NormalizedPoint
  /** Forehead → chin span in normalized space (for vertical nudge) */
  faceHeight: number
  /** Face width based on left and right ear landmarks (temple-to-temple) */
  faceWidth: number
  /** Normalized inter-pupillary distance (IPD) */
  eyeDistance: number
  ipd: number
  rotation: number
  cx: number
  cy: number
}

/** Nudge below eye midpoint toward bridge (fraction of face height, image Y-down) */
export const FACE_HEIGHT_Y_OFFSET = 0.05

/**
 * Vertical anchor: eye midpoint, then slightly down toward the nose bridge.
 * @param leftEyeY - left eye center Y (normalized, 0-1)
 * @param rightEyeY - right eye center Y (normalized, 0-1)
 */
export function adjustedAnchorY(
  leftEyeY: number,
  rightEyeY: number,
  faceHeight: number,
  faceHeightOffset = FACE_HEIGHT_Y_OFFSET,
): number {
  const targetY = (leftEyeY + rightEyeY) / 2
  return targetY + faceHeight * faceHeightOffset
}

export {
  FACE_MESH_INDICES,
  FACE_MESH_POINT_COUNT,
  FACE_MESH_REFINED_POINT_COUNT,
  hasDenseFaceMesh,
  hasRefinedIrisLandmarks,
} from "./face-mesh-landmarks"

import {
  FACE_MESH_INDICES,
  FACE_MESH_POINT_COUNT,
  hasRefinedIrisLandmarks,
} from "./face-mesh-landmarks"

function mirrorPoint(
  p: { x: number; y: number; z?: number },
  mirrored?: boolean,
): NormalizedPoint {
  return {
    x: mirrored ? 1 - p.x : p.x,
    y: p.y,
    z: p.z,
  }
}

export function poseFromLandmarks(
  landmarks: Array<{ x: number; y: number; z?: number }>,
  options?: { mirrored?: boolean },
): FacePose | null {
  if (landmarks.length < FACE_MESH_POINT_COUNT) return null

  const refined = hasRefinedIrisLandmarks(landmarks.length)
  const m = options?.mirrored ?? false

  const leftEye = mirrorPoint(landmarks[FACE_MESH_INDICES.LEFT_EYE_OUTER]!, m)
  const rightEye = mirrorPoint(landmarks[FACE_MESH_INDICES.RIGHT_EYE_OUTER]!, m)

  const leftPupilRaw = refined
    ? landmarks[FACE_MESH_INDICES.LEFT_PUPIL]!
    : landmarks[FACE_MESH_INDICES.LEFT_EYE_CENTER]!
  const rightPupilRaw = refined
    ? landmarks[FACE_MESH_INDICES.RIGHT_PUPIL]!
    : landmarks[FACE_MESH_INDICES.RIGHT_EYE_CENTER]!

  const leftPupil = mirrorPoint(leftPupilRaw, m)
  const rightPupil = mirrorPoint(rightPupilRaw, m)
  const noseBridge = mirrorPoint(landmarks[FACE_MESH_INDICES.NOSE_BRIDGE]!, m)
  const forehead = mirrorPoint(landmarks[FACE_MESH_INDICES.FOREHEAD]!, m)
  const chin = mirrorPoint(landmarks[FACE_MESH_INDICES.CHIN]!, m)
  const leftEar = mirrorPoint(landmarks[FACE_MESH_INDICES.LEFT_EAR]!, m)
  const rightEar = mirrorPoint(landmarks[FACE_MESH_INDICES.RIGHT_EAR]!, m)

  const faceHeight = Math.max(0.08, chin.y - forehead.y)
  const faceWidth = Math.hypot(rightEar.x - leftEar.x, rightEar.y - leftEar.y)

  const eyeCenter: NormalizedPoint = {
    x: (leftPupil.x + rightPupil.x) / 2,
    y: (leftPupil.y + rightPupil.y) / 2,
    z:
      leftPupil.z !== undefined && rightPupil.z !== undefined
        ? (leftPupil.z + rightPupil.z) / 2
        : undefined,
  }

  const eyeDistance = Math.hypot(rightPupil.x - leftPupil.x, rightPupil.y - leftPupil.y)
  if (eyeDistance < 0.04) return null

  const rotation = Math.atan2(rightPupil.y - leftPupil.y, rightPupil.x - leftPupil.x)

  const glassesAnchor: NormalizedPoint = {
    x: eyeCenter.x,
    y: adjustedAnchorY(leftPupil.y, rightPupil.y, faceHeight),
    z: eyeCenter.z,
  }

  return {
    detected: true,
    landmarkCount: landmarks.length,
    hasRefinedIris: refined,
    leftEye,
    rightEye,
    leftPupil,
    rightPupil,
    eyeCenter,
    noseBridge,
    glassesAnchor,
    leftEar,
    rightEar,
    faceHeight,
    faceWidth,
    eyeDistance,
    ipd: eyeDistance,
    rotation,
    cx: glassesAnchor.x,
    cy: glassesAnchor.y,
  }
}

/** Pixel-space pose for 2D canvas overlay (matches CSS object-cover on the video) */
export interface CanvasFacePose {
  noseBridge: { x: number; y: number }
  eyeDistance: number
  faceWidth: number
  rotation: number
}

/** Map normalized landmarks to canvas pixels when video uses object-fit: cover */
export function mapNormalizedPointToObjectCover(
  point: NormalizedPoint,
  videoWidth: number,
  videoHeight: number,
  canvasWidth: number,
  canvasHeight: number,
): { x: number; y: number } {
  if (!videoWidth || !videoHeight) {
    return { x: point.x * canvasWidth, y: point.y * canvasHeight }
  }

  const scale = Math.max(canvasWidth / videoWidth, canvasHeight / videoHeight)
  const scaledW = videoWidth * scale
  const scaledH = videoHeight * scale
  const offsetX = (canvasWidth - scaledW) / 2
  const offsetY = (canvasHeight - scaledH) / 2

  return {
    x: point.x * videoWidth * scale + offsetX,
    y: point.y * videoHeight * scale + offsetY,
  }
}

export function facePoseToCanvasPixels(
  facePose: FacePose,
  videoWidth: number,
  videoHeight: number,
  canvasWidth: number,
  canvasHeight: number,
): CanvasFacePose {
  const map = (p: NormalizedPoint) =>
    mapNormalizedPointToObjectCover(p, videoWidth, videoHeight, canvasWidth, canvasHeight)

  const left = map(facePose.leftPupil)
  const right = map(facePose.rightPupil)
  const leftEar = map(facePose.leftEar)
  const rightEar = map(facePose.rightEar)
  
  // Precise Midpoint Positioning: Use eyeCenter instead of glassesAnchor
  const anchor = map(facePose.eyeCenter)

  return {
    noseBridge: anchor, // It's now precisely the midpoint
    eyeDistance: Math.hypot(right.x - left.x, right.y - left.y),
    faceWidth: Math.hypot(rightEar.x - leftEar.x, rightEar.y - leftEar.y),
    rotation: Math.atan2(right.y - left.y, right.x - left.x),
  }
}
