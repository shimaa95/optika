/**
 * Google MediaPipe Face Mesh landmark indices (468 base mesh).
 * With `refineLandmarks: true`, iris points 468–477 are appended (478 total).
 *
 * @see https://github.com/google/mediapipe/blob/master/mediapipe/modules/face_geometry/data/canonical_face_model_uv_visualization.png
 */

export const FACE_MESH_POINT_COUNT = 468
export const FACE_MESH_REFINED_POINT_COUNT = 478

export const FACE_MESH_INDICES = {
  /** Outer corner — subject's left eye */
  LEFT_EYE_OUTER: 33,
  /** Outer corner — subject's right eye */
  RIGHT_EYE_OUTER: 263,
  /** Inner eye corners */
  LEFT_EYE_INNER: 133,
  RIGHT_EYE_INNER: 362,
  /** Approximate eye centers (when iris refinement is off) */
  LEFT_EYE_CENTER: 159,
  RIGHT_EYE_CENTER: 386,
  /** Iris center — only when refineLandmarks is enabled */
  LEFT_PUPIL: 468,
  RIGHT_PUPIL: 473,
  /** Nose bridge */
  NOSE_BRIDGE: 168,
  /** Forehead / top of face */
  FOREHEAD: 10,
  /** Chin */
  CHIN: 152,
  /** Nose tip */
  NOSE_TIP: 1,
  /** Tragion / ear attachment */
  LEFT_EAR: 234,
  RIGHT_EAR: 454,
} as const

export type FaceMeshLandmarkIndex =
  (typeof FACE_MESH_INDICES)[keyof typeof FACE_MESH_INDICES]

export function hasRefinedIrisLandmarks(count: number): boolean {
  return count >= FACE_MESH_REFINED_POINT_COUNT
}

export function hasDenseFaceMesh(count: number): boolean {
  return count >= FACE_MESH_POINT_COUNT
}
