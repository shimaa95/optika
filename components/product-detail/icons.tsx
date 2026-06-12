export function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="16"
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M0 1H22" stroke="currentColor" strokeWidth="1.5" />
      <path d="M0 8H22" stroke="currentColor" strokeWidth="1.5" />
      <path d="M0 15H22" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M1 7H12M12 7L7 2M12 7L7 12"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CamberLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="72"
      height="28"
      viewBox="0 0 72 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Camber"
    >
      <rect width="72" height="28" fill="#6B4E9B" />
      <text
        x="36"
        y="18"
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-inter), Inter, inter-serif"
      >
        Camber
      </text>
    </svg>
  )
}

export function PhoneWireframe({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="48"
      height="88"
      viewBox="0 0 48 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="1"
        y="1"
        width="46"
        height="86"
        rx="6"
        stroke="white"
        strokeWidth="1.25"
      />
      <line x1="18" y1="10" x2="30" y2="10" stroke="white" strokeWidth="1" />
    </svg>
  )
}
