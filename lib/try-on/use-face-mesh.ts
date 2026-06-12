"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  FACE_MESH_POINT_COUNT,
  FACE_MESH_REFINED_POINT_COUNT,
} from "./face-mesh-landmarks"
import { poseFromLandmarks, type FacePose, type NormalizedPoint } from "./face-pose"

type FaceMeshResults = {
  multiFaceLandmarks?: Array<Array<{ x: number; y: number; z?: number }>>
}

type FaceMeshInstance = {
  setOptions: (options: object) => void
  onResults: (cb: (results: FaceMeshResults) => void) => void
  send: (input: { image: HTMLVideoElement }) => Promise<void>
  close: () => void
}

const FACE_MESH_CDN =
  "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619"

export interface UseFaceMeshOptions {
  enabled: boolean
  /** Match selfie mirror (flip landmark x) */
  mirrored?: boolean
}

export interface UseFaceMeshResult {
  /** Derived pose (pupils, nose bridge, ears, tilt) */
  facePose: FacePose | null
  faceDetected: boolean
  /** MediaPipe WASM + model loaded */
  faceMeshReady: boolean
  /**
   * Full dense landmark set from the latest frame (468 or 478 points).
   * Coordinates are normalized 0–1 in video space (mirroring applied when enabled).
   */
  landmarks: NormalizedPoint[] | null
}

export function useFaceMesh(
  video: HTMLVideoElement | null | undefined,
  { enabled, mirrored = true }: UseFaceMeshOptions,
): UseFaceMeshResult {
  const [facePose, setFacePose] = useState<FacePose | null>(null)
  const [faceDetected, setFaceDetected] = useState(false)
  const [faceMeshReady, setFaceMeshReady] = useState(false)
  const [landmarks, setLandmarks] = useState<NormalizedPoint[] | null>(null)
  const meshRef = useRef<FaceMeshInstance | null>(null)
  const rafRef = useRef(0)
  const busyRef = useRef(false)
  const mirroredRef = useRef(mirrored)

  mirroredRef.current = mirrored

  const initMesh = useCallback(async () => {
    if (meshRef.current) return meshRef.current

    const { FaceMesh } = await import("@mediapipe/face_mesh")
    const faceMesh = new FaceMesh({
      locateFile: (file) => `${FACE_MESH_CDN}/${file}`,
    }) as FaceMeshInstance

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })

    faceMesh.onResults((results) => {
      const raw = results.multiFaceLandmarks?.[0]
      if (!raw || raw.length < FACE_MESH_POINT_COUNT) {
        setLandmarks(null)
        setFacePose(null)
        setFaceDetected(false)
        return
      }

      const mirrored = mirroredRef.current
      const normalized: NormalizedPoint[] = raw.map((p) => ({
        x: mirrored ? 1 - p.x : p.x,
        y: p.y,
        z: p.z,
      }))

      setLandmarks(normalized)

      const pose = poseFromLandmarks(raw, { mirrored })
      if (pose) {
        setFacePose(pose)
        setFaceDetected(true)
      } else {
        setFacePose(null)
        setFaceDetected(false)
      }
    })

    meshRef.current = faceMesh
    setFaceMeshReady(true)
    return faceMesh
  }, [])

  useEffect(() => {
    if (!enabled || !video) {
      setLandmarks(null)
      setFacePose(null)
      setFaceDetected(false)
      return
    }

    let cancelled = false

    const loop = async () => {
      if (cancelled) return

      const mesh = meshRef.current ?? (await initMesh())
      if (cancelled || !mesh) return

      if (video.readyState >= 2 && !busyRef.current) {
        busyRef.current = true
        try {
          await mesh.send({ image: video })
        } catch {
          /* skip frame */
        }
        busyRef.current = false
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafRef.current)
    }
  }, [enabled, video, initMesh])

  useEffect(() => {
    return () => {
      meshRef.current?.close()
      meshRef.current = null
    }
  }, [])

  return { facePose, faceDetected, faceMeshReady, landmarks }
}

export { FACE_MESH_POINT_COUNT, FACE_MESH_REFINED_POINT_COUNT }
