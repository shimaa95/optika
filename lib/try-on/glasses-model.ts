import * as THREE from "three"

/** Uniform scale so the model fits the virtual try-on scene */
const GLB_SCENE_SCALE = 2.4

/** Temple-to-temple span in world units after orientGlassesGlbRoot (for IPD scaling) */
export let GLASSES_MODEL_WIDTH_WORLD = 1

/**
 * Orient `/glasses.glb` for head-on try-on: temples along X, bridge at origin.
 * Temple arms extend on ±Z in model space (visible depth in the live WebGL overlay).
 */
export function orientGlassesGlbRoot(root: THREE.Object3D): void {
  const box = new THREE.Box3().setFromObject(root)
  const size = box.getSize(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z, 0.001)
  root.scale.setScalar(GLB_SCENE_SCALE / maxDim)
  root.rotation.y = Math.PI / 2

  const fitted = new THREE.Box3().setFromObject(root)
  const fittedSize = fitted.getSize(new THREE.Vector3())
  const bridge = new THREE.Vector3(
    (fitted.min.x + fitted.max.x) / 2,
    fitted.max.y - fittedSize.y * 0.18,
    fitted.getCenter(new THREE.Vector3()).z,
  )
  root.position.sub(bridge)

  GLASSES_MODEL_WIDTH_WORLD = Math.max(fittedSize.x, 0.001)
}

/** @deprecated Use orientGlassesGlbRoot for 3D overlay */
export function prepareGlassesModel(root: THREE.Object3D): void {
  orientGlassesGlbRoot(root)
}

export function isLensMesh(mesh: THREE.Mesh): boolean {
  const meshName = mesh.name.toLowerCase()

  if (
    meshName.includes("hinge") ||
    meshName.includes("line") ||
    meshName.includes("temple") ||
    meshName.includes("frame")
  ) {
    return false
  }
  if (meshName.includes("sphere") || meshName.includes("lens")) {
    return true
  }

  const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material
  const matName = (mat?.name ?? "").toLowerCase()
  if (matName.includes("lens")) return true

  return false
}

const FRAME_COLOR = 0x000000

/** Dedicated black frame material — never shares with lens tint */
export function createFrameMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: FRAME_COLOR,
    metalness: 0.9,
    roughness: 0.22,
  })
}

export function lockFrameMaterial(mesh: THREE.Mesh): THREE.MeshStandardMaterial {
  const mat = createFrameMaterial()
  mesh.material = mat
  return mat
}

export function createLensMaterial(
  lensHex: string,
  lensOpacity: number,
): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(lensHex),
    metalness: 0.35,
    roughness: 0.15,
    transparent: true,
    opacity: Math.min(0.85, lensOpacity + 0.25),
    clearcoat: 0.7,
    clearcoatRoughness: 0.2,
    side: THREE.DoubleSide,
    depthWrite: false,
  })
}

/** Tint lenses only; lock every non-lens mesh to black frame */
export function applyGlassesMaterials(root: THREE.Object3D, lensHex: string, lensOpacity: number) {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return
    if (isLensMesh(child)) {
      child.material = createLensMaterial(lensHex, lensOpacity)
    } else {
      lockFrameMaterial(child)
    }
    child.castShadow = false
    child.receiveShadow = false
  })
}
