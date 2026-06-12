import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

export interface SolutionsBlock {
  id: string
  eyebrow: string
  title: React.ReactNode
  description: string
  ctaLabel: string
  ctaHref?: string
  imageSrc: string
  imageAlt: string
}

export interface SolutionsProps {
  content?: SolutionsBlock[]
  className?: string
}

const DEFAULT_CONTENT: SolutionsBlock[] = [
  {
    id: 'solutions-for-partners',
    eyebrow: "Solutions for partners",
    title: (
      <>
        STREAMLINED<br /> WORKFLOWS
      </>
    ),
    description: "We provide partners with End to End Solutions and Custom Lenses that meet different and wide ranges of Use-Cases, Taste, and style.",
    ctaLabel: "Become a Partner",
    ctaHref: "",
    imageSrc: "/workflow.png",
    imageAlt: "Three fashion models looking down at the camera wearing sunglasses against a blue sky",
  },
  {
    id: 'connected-system',
    eyebrow: "A connected system",
    title: (
      <>
        SCALE WITHOUT <br /> LOSING CONSISTENCY
      </>
    ),
    description: "We operate as an integrated system for partners to creates a stable foundation for growth, operational clarity, and a more consistent experience across every touch-point.",
    ctaLabel: "Learn More",
    ctaHref: "",
    imageSrc: "/about-optika2.jpg",
    imageAlt: "Two models in white polo shirts wearing sunglasses against a white wall",
  }
]

export function Solutions({ content = DEFAULT_CONTENT, className }: SolutionsProps) {
  const renderButton = (text?: string, href?: string) => {
    if (!text) return null
    const buttonContent = (
      <span className="group cursor-pointer inline-flex w-fit items-center gap-3 text-sm font-medium text-black transition-colors hover:text-black/80 sm:text-base lg:text-[16px]" style={{ fontFamily: "var(--font-inter)" }}>
        <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center border border-black/30 transition-all group-hover:border-black group-hover:bg-black group-hover:text-white">
          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </span>
        <span>{text}</span>
      </span>
    )

    if (href) {
      return (
        <Link href={href} className="inline-block">
          {buttonContent}
        </Link>
      )
    }

    return (
      <button className="focus:outline-none">
        {buttonContent}
      </button>
    )
  }

  return (
    <section className={`w-full bg-[#F3F3F3] py-16 ${className || ''} lg:py-32 `}>
      {/* Main Container - 2x2 Grid */}
      <div className="grid grid-cols-1 gap-px border border-[#D1D1D1] bg-[#F3F3F3] md:grid-cols-2">
        {content.map((block, index) => {
          const isEven = index % 2 === 0
          const orderBase = index * 2
          const textOrderClass = isEven ? `order-${orderBase + 1}` : `order-${orderBase + 1} md:order-${orderBase + 2}`
          const imageOrderClass = isEven ? `order-${orderBase + 2}` : `order-${orderBase + 2} md:order-${orderBase + 1}`

          return (
            <React.Fragment key={block.id || index}>
              {/* Text Block */}
              <div className={`flex min-h-[60vh] flex-col bg-[#F3F3F3] p-10 md:p-16 lg:min-h-[75vh] lg:p-24 lg:pt-32 ${textOrderClass} ${isEven ? '2xl:ml-18' : ''}`}>
                <div className="flex max-w-[480px] gap-5">
                  {/* Vertical black accent line */}
                  <div className={`w-[1px] shrink-0 self-stretch bg-black ${isEven ? 'ml-0 lg:ml-[-22px] lg:mr-4 2xl:ml-0' : 'lg:mr-4'}`} />
                  <div className="flex-1">
                    {block.eyebrow && (
                      <p className="mb-8 text-[11px] max-w-[20px] font-medium uppercase tracking-[0.2em] text-black/50">
                        {block.eyebrow}
                      </p>
                    )}
                    {block.title && (
                      <h2 className="mb-8 text-[24px] font-bold leading-[1.3] text-black md:text-[28px]">
                        {block.title}
                      </h2>
                    )}
                    {block.description && (
                      <p className="text-[18px] mb-12 leading-[1.7] text-black md:text-[20px] lg:pr-8 2xl:pr-0">
                        {block.description}
                      </p>
                    )}
                    {renderButton(block.ctaLabel, block.ctaHref)}
                  </div>
                </div>
              </div>

              {/* Image Block */}
              <div className={`relative min-h-[60vh] bg-[#F3F3F3] lg:min-h-[75vh] ${imageOrderClass}`}>
                {block.imageSrc && (
                  <Image
                    src={block.imageSrc}
                    alt={block.imageAlt || ''}
                    fill
                    className="object-cover"
                    sizes={isEven ? undefined : "33vw"}
                  />
                )}
              </div>
            </React.Fragment>
          )
        })}
      </div>
    </section>
  )
}

export default Solutions;