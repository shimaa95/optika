import * as THREE from "three";

const meshStyled = new WeakSet<THREE.Object3D>();

const LENS_MATERIAL = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color("#eff1fc"),
  metalness: 0.9,
  roughness: 0.05,
  envMapIntensity: 2.5,
  transparent: true,
  opacity: 0.25,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
  side: THREE.DoubleSide,
  depthWrite: false,
});

const FRAME_MATERIAL = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0x2a2a3a),
  metalness: 0.85,
  roughness: 0.2,
  envMapIntensity: 1.8,
});

/** Mobile: no HDR env map — lower metalness so the model stays visible. */
const LENS_MATERIAL_MOBILE = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color("#eff1fc"),
  metalness: 0.15,
  roughness: 0.12,
  envMapIntensity: 0,
  transparent: true,
  opacity: 0.35,
  clearcoat: 0.6,
  clearcoatRoughness: 0.2,
  side: THREE.DoubleSide,
  depthWrite: false,
});

const FRAME_MATERIAL_MOBILE = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0x3a3a4a),
  metalness: 0.35,
  roughness: 0.35,
  envMapIntensity: 0,
});

/** Apply premium materials once per mesh — safe across ReelIntro remounts. */
export function applyReelGlassesMaterials(
  scene: THREE.Object3D,
  options?: { mobile?: boolean },
): void {
  const mobile = options?.mobile ?? false;
  const lensMat = mobile ? LENS_MATERIAL_MOBILE : LENS_MATERIAL;
  const frameMat = mobile ? FRAME_MATERIAL_MOBILE : FRAME_MATERIAL;

  scene.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    if (meshStyled.has(child)) return;
    meshStyled.add(child);

    const mat = child.material;
    const isLens = Array.isArray(mat)
      ? mat.some((m) => m.name === "lens")
      : mat?.name === "lens";

    if (isLens) {
      child.material = lensMat;
    } else {
      child.material = frameMat;
      child.castShadow = !mobile;
      child.receiveShadow = !mobile;
    }
  });
}
