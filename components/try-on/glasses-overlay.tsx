"use client"

import { Suspense, useLayoutEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import type { FacePose } from "@/lib/try-on/face-pose"
import { glassesTransformFromFacePose } from "@/lib/try-on/face-to-scene"
import { applyGlassesMaterials, orientGlassesGlbRoot } from "@/lib/try-on/glasses-model"
import type { TryOnSwatch } from "@/lib/try-on/swatches"
import { WebGLErrorBoundary } from "@/components/webgl-error-boundary"

const MODEL_URL = "/glasses.glb"

useGLTF.preload(MODEL_URL)

function GlassesModel({
  swatch,
  facePose,
}: {
  swatch: TryOnSwatch
  facePose: FacePose | null
}) {
  const { scene } = useGLTF(MODEL_URL)
  const groupRef = useRef<THREE.Group>(null)
  const { size } = useThree()

  const preparedScene = useMemo(() => {
    const clone = scene.clone(true)
    orientGlassesGlbRoot(clone)
    return clone
  }, [scene])

  useLayoutEffect(() => {
    applyGlassesMaterials(preparedScene, swatch.lensHex, swatch.lensOpacity)
  }, [preparedScene, swatch.lensHex, swatch.lensOpacity])

  useFrame(() => {
    const g = groupRef.current
    if (!g || !size.width) return

    if (facePose) {
      const aspect = size.width / size.height
      const t = glassesTransformFromFacePose(facePose, aspect)
      g.position.set(t.position.x, t.position.y, t.position.z)
      g.rotation.set(t.rotationX, t.rotationY, t.rotationZ)
      g.scale.setScalar(t.scale)
      g.visible = true
    } else {
      g.visible = false
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={preparedScene} />
    </group>
  )
}

function OverlayScene({
  swatch,
  facePose,
}: {
  swatch: TryOnSwatch
  facePose: FacePose | null
}) {
  return (
    <>
      <ambientLight intensity={1.15} />
      <directionalLight position={[2, 4, 6]} intensity={1} />
      <directionalLight position={[-3, 1, 4]} intensity={0.4} />
      <GlassesModel swatch={swatch} facePose={facePose} />
    </>
  )
}

const OVERLAY_STYLE: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 51,
  pointerEvents: "none",
}

/**
 * Live Three.js overlay — GLB tracks pupils + nose bridge in camera space.
 */
export function GlassesOverlay({
  swatch,
  facePose,
}: {
  swatch: TryOnSwatch
  facePose: FacePose | null
  ipdPixels?: number
  pixelOffset?: unknown
}) {
  return (
    <WebGLErrorBoundary>
      <div style={OVERLAY_STYLE}>
        <Canvas
          className="h-full w-full"
          dpr={[1, 2]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 0, 3.8], fov: 36, near: 0.1, far: 100 }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <OverlayScene swatch={swatch} facePose={facePose} />
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  )
}
