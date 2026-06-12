# Design Specification: Acutus Depth Gallery Integration
Date: 2026-06-02
Status: Finalized

## 1. Overview
Integrate the `DepthGallery` 3D experience into the Acutus product page as a pinned "scrollytelling" section. The user "dives" through a sequence of lens planes, creating an immersive transition between the hero section and the product details.

## 2. Technical Architecture

### 2.1 Orchestration
- **`AcutusClient.tsx`**: Acts as the orchestrator. It manages the global scroll state using GSAP `ScrollTrigger`.
- **`DepthGallery.tsx`**: A specialized 3D component that renders the lenses and the background "mood" environment.

### 2.2 The "Dive" Mechanism
- **Pinning**: The gallery section is pinned to the viewport using `ScrollTrigger.create({ pin: true })`.
- **Progress Mapping**: The scroll offset (from `top top` to `+=300%`) is mapped to a `0.0` to `1.0` progress value.
- **Easing**: An `easeInOutCubic` curve is applied to the raw scroll progress to make the movement feel organic and weighted.
- **Imperative Control**: `AcutusClient` communicates the eased progress to `DepthGallery` via a `ref` and a `setProgress` method exposed through `useImperativeHandle`.

### 2.3 3D Scene Implementation
- **Camera Control**: The `camera.position.z` is driven by the provided progress, interpolating between `maxCameraZ` (nearest plane) and `minCameraZ` (deepest plane).
- **Plane Management**: Lenses are positioned at fixed intervals (`PLANE_GAP = 5`).
- **Visibility/Blending**: Plane opacity is blended based on the camera's proximity to each plane's Z-position.
- **Background Mood**: A custom GLSL shader (`FRAGMENT_SHADER`) creates a dynamic, blurred background. This is augmented by DOM-based background image overlays that transition as the user enters a new "plane's" influence.

## 3. UI/UX Details
- **Visual Hierarchy**: Focus is maintained on the current lens plane; peripheral planes fade in/out.
- **Responsive Scaling**: Plane sizes and layout spreads are adjusted for mobile (`MOBILE_SCALE = 0.65`) vs desktop.
- **Label Overlay**: A fixed-position UI overlay updates the lens name, specs, and accent color based on the active plane.

## 4. Performance Optimizations
- **Imperative Updates**: `setProgress` updates a `ref` inside `DepthGallery` rather than triggering React state updates, preventing page re-renders during the 60fps animation loop.
- **Asset Loading**: Textures are loaded asynchronously via `TextureLoader.loadAsync`.
- **Cleanup**: All Three.js geometries, materials, and GSAP triggers are disposed of on component unmount to prevent memory leaks.
