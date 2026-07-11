"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Google Material Design 3 easing tokens
   Emphasized  : cubic-bezier(0.05, 0.7, 0.1, 1.0)   ← enters
   Accelerate  : cubic-bezier(0.3,  0.0, 0.8, 0.15)  ← exits
───────────────────────────────────────────── */

const KEYFRAMES = `
/* ── 1. Idle Bobbing & Breathing ─────────────────────────────────────────
   The cute robot bubble floats up and down gently, making it feel alive
   and inviting interaction.
──────────────────────────────────────────────────────────────────────── */
@keyframes assistly-robot-bob {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-8px) scale(1.02);
  }
}

/* ── 2. FAB → Panel container morph (MD3 Container Transform) ────────────
   The chat window "grows" out of the button corner using
   transform-origin bottom-right + scale + opacity, matching the
   M3 Emphasized easing so it decelerates into place.
──────────────────────────────────────────────────────────────────────── */
@keyframes assistly-panel-enter {
  0%   { opacity: 0; transform: scale(0.4) translateY(40px); }
  100% { opacity: 1; transform: scale(1)   translateY(0px);  }
}
@keyframes assistly-panel-exit {
  0%   { opacity: 1; transform: scale(1)   translateY(0px);  }
  100% { opacity: 0; transform: scale(0.4) translateY(40px); }
}

/* ── 3. Icon cross-dissolve ──────────────────────────────────────────────
   Snappy scale animations for toggling the bubble and close buttons
──────────────────────────────────────────────────────────────────────── */
@keyframes assistly-scale-in {
  0%   { transform: scale(0) rotate(-45deg); opacity: 0; }
  100% { transform: scale(1) rotate(0);      opacity: 1; }
}
@keyframes assistly-scale-out {
  0%   { transform: scale(1) rotate(0);      opacity: 1; }
  100% { transform: scale(0) rotate(45deg);  opacity: 0; }
}

/* Robot hover lift & tilt */
.assistly-robot-btn {
  transition: transform 300ms cubic-bezier(0.05, 0.7, 0.1, 1.0) !important;
}
.assistly-robot-btn:hover {
  transform: translateY(-12px) scale(1.08) rotate(-2deg) !important;
}
.assistly-robot-btn:active {
  transform: scale(0.95) !important;
}

/* Close button hover spin */
.assistly-close-btn {
  transition: transform 250ms ease, background-color 200ms ease !important;
}
.assistly-close-btn:hover {
  transform: scale(1.1) rotate(90deg) !important;
  background-color: #f1f5f9 !important;
}
.assistly-close-btn:active {
  transform: scale(0.95) rotate(90deg) !important;
}
`;

type Props = {
  chatbotId: number;
  origin: string;
  logoUrl: string;
  primaryColor?: string;
};

export default function AssistlyChatWidget({
  chatbotId,
  origin,
  logoUrl,
  primaryColor = "#4D7DFB",
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    if (open && !closing) {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, 250);
    } else if (!open) {
      setOpen(true);
      setClosing(false);
    }
  };

  if (!mounted) return null;

  const panelStyle: React.CSSProperties = {
    position: "fixed",
    right: 24,
    bottom: 96,
    width: 530,
    height: 740,
    maxHeight: "calc(100vh - 120px)",
    zIndex: 9999,
    borderRadius: 24,
    overflow: "hidden",
    boxShadow: "0 24px 64px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.05)",
    background: "#fff",
    transformOrigin: "bottom right",
    display: open || closing ? "block" : "none",
    animation: closing
      ? "assistly-panel-exit 250ms cubic-bezier(0.3, 0.0, 0.8, 0.15) forwards"
      : open
        ? "assistly-panel-enter 350ms cubic-bezier(0.05, 0.7, 0.1, 1.0) forwards"
        : "none",
  };

  return (
    <>
      <style>{KEYFRAMES}</style>

      {/* ── Chat Panel ── */}
      <div
        aria-label="Chat window"
        role="dialog"
        aria-hidden={!open && !closing}
        aria-modal="false"
        style={panelStyle}
      >
        {/* Lazy-mount iframe: only render after the user has opened the
            chat at least once. Saves the 3rd-party chatbot network cost
            on every page load. */}
        {(open || closing) && (
          <iframe
            src={`https://chatbots-smoky.vercel.app/chatbot/15`}
            title="Assistly chat"
            style={{ width: "100%", height: "100%", border: 0, display: "block" }}
          />
        )}
      </div>

      {/* ── Close Button (only when open) ──────────────────────────────────
          Independently fixed so it never gets clipped by the robot wrapper.
      ─────────────────────────────────────────────────────────────────── */}
      {open && (
        <button
          type="button"
          onClick={handleToggle}
          aria-label="Close chat"
          className="assistly-close-btn"
          style={{
            position: "fixed",
            right: 24,
            bottom: 24,
            zIndex: 10001,
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: "1px solid #e2e8f0",
            background: "#fff",
            color: "#0f172a",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            animation: "assistly-scale-in 250ms cubic-bezier(0.05, 0.7, 0.1, 1.0) forwards",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
      )}

      {/* ── Robot Bubble (only when closed) ────────────────────────────────
          Wrapper is transparent to clicks (pointerEvents:none) so the
          empty transparent area of the PNG doesn't block page interactions.
          The button itself re-enables pointer events.
      ─────────────────────────────────────────────────────────────────── */}
      {!open && (
        <div
          style={{
            position: "fixed",
            right: 40,
            bottom: 30,
            zIndex: 10000,
            width: 50,
            height: 50,
            pointerEvents: "none",
          }}
        >
          <button
            type="button"
            onClick={handleToggle}
            aria-label="Open chat"
            className="assistly-robot-btn"
            style={{
              width: "100%",
              height: "100%",
              border: 0,
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              position: "relative",
              animation: "assistly-robot-bob 3s ease-in-out infinite",
              outline: "none",
              pointerEvents: "all",
            }}
          >
            <Image
              src="/1Chat.svg"
              alt="Chat with us"
              width={50}
              height={50}
              unoptimized
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
            />
          </button>
        </div>
      )}
    </>
  );
}
