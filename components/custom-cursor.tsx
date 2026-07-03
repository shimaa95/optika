"use client";

import { useEffect, useRef } from "react";
import { gsap, Back } from "gsap";

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const outer = outerRef.current!;
    const inner = innerRef.current!;

    const OUTER_SIZE = 36;
    const ACCENT = "#3b82f6";
    const easing = Back.easeOut.config(1.7);

    let clientX = -100;
    let clientY = -100;
    let isStuck = false;
    let outerCursorSpeed = 0;

    // Hide native cursor
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(styleEl);

    // Snap on first move, then enable lag
    const unveilCursor = () => {
      gsap.set(inner, { x: clientX, y: clientY });
      gsap.set(outer, {
        x: clientX - OUTER_SIZE / 2,
        y: clientY - OUTER_SIZE / 2,
      });
      setTimeout(() => { outerCursorSpeed = 0.2; }, 100);
      document.removeEventListener("mousemove", unveilCursor);
    };
    document.addEventListener("mousemove", unveilCursor);

    const onMouseMove = (e: MouseEvent) => {
      clientX = e.clientX;
      clientY = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);

    // RAF loop — inner follows instantly, outer lags
    let rafId: number;
    const render = () => {
      gsap.set(inner, { x: clientX, y: clientY });
      if (!isStuck) {
        gsap.to(outer, {
          duration: outerCursorSpeed,
          x: clientX - OUTER_SIZE / 2,
          y: clientY - OUTER_SIZE / 2,
        });
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    // ── Hover: circle fills with blue 50% opacity, inner dot hides ──────────
    const handleHover = () => {
      outerCursorSpeed = 0; // instantly follow mouse on hover
      // inner dot hides
      gsap.to(inner, { duration: 0.15, opacity: 0, scale: 0, overwrite: "auto" });

      // outer stays as a circle but fills with blue at 50% opacity
      gsap.to(outer, {
        duration: 0.2,
        backgroundColor: ACCENT,
        opacity: 0.5,
        borderColor: ACCENT,
        borderRadius: "50%",
        scale: 1, // User wanted just the BG to fill, no scale up
        width: OUTER_SIZE, // force width/height to override old HMR state
        height: OUTER_SIZE,
        ease: easing,
        overwrite: "auto" // Only overwrite colliding properties, don't kill x/y positional tweens
      });
    };

    const handleLeaveHover = () => {
      outerCursorSpeed = 0.2; // restore lag on leave
      // inner dot reappears
      gsap.to(inner, { duration: 0.15, opacity: 1, scale: 1, overwrite: "auto" });

      // outer returns to transparent ring
      gsap.to(outer, {
        duration: 0.25,
        backgroundColor: "transparent",
        opacity: 0.4,
        borderColor: ACCENT,
        borderRadius: "50%",
        scale: 1,
        width: OUTER_SIZE,
        height: OUTER_SIZE,
        ease: easing,
        overwrite: "auto"
      });
    };

    // Use event delegation on document body with a tracker to prevent child-element glitching
    let hoveredElement: HTMLElement | null = null;

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button") as HTMLElement;
      if (target && hoveredElement !== target) {
        hoveredElement = target;
        handleHover();
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button") as HTMLElement;
      const related = (e.relatedTarget as HTMLElement)?.closest("a, button") as HTMLElement;
      
      // If we are leaving the hoveredElement entirely (not just moving between its children)
      if (target && target !== related) {
        hoveredElement = null;
        handleLeaveHover();
      }
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousemove", unveilCursor);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      if (document.head.contains(styleEl)) document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <>
      <style>{`
        .circle-cursor {
          position: fixed;
          left: 0;
          top: 0;
          pointer-events: none;
          will-change: transform;
          z-index: 9999999;
        }
        /* Outer — trailing ring, transparent inside */
        .circle-cursor--outer {
          width: 36px;
          height: 36px;
          border: 1.5px solid #3b82f6;
          border-radius: 50%;
          background: transparent;
          opacity: 0.4;
          box-sizing: border-box;
        }
        /* Inner — solid dot, follows instantly */
        .circle-cursor--inner {
          width: 6px;
          height: 6px;
          margin-left: -3px;
          margin-top: -3px;
          background: #3b82f6;
          border-radius: 50%;
        }
        @media (pointer: coarse) {
          .circle-cursor { display: none !important; }
        }
      `}</style>

      <div className="circle-cursor circle-cursor--outer" ref={outerRef} />
      <div className="circle-cursor circle-cursor--inner" ref={innerRef} />
    </>
  );
}
