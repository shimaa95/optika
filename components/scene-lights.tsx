"use client"

import { Environment } from "@react-three/drei"

// Lerp helper
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

interface SceneLightsProps {
  currentSection: "philosophy" | "craft" | "transition" | "craft-to-innovation" | "innovation"
  transitionProgress: number
  innovationProgress?: number
}

export function SceneLights({
  currentSection,
  transitionProgress,
  innovationProgress = 0,
}: SceneLightsProps) {
  // Adapt lighting: black(0) → cream(1) → black(0) across sections
  const inInnovation = currentSection === "innovation" || currentSection === "craft-to-innovation"
  const ambientIntensity = inInnovation ? lerp(1.1, 0.4, innovationProgress) : lerp(0.4, 1.1, transitionProgress)
  const keyIntensity = inInnovation ? lerp(0.9, 2.0, innovationProgress) : lerp(1.5, 0.9, transitionProgress)
  const fillIntensity = inInnovation ? lerp(1.2, 0.7, innovationProgress) : lerp(0.8, 1.2, transitionProgress)
  const rimIntensity = inInnovation ? lerp(0.6, 1.4, innovationProgress) : lerp(1.0, 0.6, transitionProgress)

  return (
    <>
      <ambientLight intensity={ambientIntensity} />

      {/* Key */}
      <spotLight
        position={[5, 5, 5]}
        angle={0.5}
        penumbra={1}
        intensity={keyIntensity}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Fill */}
      <spotLight
        position={[-5, 3, 3]}
        angle={0.6}
        penumbra={1}
        intensity={fillIntensity}
        color="#ffffff"
      />

      {/* Rim */}
      <spotLight
        position={[0, 5, -5]}
        angle={0.4}
        penumbra={0.5}
        intensity={rimIntensity}
        color="#f0f0f0"
      />

      {/* Bottom fill */}
      <pointLight position={[0, -3, 2]} intensity={0.4} color="#ffffff" />

      <Environment preset="studio" />
    </>
  )
}
