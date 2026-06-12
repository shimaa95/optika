"use client";

import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] });

/**
 * CinematicHero Configuration
 * Centralizing constants ensures the component is open for extension but closed for modification.
 */
const CONFIG = {
  FRAME_COUNT: 121,
  FRAME_PATH: (i: number) => `/moments/${String(i + 1).padStart(5, "0")}.png`,
  BG_COLOR: "#D9C5B2",
  BLOOM_GRADIENT: "radial-gradient(circle at 65% 25%, rgba(255,160,50,0.6) 0%, rgba(230,120,20,0.1) 45%, transparent 75%)",
  ANIMATION: {
    DURATION: 8,
    TEXT_Y_START: 20,
    TEXT_DURATION: 2,
  }
};

/**
 * Custom hook to manage the preloading of the image sequence.
 * Follows SRP by isolating the asset loading logic from the view.
 */
function useImageSequence() {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      const promises = Array.from({ length: CONFIG.FRAME_COUNT }).map((_, i) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.src = CONFIG.FRAME_PATH(i);
          img.onload = () => resolve(img);
          img.onerror = () => resolve(img);
        });
      });

      const results = await Promise.all(promises);
      setImages(results);
      setIsLoaded(true);
    };

    loadImages();
  }, []);

  return { images, isLoaded };
}

/**
 * CinematicCanvas handles the rendering of frames to the HTML5 Canvas.
 * Optimized for high DPI screens and responsive "cover" fitting.
 */
const CinematicCanvas = ({
  images,
  isLoaded,
  canvasRef
}: {
  images: HTMLImageElement[],
  isLoaded: boolean,
  canvasRef: React.RefObject<HTMLCanvasElement | null>
}) => {
  useGSAP(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !isLoaded) return;

    const drawFrame = (frameIndex: number) => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      }

      const { width, height } = rect;
      ctx.fillStyle = CONFIG.BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      const imgIndex = Math.min(CONFIG.FRAME_COUNT - 1, Math.max(0, Math.round(frameIndex)));
      const img = images[imgIndex];

      if (img?.complete && img.naturalWidth > 0) {
        const canvasRatio = width / height;
        const imgRatio = img.naturalWidth / img.naturalHeight;
        let drawWidth = width;
        let drawHeight = height;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > canvasRatio) {
          drawWidth = height * imgRatio;
          offsetX = (width - drawWidth) / 2;
        } else {
          drawHeight = width / imgRatio;
          offsetY = (height - drawHeight) / 2;
        }
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    const playhead = { frame: 0 };
    drawFrame(0);

    const anim = gsap.to(playhead, {
      frame: CONFIG.FRAME_COUNT - 1,
      duration: CONFIG.ANIMATION.DURATION,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      paused: true,
      onUpdate: () => drawFrame(playhead.frame)
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anim.play();
        } else {
          anim.pause();
        }
      });
    });
    observer.observe(canvas);

    const handleResize = () => drawFrame(playhead.frame);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      anim.kill();
    };
  }, { dependencies: [images, isLoaded], scope: canvasRef });

  return <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none" />;
};

/**
 * HeroTypography handles the presentational layer of the text overlay.
 */
const HeroTypography = ({ textRef }: { textRef: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={textRef}
    className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-20 opacity-0"
  >
   
    <h1 className="text-4xl md:text-6xl text-leftth lg:text-[72px] font-bold text-white max-w-4xl uppercase tracking-tight leading-[1.1] font-inter">
      So you never<br />miss a moment
    </h1>
  </div>
);

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);

  const { images, isLoaded } = useImageSequence();

  useGSAP(() => {
    if (!isLoaded || !containerRef.current) return;

    // 1. Atmospheric bloom pulse (Background)
    const bloomAnim = gsap.to(bloomRef.current, {
      opacity: 0.8,
      duration: CONFIG.ANIMATION.DURATION,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      paused: true,
    });

    let textPlayed = false;

    // 2. Typography entry sequence (Foreground)
    const textAnim = gsap.fromTo(textRef.current,
      { opacity: 0, y: CONFIG.ANIMATION.TEXT_Y_START },
      {
        opacity: 1,
        y: 0,
        duration: CONFIG.ANIMATION.TEXT_DURATION,
        ease: "power2.out",
        delay: CONFIG.ANIMATION.DURATION,
        paused: true
      }
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bloomAnim.play();
          if (!textPlayed) {
            textAnim.play();
            textPlayed = true;
          }
        } else {
          bloomAnim.pause();
        }
      });
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      bloomAnim.kill();
      textAnim.kill();
    };
  }, { scope: containerRef, dependencies: [isLoaded] });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden select-none mx-auto"
      style={{ backgroundColor: CONFIG.BG_COLOR }}
    >
      <CinematicCanvas
        images={images}
        isLoaded={isLoaded}
        canvasRef={canvasRef}
      />
      <div
        ref={bloomRef}
        className="absolute inset-0 pointer-events-none opacity-40 transition-opacity z-10"
        style={{ background: CONFIG.BLOOM_GRADIENT }}
      />
      <HeroTypography textRef={textRef} />
    </div>
  );
}
