"use client"

import { Suspense, useLayoutEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Center, ContactShadows, Environment, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import type { TryOnSwatch } from "@/lib/try-on/swatches"
import { WebGLErrorBoundary } from "@/components/webgl-error-boundary"
import { isMobileGPU } from "@/lib/webgl-utils"

const MODEL_URL = "/AkshtaS%20spetcs2.glb"

useGLTF.preload(MODEL_URL)

function GlassesModel({ swatch }: { swatch: TryOnSwatch }) {
  const { scene } = useGLTF(MODEL_URL)
  const groupRef = useRef<THREE.Group>(null)

  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      if (child.material && (child.material as THREE.Material).name === "lens") {
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(swatch.lensHex),
          metalness: 0.65,
          roughness: 0.08,
          envMapIntensity: 2.2,
          transparent: true,
          opacity: swatch.lensOpacity,
          clearcoat: 1,
          clearcoatRoughness: 0.12,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      } else {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x2a2a3a),
          metalness: 0.85,
          roughness: 0.2,
          envMapIntensity: 1.8,
        })
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene, swatch.lensHex, swatch.lensOpacity])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35
    }
  })

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} scale={0.42} />
      </Center>
    </group>
  )
}

function ViewerScene({ swatch }: { swatch: TryOnSwatch }) {
  return (
    <>
      <ambientLight intensity={1.15} />
      <directionalLight position={[8, 10, 6]} intensity={1.1} />
      <directionalLight position={[-6, 4, -4]} intensity={0.55} />
      {!isMobileGPU() && <Environment preset="studio" />}
      <GlassesModel swatch={swatch} />
      <ContactShadows
        resolution={isMobileGPU() ? 256 : 512}
        scale={12}
        blur={2}
        opacity={0.35}
        far={8}
        color="#000000"
      />
    </>
  )
}

export function TryOnViewer({ swatch, className }: { swatch: TryOnSwatch; className?: string }) {
  return (
    <WebGLErrorBoundary>
      <div className={className}>
        <Canvas
          camera={{ position: [0, 0.15, 4.2], fov: 42 }}
          className="h-full w-full touch-none"
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: "default",
            failIfMajorPerformanceCaveat: false,
          }}
        >
          <Suspense fallback={null}>
            <ViewerScene swatch={swatch} />
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  )
}
