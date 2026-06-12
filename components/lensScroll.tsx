"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function LensScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [bgColor, setBgColor] = useState<string>("#E6E6E6");
    const [scrollProgress, setScrollProgress] = useState(0);

    // Use the 192 lens images available in public/lens/
    const frameCount = 162;

    // Preload Images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;
        let fallbackBgExtracted = false;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const frameString = i.toString().padStart(5, '0');
            img.src = `/lens/${frameString}.png`;

            img.onload = () => {
                loadedCount++;

                // Extract the background color from the first loaded image's top-left pixel
                if (!fallbackBgExtracted) {
                    fallbackBgExtracted = true;
                    const tempCanvas = document.createElement("canvas");
                    tempCanvas.width = 1;
                    tempCanvas.height = 1;
                    const tempCtx = tempCanvas.getContext("2d");
                    if (tempCtx) {
                        tempCtx.drawImage(img, 0, 0, 1, 1);
                        const [r, g, b] = tempCtx.getImageData(0, 0, 1, 1).data;
                        setBgColor(`rgb(${r}, ${g}, ${b})`);
                    }
                }

                if (loadedCount === frameCount) {
                    // Ensure array is sorted since onload may fire out of order
                    loadedImages.sort((a, b) => {
                        const matchA = a.src.match(/(\d+)\.png$/);
                        const matchB = b.src.match(/(\d+)\.png$/);
                        const numA = matchA ? parseInt(matchA[1], 10) : 0;
                        const numB = matchB ? parseInt(matchB[1], 10) : 0;
                        return numA - numB;
                    });
                    setImages([...loadedImages]);
                }
            };
            loadedImages.push(img);
        }
    }, []);

    // Set up Canvas and GSAP ScrollTrigger
    useEffect(() => {
        if (!canvasRef.current || !containerRef.current || images.length !== frameCount) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const render = (frameIndex: number) => {
            const img = images[frameIndex];
            if (!img) return;

            const w = window.innerWidth;
            const h = window.innerHeight;
            const pixelRatio = window.devicePixelRatio;

            canvas.width = w * pixelRatio;
            canvas.height = h * pixelRatio;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;

            const imgRatio = img.width / img.height;
            const canvasRatio = w / h;

            let drawWidth = w;
            let drawHeight = h;
            let offsetX = 0;
            let offsetY = 0;

            // "contain" fit emulation to keep product fully visible
            if (imgRatio > canvasRatio) {
                drawHeight = w / imgRatio;
                offsetY = (h - drawHeight) / 2;
            } else {
                drawWidth = h * imgRatio;
                offsetX = (w - drawWidth) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                img,
                offsetX * pixelRatio,
                offsetY * pixelRatio,
                drawWidth * pixelRatio,
                drawHeight * pixelRatio
            );
        };

        // Render init
        render(0);

        const playhead = { frame: 0 };

        const tl = gsap.to(playhead, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                onUpdate: (self) => {
                    render(Math.round(playhead.frame));
                    setScrollProgress(self.progress);
                }
            }
        });

        // Smooth resize handler
        let resizeTimer: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                requestAnimationFrame(() => render(Math.round(playhead.frame)));
            }, 50);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimer);
        };

    }, [images]);

    // Derive opacity and visibility based on requested beats
    // Beats: 0% (Centered), 25% (Left), 60% (Right), 90% (Centered)

    // Helper for fade in/out
    const getBeatStyle = (start: number, peak: number, end: number) => {
        // fade in
        if (scrollProgress >= start && scrollProgress < peak) {
            const progress = (scrollProgress - start) / (peak - start);
            return {
                opacity: progress,
                transform: `translateY(${(1 - progress) * 10}px)`,
                pointerEvents: progress > 0.5 ? 'auto' : 'none'
            };
        }
        // fade out
        else if (scrollProgress >= peak && scrollProgress <= end) {
            const progress = 1 - ((scrollProgress - peak) / (end - peak));
            return {
                opacity: progress,
                transform: `translateY(${(1 - progress) * -10}px)`,
                pointerEvents: progress > 0.5 ? 'auto' : 'none'
            };
        }
        return { opacity: 0, transform: `translateY(10px)`, pointerEvents: 'none' };
    };

    const beat1Styles = getBeatStyle(0, 0.05, 0.15) as React.CSSProperties; // 0%
    const beat2Styles = getBeatStyle(0.20, 0.28, 0.40) as React.CSSProperties; // 25%
    const beat3Styles = getBeatStyle(0.55, 0.63, 0.75) as React.CSSProperties; // 60%
    const beat4Styles = getBeatStyle(0.85, 0.93, 1.0) as React.CSSProperties; // 90%

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[700vh]"
            style={{ backgroundColor: bgColor }}
        >
            {images.length !== frameCount && (
                <div className="fixed inset-0 flex flex-col items-center justify-center z-50 pointer-events-none" style={{ backgroundColor: bgColor }}>
                    <div className="w-8 h-8 border-2 border-black/20 border-t-black/60 rounded-full animate-spin mb-4" />
                    <span className=" font-medium tracking-tight text-sm">
                        {Math.round((images.length / frameCount) * 100)}%
                    </span>
                </div>
            )}

            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full block origin-top-left" />

                {/* Overlay Text Container */}
                <div className="absolute inset-0 z-10 pointer-events-none">

                    {/* 0% Beat: Centered */}
                    <div
                        className="absolute inset-0 flex flex-col items-center pt-[15vh] transition-all duration-300 ease-out"
                        style={beat1Styles}
                    >
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-black/90">
                        </h2>
                        <p className="text-lg text-black/60 font-medium tracking-tight mt-2">
                        </p>
                    </div>

                    {/* 25% Beat: Left */}
                    <div
                        className="absolute inset-y-0 left-0 flex flex-col justify-center pl-[8vw] md:pl-[12vw] transition-all duration-300 ease-out"
                        style={beat2Styles}
                    >
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-black/90">
                        </h2>
                        <p className="text-lg text-black/60 font-medium tracking-tight mt-2">
                        </p>
                    </div>

                    {/* 60% Beat: Right */}


                    {/* 90% Beat: Centered CTA */}


                </div>
            </div>
        </div>
    );
}
