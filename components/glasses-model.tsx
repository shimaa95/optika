"use client";

import React, {
  useRef,
  useLayoutEffect,
  Suspense,
  useState,
  useEffect,
} from "react";

import { Canvas, useFrame } from "@react-three/fiber";

import {
  useGLTF,
  Environment,
  ContactShadows,
  Center,
} from "@react-three/drei";

import * as THREE from "three";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ensureGsap } from "@/lib/gsap";

import {
  REEL_CRAFT_BEIGE,
  REEL_GRADIENT_DARK,
  REEL_GRADIENT_LIGHT,
} from "@/lib/reel-gradient-themes";

import { applyReelGlassesMaterials } from "@/lib/reel-materials";

import { prefersReducedMotion } from "@/lib/motion-preferences";

ensureGsap();

const MODEL_URL = "/AkshtaS%20spetcs2.glb";

const SCENE_ANIM_SEL =
  ".gs-scene-1-title, .gs-scene-1-p, .gs-scene-1-scroll, " +
  ".gs-scene-2-title, .gs-scene-2-p, " +
  ".gs-scene-3-title, .gs-scene-3-sub, .gs-scene-3-p, .gs-scene-3-btn";

useGLTF.preload(MODEL_URL);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const ease = (x: number) => -(Math.cos(Math.PI * x) - 1) / 2;

function DeferredEnvironment() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const start = () => {
      if (!cancelled) setReady(true);
    };

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(start);
    });

    return () => {
      cancelled = true;

      cancelAnimationFrame(id);
    };
  }, []);

  if (!ready) return null;

  return <Environment preset="studio" />;
}

function Model({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  const { scene } = useGLTF(MODEL_URL);

  const [scale, setScale] = useState(0.45);

  useLayoutEffect(() => {
    const handleResize = () => setScale(window.innerWidth < 768 ? 0.25 : 0.45);

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    applyReelGlassesMaterials(scene);
  }, [scene]);

  return (
    <group ref={groupRef} dispose={null}>
      <Center>
        <primitive object={scene} scale={scale} />
      </Center>
    </group>
  );
}

type SceneProps = {
  isVisible?: boolean;

  reducedMotion?: boolean;
};

function Scene({ isVisible, reducedMotion = false }: SceneProps) {
  const [isMobile, setIsMobile] = useState(false);

  const groupRef = useRef<THREE.Group>(null);

  const ambientRef = useRef<THREE.AmbientLight>(null);

  const keyRef = useRef<THREE.DirectionalLight>(null);

  const fillRef = useRef<THREE.DirectionalLight>(null);

  const rimRef = useRef<THREE.DirectionalLight>(null);

  const target = useRef({
    px: -12,
    py: 1.5,
    pz: -3,

    rx: 0,
    ry: 0.7,
    rz: 0,
  });

  const introDone = useRef(false);

  const scrollProgressRef = useRef(0);

  const allowBreathing = useRef(false);

  useLayoutEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const m = groupRef.current;

    const t = target.current;

    const DAMPING = 0.02;

    const alpha = 1 - Math.pow(1 - DAMPING, delta * 60);

    m.position.x = lerp(m.position.x, t.px, alpha);

    m.position.y = lerp(m.position.y, t.py, alpha);

    m.position.z = lerp(m.position.z, t.pz, alpha);

    m.rotation.x = lerp(m.rotation.x, t.rx, alpha);

    m.rotation.y = lerp(m.rotation.y, t.ry, alpha);

    m.rotation.z = lerp(m.rotation.z, t.rz, alpha);

    if (allowBreathing.current) {
      m.position.y += Math.sin(Date.now() * 0.001) * 0.0005;
    }
  });

  useLayoutEffect(() => {
    gsap.set(".gs-scene-1-title", { opacity: 0, x: -50 });

    gsap.set(".gs-scene-1-p", { opacity: 0, x: -50 });

    gsap.set(".gs-scene-1-scroll", { opacity: 0, y: 50 });

    gsap.set(".gs-scene-2-title", { opacity: 0, y: 50 });

    gsap.set(".gs-scene-2-p", { opacity: 0, y: 50 });

    gsap.set(".gs-scene-3-title", { opacity: 0, y: 50 });

    gsap.set(".gs-scene-3-sub", { opacity: 0, y: 50 });

    gsap.set(".gs-scene-3-p", { opacity: 0, y: 50 });

    if (!isVisible) return;

    let cancelled = false;
    let waitRaf = 0;
    let teardown: (() => void) | undefined;

    const run = () => {
      if (cancelled) return;
      if (!document.querySelector(".gs-scene-1-title")) {
        waitRaf = requestAnimationFrame(run);
        return;
      }

      const mobile = window.innerWidth < 768;

      const reduced = reducedMotion || prefersReducedMotion();

      const scrub = reduced ? 0.3 : mobile ? 0.75 : 1;

      const philoPx = mobile ? -0.5 : -1.6;

      const philoPy = mobile ? -0.5 : 0;

      const innovPx = mobile ? 0.5 : -1;

      const innovPy = mobile ? 0 : 0;

      const introDuration = reduced ? 0.01 : mobile ? 1.2 : 2.5;

      const textDelay = reduced ? 0 : mobile ? 1.4 : 3.0;

      const textDuration = reduced ? 0.01 : mobile ? 0.7 : 1.2;

      const clearWillChange = () => {
        gsap.set(SCENE_ANIM_SEL, { clearProps: "willChange" });
      };

      if (!reduced) {
        gsap.set(SCENE_ANIM_SEL, { willChange: "transform, opacity" });
      }

      if (reduced) {
        Object.assign(target.current, {
          px: philoPx,
          py: philoPy,
          pz: 1,
          rx: 0,
          ry: 0.9,
          rz: 0,
        });

        introDone.current = true;

        gsap.set([".gs-scene-1-title", ".gs-scene-1-p"], { opacity: 1, x: 0 });

        gsap.set(".gs-scene-1-scroll", { opacity: 0.6, y: 0 });
      } else {
        gsap.to(target.current, {
          px: philoPx,
          py: philoPy,
          pz: 1,

          rx: 0,
          ry: 0.9,
          rz: 0,

          duration: introDuration,

          ease: "power3.inOut",

          onComplete: () => {
            introDone.current = true;
          },
        });

        gsap.to([".gs-scene-1-title", ".gs-scene-1-p"], {
          opacity: 1,
          x: 0,

          duration: textDuration,

          stagger: 0.12,

          ease: "power3.out",

          delay: textDelay,

          onComplete: clearWillChange,
        });

        gsap.to(".gs-scene-1-scroll", {
          opacity: 0.6,
          y: 0,

          duration: textDuration,

          delay: textDelay,

          ease: "power3.out",
        });
      }

      const timelines: gsap.core.Timeline[] = [];

      const modelSt = ScrollTrigger.create({
        trigger: "#main-scroll-container",

        start: "top top",

        end: "bottom bottom",

        scrub,

        onUpdate: (self) => {
          const p = self.progress;

          scrollProgressRef.current = p;

          allowBreathing.current =
            !reduced && !mobile && (p < 0.4 || p > 0.6) && p < 0.9;

          if (p > 0) introDone.current = true;

          if (!introDone.current) return;

          if (p < 0.1) {
            target.current.px = philoPx;

            target.current.py = philoPy;

            target.current.pz = 1;

            target.current.rx = 0;

            target.current.ry = 0.9;
          } else if (p < 0.4) {
            const t = ease((p - 0.1) / 0.3);

            target.current.px = lerp(philoPx, 0, t);

            target.current.py = lerp(philoPy, -0.8, t);

            target.current.pz = lerp(1, 0.5, t);

            target.current.rx = lerp(0, 0.2, t);

            target.current.ry = lerp(0.9, Math.PI * 2, t);
          } else if (p < 0.6) {
            target.current.px = 0;

            target.current.py = -0.8;

            target.current.pz = 0.5;

            target.current.rx = 0.2;

            target.current.ry = Math.PI * 2;
          } else if (p < 0.9) {
            const t = ease((p - 0.6) / 0.3);

            target.current.px = lerp(0, innovPx, t);

            target.current.py = lerp(-0.9, innovPy, t);

            target.current.pz = lerp(0.5, 1, t);

            target.current.rx = lerp(0.2, 0.2, t);

            target.current.ry = lerp(Math.PI * 2, Math.PI * 3.8, t);
          } else {
            target.current.px = innovPx;

            target.current.py = innovPy;

            target.current.pz = 1;

            target.current.rx = 0.2;

            target.current.ry = Math.PI * 3.8;
          }
        },
      });

      if (!reduced) {
        const philoTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#philosophy",

            start: "50% top",

            end: "bottom top",

            scrub,
          },
        });

        philoTl.to(
          [".gs-scene-1-title", ".gs-scene-1-p", ".gs-scene-1-scroll"],

          { opacity: 0, y: -30, stagger: 0.03, ease: "power2.in" },
        );

        timelines.push(philoTl);

        const craftInTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#craft",

            start: "top bottom",

            end: "25% top",

            scrub,
          },
        });

        craftInTl

          .to(
            ".gs-scene-2-title",
            { opacity: 1, y: 0, duration: 0.15, ease: "expo.out" },
            0,
          )

          .to(
            ".gs-scene-2-p",
            { opacity: 1, y: 0, duration: 0.15, ease: "expo.out" },
            0.03,
          );

        timelines.push(craftInTl);

        const craftOutTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#craft",

            start: "55% top",

            end: "bottom top",

            scrub,
          },
        });

        craftOutTl.to(
          [".gs-scene-2-title", ".gs-scene-2-p"],

          { opacity: 0, y: -30, stagger: 0.03, ease: "power2.in" },
        );

        timelines.push(craftOutTl);

        const craftThemeTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#craft",

            start: "top bottom",

            end: "bottom top",

            scrub,
          },
        });

        craftThemeTl
          .to(".gs-dynamic-text", { color: "#111827", ease: "none" }, 0)
          .to(".gs-dynamic-text-light", { color: "#1a1b1d", ease: "none" }, 0);

        if (ambientRef.current)
          craftThemeTl.to(
            ambientRef.current,
            { intensity: 0.4, ease: "none" },
            0,
          );

        if (keyRef.current)
          craftThemeTl.to(keyRef.current, { intensity: 2.0, ease: "none" }, 0);

        if (fillRef.current)
          craftThemeTl.to(fillRef.current, { intensity: 0.7, ease: "none" }, 0);

        if (rimRef.current)
          craftThemeTl.to(rimRef.current, { intensity: 1.4, ease: "none" }, 0);

        timelines.push(craftThemeTl);

        const innovTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#innovation",

            start: "top bottom",

            end: "40% top",

            scrub,
          },
        });

        innovTl
          .to(
            [
              ".gs-scene-3-title",
              ".gs-scene-3-sub",
              ".gs-scene-3-p",
              ".gs-scene-3-btn",
            ],
            {
              opacity: 1,
              y: 0,
              stagger: 0.03,
              ease: "expo.out",
            },
            0,
          )
          .to(".gs-dynamic-text", { color: "#ffffff", ease: "none" }, 0)
          .to(".gs-dynamic-text-light", { color: "#9ca3af", ease: "none" }, 0);

        if (ambientRef.current)
          innovTl.to(ambientRef.current, { intensity: 1.1, ease: "none" }, 0);

        if (keyRef.current)
          innovTl.to(keyRef.current, { intensity: 0.9, ease: "none" }, 0);

        if (fillRef.current)
          innovTl.to(fillRef.current, { intensity: 1.2, ease: "none" }, 0);

        if (rimRef.current)
          innovTl.to(rimRef.current, { intensity: 0.6, ease: "none" }, 0);

        timelines.push(innovTl);
      }

      teardown = () => {
        modelSt.kill();
        timelines.forEach((tl) => tl.kill());
        clearWillChange();
      };
    };

    run();

    return () => {
      cancelled = true;
      cancelAnimationFrame(waitRaf);
      teardown?.();
    };
  }, [isVisible, reducedMotion]);

  return (
    <>
      <ambientLight ref={ambientRef} intensity={1.1} />

      <directionalLight ref={keyRef} position={[10, 10, 5]} intensity={0.9} />

      <directionalLight
        ref={fillRef}
        position={[-10, 10, -5]}
        intensity={1.2}
      />

      <directionalLight ref={rimRef} position={[0, -10, -10]} intensity={0.6} />

      <DeferredEnvironment />

      <Model groupRef={groupRef as React.RefObject<THREE.Group>} />

      {!isMobile && (
        <ContactShadows
          resolution={512}
          scale={20}
          blur={2}
          opacity={0.4}
          far={10}
          color="#000"
        />
      )}
    </>
  );
}

export function GlassesCanvas({
  isVisible,

  reducedMotion,

  className,
}: {
  isVisible?: boolean;

  reducedMotion?: boolean;

  className?: string;

  [x: string]: unknown;
}) {
  if (!isVisible) return null;

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="w-full h-full"
        frameloop="always"
      >
        <Suspense fallback={null}>
          <Scene isVisible={isVisible} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
