/** CSS custom properties for `#global-gradient-bg` (Reel intro scroll phases) */

export type ReelGradientCssVars = Record<string, string>

/** Craft section base — warm beige (Figma / brand cream) */
export const REEL_CRAFT_BEIGE = "#F3F3F3"

export const REEL_GRADIENT_DARK: ReelGradientCssVars = {
  "--gradient-background-start": "rgb(0, 0, 0)",
  "--gradient-background-end": "rgb(0, 0, 0)",
  "--first-color": "221, 74, 255",
  "--second-color": "221, 74, 255",
  "--third-color": "200, 50, 50",
  "--fourth-color": "0, 255, 255",
  "--pointer-color": "140, 100, 255",
  "--blending-value": "screen",
}

/** Beige base + colored blobs (Craft) */
export const REEL_GRADIENT_LIGHT: ReelGradientCssVars = {
  "--gradient-background-start": REEL_CRAFT_BEIGE,
  "--gradient-background-end": REEL_CRAFT_BEIGE,
  "--first-color": "200, 140, 255",
  "--second-color": "255, 150, 100",
  "--third-color": "255, 200, 160",
  "--fourth-color": "220, 180, 255",
  "--pointer-color": "180, 120, 255",
  "--blending-value": "soft-light",
}
