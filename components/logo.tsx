"use client"

import { forwardRef } from "react"

interface LogoProps {
  className?: string
  fill?: string
}

export const Logo = forwardRef<SVGSVGElement, LogoProps>(
  ({ className, fill = "#383838" }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 4096 468.8"
        className={className}
        aria-label="OPTIKA Logo"
      >
        <path
          fill={fill}
          d="M251.6,360.6c9.8-35.2,26.8-64,51.3-85.9,41-36.8,94.9-55.2,161.9-55.2s120.7,18.2,161.1,54.5c24.4,22,41.3,50.9,51,86.6h169.3c-14.3-66.7-47-121.4-98.5-164-71.2-59-166-88.4-284.6-88.4s-123.3,8.5-173.5,25.5c-37.7,12.6-72.4,32-104,58.1-31.7,26.1-56.6,55.6-74.9,88.4-13.1,23.8-22.6,50.6-28.7,80.4h169.5Z"
        />
        <path
          fill={fill}
          d="M1142.7,360.6v-132.3h78.5c58.5,0,97.5,1.5,116.9,4.4,26.4,3.8,48.1,13.4,65.3,28.6,17.2,15.2,25.8,34.6,25.8,58.1s-4.1,29-12,41.2h175.4c2.6-13.4,4-27.7,4-43,0-51.3-15.5-93.2-46.6-125.6-31.1-32.4-69.7-53.5-115.9-63.1-30-6.4-94.4-9.7-193.2-9.7h-260.7v241.4h162.5Z"
        />
        <polygon
          fill={fill}
          points="2072.5 360.6 2072.5 228.2 2310.8 228.2 2310.8 119.1 1671.3 119.1 1671.3 228.2 1910 228.2 1910 360.6 2072.5 360.6"
        />
        <rect
          fill={fill}
          x="2370.1"
          y="158.6"
          width="241.4"
          height="162.5"
          transform="translate(2730.6 -2250.9) rotate(90)"
        />
        <polygon
          fill={fill}
          points="3145.9 360.6 3437.1 119.1 3218.6 119.1 2941.9 360.6 3145.9 360.6"
        />
        <rect
          fill={fill}
          x="2688.4"
          y="158.6"
          width="241.4"
          height="162.5"
          transform="translate(3049 -2569.2) rotate(90)"
        />
        <polygon
          fill={fill}
          points="3764.2 360.6 3805.5 269.6 3847.7 360.6 4013.9 360.6 3893.4 119.1 3721.5 119.1 3604.2 360.6 3764.2 360.6"
        />
      </svg>
    )
  }
)

Logo.displayName = "Logo"
