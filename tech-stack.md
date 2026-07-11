# Tech Stack — Optika Marketing Site (As-Built)

> Sibling document to `project-scope.md`. Contains the detailed dependency inventory for the Optika marketing site.
> **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · shadcn/ui (new-york)

The site is a single Next.js application that doubles as a marketing surface and a WebGL/AR playground. The stack is chosen so the marketing pages stay SEO-friendly and lightweight (server-rendered with selective dynamic imports) while the few heavy interactive surfaces (3D glasses, virtual try-on, GSAP-choreographed scroll) ship in their own bundles.

## 1. Core platform

| Concern | Choice | Version | Notes |
|---|---|---|---|
| Framework | Next.js (App Router) | `16.2.0` | Server components by default; route-level `generateStaticParams` for product detail. |
| UI runtime | React | `19.2.4` | RSC + hooks; `reactStrictMode: false` in `next.config.mjs`. |
| Language | TypeScript | `5.7.3` | `strict: true`; **build skips type errors** (`typescript.ignoreBuildErrors: true`). |
| Package manager | pnpm | — | `pnpm-lock.yaml` committed. |
| Linting | ESLint (`next/core-web-vitals`, `next/typescript`) | `^9.16.0` | No Prettier / no lint-staged. |
| Hosting | Vercel (assumed) | — | `@vercel/analytics` mounted in `app/layout.tsx`. |

## 2. Styling & design system

| Concern | Choice | Version | Notes |
|---|---|---|---|
| CSS framework | Tailwind CSS | `^4.2.0` | Driven by `@tailwindcss/postcss`. **No `tailwind.config.*` file** — theme tokens are CSS variables in `app/globals.css`. |
| Animation utilities | `tw-animate-css` | `1.3.3` | Companion animation kit for Tailwind v4. |
| Component library | shadcn/ui (new-york style) | — | Source-of-truth styles in `components/ui/*`; config in `components.json`. |
| Primitives | Radix UI | `1.x` | 25+ packages (accordion, dialog, dropdown, popover, tabs, toast, etc.). |
| Class merging | `clsx` + `tailwind-merge` via `cn()` | `^2.1.1` / `^3.3.1` | Single helper in `lib/utils.ts`. |
| Variant authoring | `class-variance-authority` | `^0.7.1` | Used by shadcn `button`, `card`, etc. |
| Icons | `lucide-react` | `^0.564.0` | Site-wide icon set. |
| Fonts | Inter + Playfair Display via `next/font/google` | — | Exposed as `--font-inter` / `--font-playfair`. |

## 3. Animation & scroll

| Concern | Choice | Version | Notes |
|---|---|---|---|
| Timeline / scroll triggers | `gsap` + `@gsap/react` | `^3.12.7` / `^2.1.2` | Drives the home-page sticky stack, reel intro, and lens reveals. |
| Component-level motion | `framer-motion` | `^12.38.0` | Used in `Navigation`, dialogs, and small UI transitions. |
| Smooth scroll | `lenis` (+ `locomotive-scroll` available) | `^1.3.23` | Wraps the home page in `components/SmoothScroll.tsx`. |
| Layout / panes | `react-resizable-panels` | `^2.1.7` | Available for split layouts. |

## 4. 3D, WebGL & visual effects

| Concern | Choice | Version | Notes |
|---|---|---|---|
| 3D scene graph | `three` + `@react-three/fiber` + `@react-three/drei` | `^0.175.0` / `^9.1.2` / `^10.0.6` | Used for the hero glasses model (`public/AkshtaS spetcs2.glb`). |
| Custom WebGL | Hand-written GLSL canvas | — | Lives in `components/webgl/` (shaders) and `components/cinematic-hero.tsx`. |
| Background effects | `background-gradient-animation.tsx` | — | Animated gradient canvas on select sections. |

## 5. Virtual try-on

| Concern | Choice | Version | Notes |
|---|---|---|---|
| Camera capture | `react-webcam` | `^7.2.0` | Mounted on `/try-on`. |
| Face tracking | `@mediapipe/face_mesh` | `^0.4.1633559619` | Provides 468-landmark face mesh. |
| Try-on logic | Custom pipeline in `lib/try-on/` | — | `face-mesh-landmarks`, `face-pose`, `face-to-scene`, `glasses-placement`, `ipd-scale`, `glasses-canvas-renderer`, `glasses-css-layout`, `overlay-canvas`, `draw-mirror`, `draw-swatch-mirror`, `use-face-mesh`, `canvas-overlay`, `data`, `swatches`. |

## 6. Forms, validation & data utilities

| Concern | Choice | Version | Notes |
|---|---|---|---|
| Form state | `react-hook-form` | `^7.54.1` | |
| Schema validation | `zod` | `^3.24.1` | |
| Resolver | `@hookform/resolvers` | `^3.9.1` | Bridges RHF + Zod. |
| Date utilities | `date-fns` | `4.1.0` | |
| Date picker | `react-day-picker` | `9.13.2` | |
| OTP input | `input-otp` | `1.4.2` | |
| Charts (if needed) | `recharts` | `2.15.0` | |
| Command palette | `cmdk` | `1.1.1` | |
| Drawer | `vaul` | `^1.1.2` | |
| Toasts | `sonner` | `^1.7.1` | |
| Theming | `next-themes` | `^0.4.6` | |
| Carousel | `embla-carousel-react` | `8.6.0` | |

## 7. Build / infrastructure

| Concern | Choice | Version | Notes |
|---|---|---|---|
| PostCSS plugin | `@tailwindcss/postcss` | `^4.2.0` | Required by Tailwind v4. |
| Autoprefixer | `autoprefixer` | `^10.4.20` | |
| Image processing | `sharp` | `^0.34.5` | `next/image` AVIF/WebP transcoding. |
| Image helpers | `jpeg-js`, `pngjs` | `^0.4.4` / `^7.0.0` | Used by `scripts/optimize-images.mjs`. |
| Type defs | `@types/node`, `@types/react`, `@types/react-dom`, `@types/three`, `@types/react-webcam` | `^22` / `19.2.14` / `19.2.3` / `^0.175.0` / `^3.0.0` | |

## 8. Notable build configuration (`next.config.mjs`)

- **Image formats:** AVIF, WebP. Remote pattern: `images.unsplash.com`.
- **Caching:** `Cache-Control: public, max-age=31536000, immutable` for `/fonts`, `*.mp4`, `*.jpg`, `*.png`.
- **Compression:** `compress: true`.
- **Dev server origins:** `192.168.0.170` is allow-listed.
- **Redirects:** `permanent: true` redirect from `/products/actus-due-plus` → `/products/acutus/actus-due-plus`.
- **Lint config:** `.eslint` ignores `.next`, `out`, `build`, `node_modules`.

## 9. What is *not* in the stack (and why it matters)

- **No testing framework** — there is nothing to run (`pnpm test` is not defined).
- **No CI / no Husky / no commit hooks** — code ships by `git push` only.
- **No CMS client** — products are hard-coded in `lib/products/product-detail.ts`; the file is annotated as Sanity-ready but no Sanity SDK is installed.
- **No i18n library** — copy is English-only; no `next-intl`, `next-i18next`, etc.
- **No analytics beyond Vercel Analytics** — no Segment, Plausible, GTM, etc.
- **No error-reporting SDK** — no Sentry, no Datadog RUM.

---

*Document reflects the codebase as of the last commit on `main`. Regenerate after structural changes.*
