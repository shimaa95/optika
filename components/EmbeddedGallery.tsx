'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ─── Gallery Data ────────────────────────────────────────────────────────────
const GALLERY_PLANES = [
  {
    textureSrc: '/smooth-optics.png',
    position: { x: 0.8, y: 0 },
    backgroundImage: '/smooth-optics.png',
    label: { word: 'ACTUS DUE PLUS', pms: 'ORGANIC RX PROGRESSIVE', desc: '', color: '#ffffff' },
  },
  {
    textureSrc: '/eye-view.png',
    position: { x: 0.8, y: 0 },
    label: { word: 'ACUTUS SMART', pms: 'DIGITAL SINGLE VISION', desc: 'Precision surfacing for crisp everyday clarity with minimal peripheral distortion.', color: '#ffffff' },
  },
  {
    textureSrc: '/eye-power.png',

    fallbackColor: '#f59e0b',
    accentColor: '#f59e0b',
    position: { x: -0.7, y: 0 },
    backgroundColor: '#1e293b',
    blob1Color: '#b45309',
    blob2Color: '#475569',
    label: { word: 'ACUTUS ELITE', pms: 'HIGH-INDEX VARIFOCAL', desc: 'Advanced corridor design balancing near and intermediate zones for demanding lifestyles.', color: '#f8fafc' },
  },
  {
    textureSrc: '/custom-form.png',
    fallbackColor: '#06b6d4',
    accentColor: '#06b6d4',
    position: { x: 1.0, y: 0 },
    backgroundColor: '#e0f2fe',
    blob1Color: '#bae6fd',
    blob2Color: '#7dd3fc',
    label: { word: 'ACUTUS AIR', pms: 'ULTRA-LIGHT ORGANIC', desc: 'Featherweight blanks engineered for comfort without compromising optical performance.', color: '#ffffff' },
  },
  {
    textureSrc: '/actushero.png',
    fallbackColor: '#8b5cf6',
    accentColor: '#8b5cf6',
    position: { x: -0.7, y: 0 },
    backgroundColor: '#09090b',
    blob1Color: '#4c1d95',
    blob2Color: '#27272a',
    label: { word: 'ACUTUS SHARP', pms: 'OFFICE PROGRESSIVE', desc: 'Optimised intermediate and near zones for screens, desks, and collaborative workspaces.', color: '#fafafa' },
  },
  {
    textureSrc: '/about-optika.jpg',
    fallbackColor: '#14b8a6',
    accentColor: '#14b8a6',
    position: { x: 0.8, y: 0 },
    backgroundColor: '#064e3b',
    blob1Color: '#047857',
    blob2Color: '#0f766e',
    label: { word: 'ACUTUS DRIVE', pms: 'POLARIZED SUN RX', desc: 'Glare-controlled outdoor lens with faithful colour perception behind the wheel.', color: '#f0fdf4' },
  },
  {
    textureSrc: '/transition.jpeg',
    fallbackColor: '#f97316',
    accentColor: '#f97316',
    position: { x: -0.9, y: 0 },
    backgroundColor: '#fef3c7',
    blob1Color: '#fde68a',
    blob2Color: '#fed7aa',
    label: { word: 'ACUTUS KIDS', pms: 'IMPACT-SAFE ORGANIC', desc: 'Tough yet light lenses tailored for active younger wearers and everyday safety.', color: '#ffffff' },
  },
  {
    textureSrc: '/model1.png',
    fallbackColor: '#6366f1',
    accentColor: '#6366f1',
    position: { x: 1.0, y: 0 },
    backgroundColor: '#1e1b4b',
    blob1Color: '#312e81',
    blob2Color: '#3730a3',
    label: { word: 'ACUTUS NIGHT', pms: 'BLUE-LIGHT OPTIMIZED', desc: 'Designed for evening screen sessions with tuned transmission for visual comfort.', color: '#e0e7ff' },
  },
  {
    textureSrc: '/about-optika.jpg',
    fallbackColor: '#e11d48',
    accentColor: '#e11d48',
    position: { x: -0.7, y: 0 },
    backgroundColor: '#4c0519',
    blob1Color: '#881337',
    blob2Color: '#9f1239',
    label: { word: 'ACUTUS SPORT', pms: 'WRAP OPTIMIZED RX', desc: 'Compensation geometry for curved frames so motion stays sharp at every angle.', color: '#ffe4e6' },
  },
  {
    textureSrc: '/hero.jpg',
    fallbackColor: '#d97706',
    accentColor: '#d97706',
    position: { x: 0.8, y: 0 },
    backgroundColor: '#44403c',
    blob1Color: '#57534e',
    blob2Color: '#78716c',
    label: { word: 'ACUTUS READ', pms: 'NEAR-VISION BOOST', desc: 'Dedicated enhancement for sustained reading and fine-detail tasks at close range.', color: '#f5f5f4' },
  },
  {
    textureSrc: '/transition.jpeg',
    fallbackColor: '#94a3b8',
    accentColor: '#94a3b8',
    position: { x: -0.9, y: 0 },
    backgroundColor: '#000000',
    blob1Color: '#1e293b',
    blob2Color: '#334155',
    label: { word: 'ACUTUS CUSTOM', pms: 'FREEFORM DIGITAL', desc: 'Fully personalised freeform computation mapped to frame fit and wearing posture.', color: '#f8fafc' },
  },
]

// ─── GLSL Shaders ─────────────────────────────────────────────────────────────
const VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
varying vec2 vUv;
uniform vec3 uBackgroundColor;
uniform vec3 uBlob1Color;
uniform vec3 uBlob2Color;
uniform float uNoiseStrength;
uniform float uBlobRadius;
uniform float uBlobRadiusSecondary;
uniform float uBlobStrength;
uniform float uTime;
uniform float uVelocityIntensity;

float random(vec2 coord) {
  return fract(sin(dot(coord, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec3 color = uBackgroundColor;

  float animTime = uTime * 0.00028;
  vec2 blob1Center = vec2(
    0.50 + sin(animTime * 1.000) * 0.13 + sin(animTime * 1.618) * 0.05,
    0.48 + cos(animTime * 0.794) * 0.09 + cos(animTime * 1.272) * 0.03
  );
  vec2 blob2Center = vec2(
    0.35 + cos(animTime * 0.927) * 0.11 + cos(animTime * 1.414) * 0.04,
    0.55 + sin(animTime * 1.175) * 0.07 + sin(animTime * 0.618) * 0.03
  );

  float blob1 = smoothstep(uBlobRadius, 0.0, distance(vUv, blob1Center));
  float blob2 = smoothstep(uBlobRadiusSecondary, 0.0, distance(vUv, blob2Center));

  vec3 blob1SoftColor = mix(uBlob1Color, uBackgroundColor, 0.35);
  vec3 blob2SoftColor = mix(uBlob2Color, uBackgroundColor, 0.35);
  color = mix(color, blob1SoftColor, blob1 * uBlobStrength);
  color = mix(color, blob2SoftColor, blob2 * uBlobStrength);

  color += uVelocityIntensity * 0.10;

  float grain = random(vUv * vec2(1387.13, 947.91)) - 0.5;
  color += grain * uNoiseStrength;
  color = clamp(color, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
`

// ─── Helpers ──────────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}

// ─── Trail (Catmull-Rom tube) ─────────────────────────────────────────────────
class Trail {
  group: THREE.Group
  points: THREE.Vector3[]
  mesh: THREE.Mesh | null
  maxPoints: number
  maxTrimPerFrame: number
  curveTension: number
  pointSmoothing: number
  material: THREE.MeshStandardMaterial

  constructor() {
    this.group = new THREE.Group()
    this.points = []
    this.mesh = null
    this.maxPoints = 220
    this.maxTrimPerFrame = 4
    this.curveTension = 0.67
    this.pointSmoothing = 0.53
    this.material = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f6f9ff'),
      emissive: new THREE.Color('#ffffff'),
      emissiveIntensity: 1.35,
      roughness: 0.2,
      metalness: 0.05,
      transparent: true,
      opacity: 0.51,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NormalBlending,
    })
  }

  get object() { return this.group }

  addPoint(position: THREE.Vector3) {
    const last = this.points[this.points.length - 1] ?? null
    if (last && position.distanceToSquared(last) < 0.006 * 0.006) return
    const next = position.clone()
    if (last && next.distanceTo(last) > 999) {
      this.points = [next]; this.removeMesh(); return
    }
    const eased = last ? last.clone().lerp(next, this.pointSmoothing) : next
    this.points.push(eased)
    let budget = this.maxTrimPerFrame
    while (this.points.length > this.maxPoints && budget-- > 0) this.points.shift()
    if (this.points.length < 2) return
    this.rebuildMesh()
  }

  rebuildMesh() {
    if (this.points.length < 2) return
    const curve = new THREE.CatmullRomCurve3(this.points, false, 'centripetal', this.curveTension)
    const segments = Math.max(24, Math.min(220, this.points.length * 4))
    const geo = this.createTaperedTube(curve, segments, 0.012, 0.003)
    if (!this.mesh) {
      this.mesh = new THREE.Mesh(geo, this.material)
      this.mesh.renderOrder = 1200
      this.group.add(this.mesh)
    } else {
      this.mesh.geometry.dispose()
      this.mesh.geometry = geo
    }
  }

  createTaperedTube(curve: THREE.CatmullRomCurve3, segments: number, rHead: number, rTail: number) {
    const path = curve.getSpacedPoints(segments)
    const radial = 8, ring = radial + 1
    const verts: number[] = [], idx: number[] = []
    const up = new THREE.Vector3(0, 0, 1)
    const tangent = new THREE.Vector3(), normal = new THREE.Vector3()
    const binormal = new THREE.Vector3(), off = new THREE.Vector3(), vp = new THREE.Vector3()

    for (let i = 0; i < path.length; i++) {
      const t = i / Math.max(path.length - 1, 1)
      const r = rHead + (rTail - rHead) * Math.pow(t, 1.5)
      curve.getTangent(t, tangent).normalize()
      normal.crossVectors(up, tangent).normalize()
      if (normal.lengthSq() === 0) normal.set(1, 0, 0)
      binormal.crossVectors(tangent, normal).normalize()
      for (let j = 0; j <= radial; j++) {
        const a = (j / radial) * Math.PI * 2
        off.copy(normal).multiplyScalar(-Math.cos(a) * r).addScaledVector(binormal, Math.sin(a) * r)
        vp.copy(path[i]).add(off)
        verts.push(vp.x, vp.y, vp.z)
      }
    }
    for (let i = 0; i < path.length - 1; i++) {
      for (let j = 0; j < radial; j++) {
        const b = i * ring + j
        idx.push(b, b + ring, b + 1, b + ring, b + ring + 1, b + 1)
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
    geo.setIndex(idx)
    geo.computeVertexNormals()
    return geo
  }

  removeMesh() {
    if (this.mesh) { this.mesh.geometry.dispose(); this.group.remove(this.mesh); this.mesh = null }
  }

  reset() { this.removeMesh(); this.points = [] }

  dispose() { this.reset(); this.material.dispose() }
}

// ─── Embedded Gallery Component ───────────────────────────────────────────────
export default function EmbeddedGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    // ── State ──────────────────────────────────────────────────────────────
    let running = true
    const PLANE_GAP = 5
    const MOBILE_BP = 768
    const DESKTOP_SCALE = 1
    const MOBILE_SCALE = 0.65

    // Pointer
    const pointerTarget = new THREE.Vector2(0, 0)
    const pointerCurrent = new THREE.Vector2(0, 0)

    // Breath
    let breathIntensity = 0, targetBreath = 0

    // Drift
    let driftCurrent = 0, driftTarget = 0

    // Scroll
    let scrollTarget = 0, scrollCurrent = 0, prevScrollCurrent = 0
    let velocity = 0, rawVelocity = 0
    const VELOCITY_MAX = 1.5
    let cameraStartZ = 0, minCameraZ = -Infinity, maxCameraZ = Infinity
    let touchY = 0

    // ── Renderer ───────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.autoClear = false
    renderer.setClearColor(0x000000, 0)

    // ── Main Scene + Camera ────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 6)

    // ── Background Scene ───────────────────────────────────────────────────
    const bgScene = new THREE.Scene()
    const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const bgColor = new THREE.Color('#fffaf0')
    const blob1Color = new THREE.Color('#ffdf94')
    const blob2Color = new THREE.Color('#fce7c4')
    const nextBgColor = new THREE.Color()
    const nextBlob1 = new THREE.Color()
    const nextBlob2 = new THREE.Color()

    const bgMaterial = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        uBackgroundColor: { value: bgColor },
        uBlob1Color: { value: blob1Color },
        uBlob2Color: { value: blob2Color },
        uNoiseStrength: { value: 0.04 },
        uBlobRadius: { value: 0.65 },
        uBlobRadiusSecondary: { value: 0.65 * 0.78 },
        uBlobStrength: { value: 0.9 },
        uTime: { value: 0 },
        uVelocityIntensity: { value: 0 },
      },
    })
    const bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMaterial)
    bgScene.add(bgMesh)

    let smoothedDepth = 0, smoothedVel = 0
    let motionDepth = 0, motionVel = 0

    // ── Planes ─────────────────────────────────────────────────────────────
    const planes: THREE.Mesh[] = []
    const planeGeo = new THREE.PlaneGeometry(3, 3)
    const textureLoader = new THREE.TextureLoader()

    GALLERY_PLANES.forEach((cfg, i) => {
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(cfg.fallbackColor || '#333333'),
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false,
        opacity: i === 0 ? 1 : 0,
      })
      const mesh = new THREE.Mesh(planeGeo, mat)
      mesh.userData = {
        basePosition: cfg.position,
        fallbackColor: cfg.fallbackColor,
        accentColor: cfg.accentColor,
        backgroundColor: cfg.backgroundColor || '#000000',
        backgroundImage: (cfg as any).backgroundImage || cfg.textureSrc,
        blob1Color: cfg.blob1Color,
        blob2Color: cfg.blob2Color,
        label: cfg.label,
        aspectRatio: 1,
      }
      scene.add(mesh)
      planes.push(mesh)

      // Load texture async
      textureLoader.loadAsync(cfg.textureSrc).then((tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        const img = tex.image as HTMLImageElement
        if (img?.width > 0 && img?.height > 0) {
          mesh.userData.aspectRatio = 3 / 4
        }
        mat.map = tex
        mat.color.set('#ffffff')
        mat.needsUpdate = true
        updatePlaneScaleAll()
      }).catch(() => { /* texture load failed silently */ })
    })

    // ── Trail ──────────────────────────────────────────────────────────────
    const trail = new Trail()
    scene.add(trail.object)
    scene.add(new THREE.AmbientLight('#ffffff', 1.2))

    let trailPrevProgress: number | null = null
    let trailPrevDir = 0
    let trailHasMovedFromStart = false
    let trailCurrentOpacity = 0.51
    let trailHasSeeded = false

    // ── Layout Helpers ─────────────────────────────────────────────────────
    function isMobile() { return window.innerWidth <= MOBILE_BP }
    function getXSpread() { return isMobile() ? 0.25 : 1 }

    function updatePlaneScaleAll() {
      const scale = isMobile() ? MOBILE_SCALE : DESKTOP_SCALE
      planes.forEach((p) => {
        const ar = p.userData.aspectRatio ?? 1
        p.scale.set(scale * ar, scale, 1)
      })
    }

    function layoutPlanes() {
      const xs = getXSpread()
      planes.forEach((p, i) => {
        const bp = p.userData.basePosition ?? { x: 0, y: 0 }
        p.position.set(bp.x * xs, bp.y, -i * PLANE_GAP)
      })
    }

    function getDepthRange() {
      if (!planes.length) return { nearestZ: 0, deepestZ: 0 }
      const zs = planes.map((p) => p.position.z)
      return { nearestZ: Math.max(...zs), deepestZ: Math.min(...zs) }
    }

    function updateCameraBounds() {
      const { nearestZ, deepestZ } = getDepthRange()
      maxCameraZ = nearestZ + 5
      minCameraZ = deepestZ + 5
      if (minCameraZ > maxCameraZ) minCameraZ = maxCameraZ
    }

    function cameraZFromScroll(s: number) { return cameraStartZ - s * 0.01 }
    function scrollFromCameraZ(z: number) { return (cameraStartZ - z) / 0.01 }

    function getPlaneBlendData(cz: number) {
      if (!planes.length) return null
      const gap = Math.max(PLANE_GAP, 0.0001)
      const first = planes[0].position.z
      const lastIdx = planes.length - 1
      const sampled = cz - gap * 1
      const nd = clamp((first - sampled) / gap, 0, lastIdx)
      const cur = Math.floor(nd)
      const next = Math.min(cur + 1, lastIdx)
      return { currentPlaneIndex: cur, nextPlaneIndex: next, blend: nd - cur }
    }

    function getMoodBlendData(cz: number) {
      if (!planes.length) return null
      const gap = Math.max(PLANE_GAP, 0.0001)
      const first = planes[0].position.z
      const lastIdx = planes.length - 1
      const sampled = cz - gap * 1
      const nd = clamp((first - sampled) / gap, 0, lastIdx)
      const cur = Math.floor(nd)
      const next = Math.min(cur + 1, lastIdx)
      const blend = nd - cur
      const cm = planes[cur]?.userData
      const nm = planes[next]?.userData
      return {
        currentMood: { background: cm?.backgroundColor, blob1: cm?.blob1Color, blob2: cm?.blob2Color },
        nextMood: { background: nm?.backgroundColor, blob1: nm?.blob1Color, blob2: nm?.blob2Color },
        blend
      }
    }

    function getDepthProgress(cz: number) {
      const { nearestZ, deepestZ } = getDepthRange()
      const span = nearestZ - deepestZ
      if (span <= 0) return 0
      return clamp((nearestZ - cz) / span, 0, 1)
    }

    // ── Resize (scoped to container) ────────────────────────────────────────
    function resize() {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      if (w <= 0 || h <= 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
      updatePlaneScaleAll()
      layoutPlanes()
      updateLabel(camera.position.z)
    }

    // ── Background Image Overlay (appended to container) ────────────────────
    const bgImageOverlay = document.createElement('div')
    bgImageOverlay.className = 'embedded-gallery-bg'
    bgImageOverlay.style.cssText = `
      position: absolute; inset: -5%; z-index: 0;
      background-size: cover; background-position: center;
      transition: background-image 800ms ease;
      filter: brightness(0.5) blur(20px);
      pointer-events: none;
    `
    container.appendChild(bgImageOverlay)

    // ── Label overlay (appended to container) ───────────────────────────────
    const labelOverlay = document.createElement('section')
    labelOverlay.className = 'embedded-gallery-label'
    labelOverlay.style.cssText = `
      position: absolute; inset: 0; z-index: 80; pointer-events: none;
      opacity: 0; transition: opacity 260ms ease;
      font-family: 'IBM Plex Mono', 'SFMono-Regular', Menlo, Monaco, monospace;
      text-transform: uppercase; letter-spacing: 0.08em; font-size: 10px; line-height: 1.2;
      color: rgba(244,244,244,0.92);
    `
    labelOverlay.innerHTML = `
      <div class="dg-content" style="position:absolute;top:50%;left:0;width:90%;max-width:400px;transform:translate(var(--content-x, 8vw), -50%);display:flex;flex-direction:column;">
        <p class="dg-index" style="margin:0 0 1.5rem 0;font-size:13px;font-weight:600;letter-spacing:0.15em;opacity:0.9;"></p>
        <div style="display:flex;align-items:center;gap:0.75rem;margin:0 0 0.5rem 0;">
          <span class="dg-chip" style="width:14px;height:14px;border-radius:50%;display:inline-block;"></span>
          <h2 class="dg-word" style="margin:0;font-size:clamp(22px,2.5vw,36px);font-weight:700;letter-spacing:0.02em;"></h2>
        </div>
        <p class="dg-pms" style="margin:0 0 2rem 0;font-size:11px;opacity:0.7;letter-spacing:0.1em;text-transform:uppercase;"></p>
        
        <a href="#" class="dg-cta" style="pointer-events:auto;display:inline-flex;align-items:center;gap:1rem;font-size:12px;font-weight:500;letter-spacing:0.05em;text-decoration:none;color:inherit;transition:opacity 0.2s;opacity:0.8;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">
          <span style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border:1px solid currentColor;opacity:0.5;transition:opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.5'">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M15 5l7 7-7 7"/></svg>
          </span>
          View Product
        </a>
      </div>
    `
    container.appendChild(labelOverlay)

    // ── Scroll Hint ─────────────────────────────────────────────────────────
    const scrollHint = document.createElement('div')
    scrollHint.style.cssText = `
      position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
      z-index: 90; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
      color: rgba(255,255,255,0.4); font-size: 10px; letter-spacing: 0.15em;
      text-transform: uppercase; font-family: 'IBM Plex Mono', monospace;
      pointer-events: none; animation: embeddedScrollBounce 2s ease-in-out infinite;
    `
    scrollHint.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity:0.5">
        <path d="M12 5v14M5 12l7 7 7-7"/>
      </svg>
      <span>Scroll to explore</span>
    `
    container.appendChild(scrollHint)

    let activeLabelIndex = -1

    function updateLabel(cz: number) {
      const bd = getPlaneBlendData(cz)
      if (!bd) { labelOverlay.style.opacity = '0'; return }
      const ti = bd.blend >= 0.5 ? bd.nextPlaneIndex : bd.currentPlaneIndex
      if (ti < 0 || ti >= planes.length) { labelOverlay.style.opacity = '0'; return }
      labelOverlay.style.opacity = '1'
      if (activeLabelIndex === ti) return
      activeLabelIndex = ti
      const { accentColor, label, basePosition } = planes[ti].userData
      const elIndex = labelOverlay.querySelector('.dg-index') as HTMLElement
      const elWord = labelOverlay.querySelector('.dg-word') as HTMLElement
      const elChip = labelOverlay.querySelector('.dg-chip') as HTMLElement
      const elPms = labelOverlay.querySelector('.dg-pms') as HTMLElement
      const elContent = labelOverlay.querySelector('.dg-content') as HTMLElement

      if (elContent) {
        const mob = window.innerWidth <= 768
        if (mob) {
          elContent.style.setProperty('--content-x', 'calc(50vw - 50%)')
        } else {
          // Keep text position fixed at the left on desktop
          elContent.style.setProperty('--content-x', 'clamp(2.5rem, 8vw, 12rem)')
        }
      }

      if (elIndex) elIndex.textContent = '#' + String(ti + 1).padStart(2, '0')
      if (elWord) elWord.textContent = label?.word ?? 'tone'
      if (elChip) elChip.style.backgroundColor = accentColor
      if (elPms) elPms.textContent = label?.pms ?? 'N/A'
      labelOverlay.style.color = label?.color ?? '#ffffff'

      const bgImg = planes[ti].userData.backgroundImage
      if (bgImg) bgImageOverlay.style.backgroundImage = `url(${bgImg})`

      // Hide scroll hint after first scroll
      if (ti > 0) scrollHint.style.opacity = '0'
    }

    // ── Input Events (scoped to container) ─────────────────────────────────
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      pointerTarget.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      )
    }
    const onPointerLeave = () => { pointerTarget.set(0, 0) }

    function normalizeWheel(e: WheelEvent) {
      if (!container) return e.deltaY
      if (e.deltaMode === 1) return e.deltaY * 16
      if (e.deltaMode === 2) return e.deltaY * container.clientHeight
      return e.deltaY
    }
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      scrollTarget += normalizeWheel(e)
    }
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0]?.clientY ?? 0 }
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const cy = e.touches[0]?.clientY ?? touchY
      scrollTarget += (touchY - cy) * 1.8
      touchY = cy
    }

    container.addEventListener('pointermove', onPointerMove, { passive: true })
    container.addEventListener('pointerleave', onPointerLeave, { passive: true })
    container.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('resize', resize)

    // ── Trail Helpers ──────────────────────────────────────────────────────
    const FULL_CIRCLE = Math.PI * 2
    const trailHead = new THREE.Vector3()

    function getTrailProgress(cam: THREE.Camera) {
      const range = maxCameraZ - minCameraZ
      if (Number.isFinite(range) && range > 0) {
        return clamp((maxCameraZ - cam.position.z) / range, 0, 1)
      }
      return getDepthProgress(cam.position.z)
    }

    function computeTrailHead(camZ: number, progress: number) {
      const p = clamp(progress, 0, 1)
      const mobile = isMobile()
      const startX = -0.96 + (mobile ? 0.35 : 0)
      const hWidth = 3 * (mobile ? 0.35 : 1)
      const hCycles = 1.85, vCycles = 2.1
      const x = startX + Math.sin(p * FULL_CIRCLE * hCycles) * hWidth
      const y = -1.05 + Math.sin(p * FULL_CIRCLE * vCycles) * 0.78
      const depthP = -0.1 + p * 1.1
      const z = camZ + 1.65 - (4.78 + depthP * 6.52)
      trailHead.set(x, y, z)
      return trailHead
    }

    function seedTrail(cam: THREE.Camera) {
      if (trailHasSeeded) return
      const start = computeTrailHead(cam.position.z, 0).clone()
      for (let i = 10; i >= 0; i--) {
        const p = start.clone(); p.z -= i * 0.12
        trail.addPoint(p)
      }
      trailHasSeeded = true
    }

    function updateTrailLength(progress: number, dir: number) {
      const lp = dir < 0 ? progress * 0.55 : progress
      trail.maxPoints = Math.round(lerp(14, 220, clamp(lp, 0, 1)))
      trail.maxTrimPerFrame = dir < 0 ? 32 : 4
    }

    function updateTrailOpacity(progress: number) {
      const startDist = clamp(progress + 0.1, 0, 1)
      const endDist = 1 - progress
      const closest = Math.min(startDist, endDist)
      const s = (v: number, lo: number, hi: number) => clamp((v - lo) / (hi - lo), 0, 1)
      const edgeVis = s(closest, 0.04, 0.2) * s(closest, 0.04, 0.2) * (3 - 2 * s(closest, 0.04, 0.2))
      const idleVis = !trailHasMovedFromStart && progress <= 0.01 ? 0.55 : 0
      const vis = Math.max(edgeVis, idleVis)
      const target = 0.51 * vis
      trailCurrentOpacity = lerp(trailCurrentOpacity, target, 0.12)
      trail.material.opacity = trailCurrentOpacity
    }

    // ── Init ───────────────────────────────────────────────────────────────
    updatePlaneScaleAll()
    layoutPlanes()
    updateCameraBounds()
    cameraStartZ = maxCameraZ
    camera.position.z = cameraStartZ

    resize()
    seedTrail(camera)

    // ── Animate ────────────────────────────────────────────────────────────
    let rafId = 0

    function animate() {
      if (!running) return
      rafId = requestAnimationFrame(animate)
      const time = performance.now()

      // ── Scroll ──────────────────────────────────────────────────────────
      updateCameraBounds()
      const minScroll = scrollFromCameraZ(maxCameraZ)
      const maxScroll = scrollFromCameraZ(minCameraZ)
      scrollTarget = clamp(scrollTarget, minScroll, maxScroll)
      scrollCurrent = lerp(scrollCurrent, scrollTarget, 0.08)
      scrollCurrent = clamp(scrollCurrent, minScroll, maxScroll)

      rawVelocity = scrollCurrent - prevScrollCurrent
      velocity = lerp(velocity, rawVelocity, 0.12)
      velocity = clamp(velocity, -VELOCITY_MAX, VELOCITY_MAX)
      if (Math.abs(velocity) < 0.0001) velocity = 0
      prevScrollCurrent = scrollCurrent

      camera.position.z = clamp(cameraZFromScroll(scrollCurrent), minCameraZ, maxCameraZ)

      // ── Plane Visibility ─────────────────────────────────────────────────
      const bd = getPlaneBlendData(camera.position.z)
      if (bd) {
        const { currentPlaneIndex: ci, nextPlaneIndex: ni, blend } = bd
        planes.forEach((p, idx) => {
          let target = 0
          if (idx === ci) target = 1 - blend
          if (idx === ni) target = Math.max(target, blend)
          const mat = p.material as THREE.MeshBasicMaterial
          mat.opacity = lerp(mat.opacity, target, 0.14)
          mat.needsUpdate = true
        })
      }

      // ── Plane Motion ─────────────────────────────────────────────────────
      pointerCurrent.lerp(pointerTarget, 0.08)
      const velNorm = clamp(Math.abs(velocity) / Math.max(VELOCITY_MAX, 0.0001), 0, 1)
      const scrollDrift = clamp(velocity / Math.max(VELOCITY_MAX, 0.0001), -1, 1)

      targetBreath = clamp(velNorm * 1.1, 0, 1)
      breathIntensity = lerp(breathIntensity, targetBreath, 0.14)
      driftTarget = scrollDrift
      driftCurrent = lerp(driftCurrent, driftTarget, 0.05)

      const xs = getXSpread()
      planes.forEach((p, i) => {
        const bp = p.userData.basePosition ?? { x: 0, y: 0 }
        const op = (p.material as THREE.MeshBasicMaterial).opacity
        const depthInf = 1 + i * 0.05
        const parInf = op * depthInf
        const px = bp.x * xs + pointerCurrent.x * 0.16 * parInf
        const py = bp.y + pointerCurrent.y * 0.08 * parInf + driftCurrent * 0.05
        p.position.set(px, py, -i * PLANE_GAP)
        const bInf = breathIntensity * op
        p.rotation.set(-pointerCurrent.y * 0.045 * bInf, pointerCurrent.x * 0.045 * bInf, 0)
        const baseScale = isMobile() ? MOBILE_SCALE : DESKTOP_SCALE
        const ar = p.userData.aspectRatio ?? 1
        const pulse = 1 + 0.03 * bInf
        p.scale.set(baseScale * ar * pulse, baseScale * pulse, 1)
      })

      // ── Background Mood ──────────────────────────────────────────────────
      const mood = getMoodBlendData(camera.position.z)
      if (mood?.currentMood?.background) {
        const b = clamp(mood.blend, 0, 1)
        bgColor.set(mood.currentMood.background).lerp(nextBgColor.set(mood.nextMood?.background ?? mood.currentMood.background), b)
        blob1Color.set(mood.currentMood.blob1).lerp(nextBlob1.set(mood.nextMood?.blob1 ?? mood.currentMood.blob1), b)
        blob2Color.set(mood.currentMood.blob2).lerp(nextBlob2.set(mood.nextMood?.blob2 ?? mood.currentMood.blob2), b)
        bgMaterial.uniforms.uBackgroundColor.value.copy(bgColor)
        bgMaterial.uniforms.uBlob1Color.value.copy(blob1Color)
        bgMaterial.uniforms.uBlob2Color.value.copy(blob2Color)
      }

      // ── Background Motion ────────────────────────────────────────────────
      motionDepth = getDepthProgress(camera.position.z)
      const distFromCenter = Math.abs((bd?.blend ?? 0) - 0.5) * 2
      const stability = (v => v * v * (3 - 2 * v))(clamp((distFromCenter - 0.35) / (1 - 0.35), 0, 1))
      motionVel = velNorm * stability

      smoothedDepth = lerp(smoothedDepth, motionDepth, 0.1)
      smoothedVel = lerp(smoothedVel, motionVel, 0.1)

      bgMaterial.uniforms.uBlobRadius.value = clamp(0.65 + smoothedDepth * 0.08, 0.05, 1)
      bgMaterial.uniforms.uBlobRadiusSecondary.value = bgMaterial.uniforms.uBlobRadius.value * 0.78
      bgMaterial.uniforms.uBlobStrength.value = clamp(0.9 + smoothedVel * 0.1, 0, 1)
      bgMaterial.uniforms.uTime.value = time
      bgMaterial.uniforms.uVelocityIntensity.value = smoothedVel

      // ── Trail ────────────────────────────────────────────────────────────
      const prog = getTrailProgress(camera)
      if (prog > 0.01) trailHasMovedFromStart = true
      const dir = trailPrevProgress === null ? 0 : Math.sign(prog - trailPrevProgress)
      const effDir = dir !== 0 ? dir : trailPrevDir
      const reversed = dir !== 0 && trailPrevDir !== 0 && dir !== trailPrevDir
      updateTrailLength(prog, effDir)
      const headPos = computeTrailHead(camera.position.z, prog)
      updateTrailOpacity(prog)
      if (reversed) { trail.reset(); const lp = headPos.clone(); lp.z += dir * 0.12; trail.addPoint(lp) }
      trail.addPoint(headPos)
      if (dir !== 0) trailPrevDir = dir
      trailPrevProgress = prog

      // ── Render ───────────────────────────────────────────────────────────
      renderer.clear(true, true, true)
      renderer.clearDepth()
      renderer.render(scene, camera)

      updateLabel(camera.position.z)
    }

    animate()

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      running = false
      cancelAnimationFrame(rafId)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerleave', onPointerLeave)
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', resize)
      labelOverlay.remove()
      bgImageOverlay.remove()
      scrollHint.remove()
      trail.dispose()
      bgMaterial.dispose()
      planeGeo.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100dvh',
          display: 'block',
          touchAction: 'none',
          overflow: 'hidden',
          zIndex: 10,
        }}
      />
      <style>{`
        @keyframes embeddedScrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </div>
  )
}
