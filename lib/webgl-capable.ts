/** Cached result — one lightweight canvas probe per session (no THREE.WebGLRenderer). */
let cached: boolean | null = null;

export function probeWebGL(): boolean {
  if (cached !== null) return cached;
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const attrs: WebGLContextAttributes = {
      alpha: true,
      antialias: true,
      failIfMajorPerformanceCaveat: false,
      powerPreference: "default",
    };
    const gl =
      canvas.getContext("webgl2", attrs) ??
      canvas.getContext("webgl", attrs);
    if (!gl) {
      cached = false;
      return false;
    }
    const ext = gl.getExtension("WEBGL_lose_context");
    ext?.loseContext();
    cached = true;
    return true;
  } catch {
    cached = false;
    return false;
  }
}
