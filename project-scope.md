# Optika Marketing Site

## Problem

Optika is a premium digital and photochromic lens brand with a portfolio of products (Acutus, Single Vision, Transitions) that need to be showcased online. The brand's visual identity is cinematic and design-led, but the previous web presence did not match that positioning, and a flagship experience like a virtual try-on was missing entirely. Product information was hard to surface, the marketing pages were static, and there was no way for a prospective customer to preview frames and lens tints before visiting a clinic.

## Solution

Build a single Next.js marketing site that combines cinematic product storytelling with a working virtual try-on. A WebGL-gated intro and GSAP-choreographed scroll carry the brand mood on the marketing pages, while a camera-based virtual try-on (MediaPipe face mesh + canvas overlay) gives visitors a hands-on reason to stay. Product catalog and detail pages are data-driven so new SKUs can be added without code changes. The site is built on shadcn/ui + Tailwind v4 so design updates stay consistent, and it ships on Vercel for fast global delivery.

## Features

- Cinematic home page with WebGL-gated intro (Loader → ReelIntro) and Lenis smooth scroll
- GSAP scroll-triggered sticky-stack sections on the home page
- Product catalog: Acutus, Single Vision, and Transitions marketing pages
- Static, data-driven product detail pages with SEO metadata (per-slug `generateStaticParams` + `generateMetadata`)
- Virtual try-on: camera capture, MediaPipe face-mesh tracking, canvas overlay, lens-swatch picker
- Contact card and dark-mode enquiry form
- Assistly chatbot widget on every page
- Custom cursor and animated navigation with mega-menu
- Vercel Analytics for pageview tracking
- Responsive layout, Inter + Playfair Display typography, and a shadcn/ui (new-york) design system

For the full dependency inventory, see [`tech-stack.md`](./tech-stack.md).
