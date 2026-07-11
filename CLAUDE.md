# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Optika is a Next.js 16 (App Router) marketing site for a premium optical-lens brand. The experience is heavy on cinematic visuals: WebGL/3D glasses model, GSAP scroll animations, Lenis/Locomotive smooth scrolling, Framer Motion transitions, and a Tailwind v4 design system built on shadcn/ui (new-york style). Pages cover marketing copy, product catalogs (Acutus, Single Vision, Transitions), a virtual try-on (camera + MediaPipe face mesh), and a contact/enquiry form.

## Commands

There is no test runner configured. Day-to-day commands:

```bash
pnpm dev        # next dev (Turbopack by default on Next 16)
pnpm build      # next build (typescript.ignoreBuildErrors is true; build does not typecheck strictly)
pnpm start      # next start (production)
pnpm lint       # eslint . (next/core-web-vitals + next/typescript)
```

Optional one-off scripts: `node scripts/optimize-images.mjs` (image optimization helper — see file before running).

Notes:
- TypeScript `strict: true`, but `next.config.mjs` sets `typescript.ignoreBuildErrors: true` and `reactStrictMode: false`. Treat the build as a smoke test, not a typecheck.
- Lint is eslint only; no Prettier config is present.
- The `dev` server is permitted to bind `192.168.0.170` (see `allowedDevOrigins`).

## High-Level Architecture

### Routing (App Router, `app/`)
Server components are the default; pages opt into `"use client"` when they need state, refs, or browser APIs.

- `app/page.tsx` — Home. Owns a four-step state machine (`checking → loader-only | reel → fading-out → fading-in → hero`) that gates the cinematic intro (`Loader` / `ReelIntro`) behind a WebGL capability probe (`lib/webgl-capable.ts`). Below the gate it composes a `MainLayout` with `SmoothScroll` (Lenis) and dynamically imports the heavyweight sections (`LensCategoriesSection`, `Solutions`, `PerformanceSection`, `FaqSection`, `ContactSection`).
- `app/layout.tsx` — Root layout. Loads Inter + Playfair Display via `next/font/google`, preconnects to the assistly chat origin and the Vercel blob origin, preloads the local 3D glasses model (`/AkshtaS spetcs2.glb`), and mounts site-wide chrome (`Navigation`, `CustomCursor`, `AssistlyChatWidget`, `@vercel/analytics`).
- `app/products/` — Catalog. `acutus/page.tsx` wraps a client component (`AcutusClient.tsx`) for a gallery-style scroll experience; `acutus/[slug]/page.tsx` is a static, data-driven detail page (`generateStaticParams` + `generateMetadata` over `lib/products/product-detail.ts`).
- `app/solutions/page.tsx` — Marketing page driven by inline `SHOWCASE_SLIDES` constant and the shared `Solutions` / `SolutionsGridSection` components.
- `app/try-on/page.tsx` — Virtual try-on (MediaPipe Face Mesh + canvas overlay). See `lib/try-on/` for the face-tracking pipeline.
- `app/contact/` and `app/contact/enquiry/` — Contact card and the dark-mode enquiry form.
- `app/about/`, `app/privacy-policy/`, `app/terms/` — Mostly client-rendered marketing/legal pages that compose shared sections.

### Components (`components/`)
The component layer is flat. Conventions to know:
- `components/ui/*` is the shadcn/ui library (lucide icons, radix primitives, tw-animate-css). Do not edit by hand — extend via shadcn add.
- Section components live at `components/*.tsx` (e.g. `hero-section.tsx`, `faq-section.tsx`, `lens-categories-section.tsx`). Many are heavy client components.
- Some features have their own subdirectory: `hero/`, `lens/`, `try-on/`, `gallery/`, `video/`, `webgl/shaders/`, `optika/`, `product-detail/`, `transition/`, `tt` (single file).
- Several files exist as alternates / experiments — many components are unused on the live routes. Before changing a "dead-looking" component, grep its imports.

### Hooks (`hooks/`)
- `use-sticky-sections.ts` — GSAP `ScrollTrigger` `pin: true` + `pinSpacing: false` stack of `#about`, `#difference`, `#partners` on the home page (desktop-only via `matchMedia("(min-width: 1024px)")`). Called from `app/page.tsx` after the intro completes.
- `use-gsap.ts` — `useGSAP(callback, deps)` with SSR-safe `useLayoutEffect` and a `gsap.context` for scoped cleanup.
- `use-glasses-renderer.ts`, `use-lens-categories.ts`, `use-mobile.ts`, `use-toast.ts` — feature-specific.

### Library (`lib/`)
- `utils.ts` — `cn()` (clsx + tailwind-merge). The only shadcn-required util.
- `assistly.ts` — Single source of truth for the chat widget (origin, chatbot id, logo, primary color). Update here, not in `AssistlyChatWidget`.
- `webgl-capable.ts` — Cached `probeWebGL()` (one canvas probe per session). Drives the home page's WebGL/no-WebGL fallback path.
- `products/product-detail.ts` — Slug-keyed product data for the Acutus detail route. Consumed by `generateStaticParams` and the detail page.
- `reel-gradient-themes.ts`, `reel-materials.ts` — Theme tokens used by the reel intro.
- `motion-preferences.ts` — `prefers-reduced-motion` helper (used to gate heavy animations).
- `try-on/` — Face-mesh pipeline: `face-mesh-landmarks.ts`, `face-pose.ts`, `face-to-scene.ts`, `glasses-canvas-renderer.ts`, `glasses-placement.ts`, `ipd-scale.ts`, `overlay-canvas.ts`, `draw-mirror.ts`, `draw-swatch-mirror.ts`, `glasses-model.ts`, `glasses-css-layout.ts`, `swatches.ts`, `use-face-mesh.ts`, `canvas-overlay.ts`, `data.ts`.
- `design-frame.ts` — Frame design helpers.

### Constants (`constants/products.ts`)
Currently a placeholder; product copy lives in `lib/products/`.

### Styling
- Tailwind v4 via `@tailwindcss/postcss` (no `tailwind.config.*` file). Theme tokens live as CSS variables in `app/globals.css` and `styles/globals.css` (the latter is the older copy — `app/globals.css` is what the layout imports).
- Fonts: `Inter` (body) and `Playfair_Display` (display), exposed as `--font-inter` / `--font-playfair`.
- Class merge via `cn()` from `lib/utils.ts`.

### Key conventions
- Path alias: `@/*` → repo root (see `tsconfig.json`).
- shadcn/ui `components.json` aliases match the alias config above.
- Heavy client components (WebGL/3D, GSAP, snap-scroll, virtual try-on) are loaded via `next/dynamic` from server components or other client components to keep the initial bundle small.
- The home page intentionally hides `<header>` while the intro plays via an inline `<style dangerouslySetInnerHTML>`.
- `next.config.mjs` caches fonts, `.mp4`, `.jpg`, `.png` for 1 year and emits `Cache-Control: public, max-age=31536000, immutable`. A permanent redirect `/products/actus-due-plus → /products/acutus/actus-due-plus` is configured.
- `lint` and `build` should both pass before pushing. The codebase does not currently have unit tests; the bar is "no new lint errors, no new build errors, no console errors in dev."

### Public assets
Static images, 3D models (`.glb`), and videos live in `public/`. Two `.glb` models are used: `AkshtaS spetcs2.glb` (preloaded by the root layout) and `glasses.glb`.
