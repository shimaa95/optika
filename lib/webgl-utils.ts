import { probeWebGL } from "@/lib/webgl-capable"

/** Whether the device can create a WebGL1/WebGL2 context (cached per session). */
export function isWebGLSupported(): boolean {
  return probeWebGL()
}
  
/** True for phones / small touch devices (used to tune GPU load). */
export function isMobileGPU(): boolean {
  return false
}
