import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import {
  createLensMaterial,
  isLensMesh,
  lockFrameMaterial,
  orientGlassesGlbRoot,
} from "@/lib/try-on/glasses-model"
import type { TryOnSwatch } from "./swatches"

const MODEL_URL = "/glasses.glb"

/** Hardcoded overlay draw size (canvas buffer pixels) */
export const GLASSES_DRAW_WIDTH = 400
export const GLASSES_DRAW_HEIGHT = 133

/**
 * Manual bridge alignment — sprite center includes temple arms, not the nose bridge.
 * +X = shift glasses right, +Y = shift glasses down (canvas buffer pixels).
 */
export const GLASSES_DRAW_OFFSET_X = 0
export const GLASSES_DRAW_OFFSET_Y = 0

const RENDER_WIDTH = GLASSES_DRAW_WIDTH * 3
const RENDER_HEIGHT = GLASSES_DRAW_HEIGHT * 3

/** Lay temples left–right. Flip to -Math.PI / 2 if mirrored wrong on your display */
const MODEL_FACE_ROTATION_Z = Math.PI / 2

export class GlassesCanvasRenderer {
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private modelRoot: THREE.Group
  private lensMeshes: THREE.Mesh[] = []
  private frameMeshes: THREE.Mesh[] = []
  private frameMaterials = new Map<THREE.Mesh, THREE.MeshStandardMaterial>()
  private ready = false
  private loadPromise: Promise<void> | null = null

  constructor() {
    this.scene = new THREE.Scene()
    this.modelRoot = new THREE.Group()
    this.scene.add(this.modelRoot)

    this.camera = new THREE.PerspectiveCamera(35, RENDER_WIDTH / RENDER_HEIGHT, 0.1, 100)
    this.camera.position.set(0, 0, 4.2)
    this.camera.lookAt(0, 0, 0)

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      preserveDrawingBuffer: true,
      powerPreference: "default",
      failIfMajorPerformanceCaveat: false,
    })
    this.renderer.setSize(RENDER_WIDTH, RENDER_HEIGHT, false)
    this.renderer.setPixelRatio(1)
    this.renderer.setClearColor(0x000000, 0)

    const canvas = this.renderer.domElement
    canvas.width = RENDER_WIDTH
    canvas.height = RENDER_HEIGHT
    canvas.style.cssText =
      `position:fixed;left:0;top:0;width:${RENDER_WIDTH}px;height:${RENDER_HEIGHT}px;visibility:hidden;pointer-events:none;z-index:-1`
    document.body.appendChild(canvas)

    const ambient = new THREE.AmbientLight(0xffffff, 1.1)
    const key = new THREE.DirectionalLight(0xffffff, 0.95)
    key.position.set(4, 6, 8)
    const fill = new THREE.DirectionalLight(0xffffff, 0.5)
    fill.position.set(-4, 2, 6)
    this.scene.add(ambient, key, fill)
  }

  load(): Promise<void> {
    if (this.ready) return Promise.resolve()
    if (this.loadPromise) return this.loadPromise

    this.loadPromise = new Promise((resolve, reject) => {
      const loader = new GLTFLoader()
      loader.load(
        MODEL_URL,
        (gltf) => {
          const root = gltf.scene
          this.lensMeshes = []
          this.frameMeshes = []

          root.traverse((child) => {
            if (!(child instanceof THREE.Mesh)) return
            if (isLensMesh(child)) {
              this.lensMeshes.push(child)
            } else {
              this.frameMeshes.push(child)
              const frameMat = lockFrameMaterial(child)
              this.frameMaterials.set(child, frameMat)
            }
          })

          orientGlassesGlbRoot(root)

          this.modelRoot.clear()
          this.modelRoot.add(root)
          this.ready = true
          resolve()
        },
        undefined,
        reject,
      )
    })

    return this.loadPromise
  }

  isReady() {
    return this.ready
  }

  /** Renders GLB to internal canvas; returns it for ctx.drawImage (must have width/height > 0). */
  renderSprite(): HTMLCanvasElement | null {
    if (!this.ready) return null

    this.modelRoot.position.set(0, 0, 0)
    this.renderer.setSize(RENDER_WIDTH, RENDER_HEIGHT, false)
    this.renderer.render(this.scene, this.camera)

    const canvas = this.renderer.domElement
    if (canvas.width < 1 || canvas.height < 1) return null
    return canvas
  }

  applyLensTint(swatch: TryOnSwatch | { lensHex: string; lensOpacity: number }) {
    const color = new THREE.Color(swatch.lensHex)
    const opacity = Math.min(0.85, swatch.lensOpacity + 0.25)

    for (const mesh of this.lensMeshes) {
      // If we already created and attached our custom physical lens material, just hot-swap the uniforms!
      if ((mesh.material as any).__isTinted) {
         const mat = mesh.material as THREE.MeshPhysicalMaterial
         mat.color.copy(color)
         mat.opacity = opacity
         continue
      }

      // First time tinting: replace whatever material the GLB had with our premium glass shader
      const mat = createLensMaterial(swatch.lensHex, swatch.lensOpacity)
      ;(mat as any).__isTinted = true
      mesh.material = mat
    }
  }

  dispose() {
    this.renderer.domElement.remove()
    this.renderer.dispose()
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose()
        const m = obj.material
        if (Array.isArray(m)) m.forEach((x) => x.dispose())
        else m?.dispose()
      }
    })
    this.ready = false
    this.loadPromise = null
    this.frameMaterials.clear()
  }
}
