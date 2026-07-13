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
        STREAMLINED WORKFLOWS
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
        <span className="flex h-6 w-6 sm:h-6 sm:w-6 items-center justify-center border border-black/30 transition-all group-hover:border-black group-hover:bg-black group-hover:text-white">
          <ArrowRight className="h-4 w-4" />
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

  const items = content;

  return (
    <section className={`w-full bg-[#f4f6f8]  ${className || ''}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 border border-black/10 w-full">
        {/* Top Left - Text */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-20 xl:p-32 border-b md:border-b border-black/10 md:border-r">
          <div className="flex max-w-[480px] gap-5">
            <div className="flex-1 lg:pl-12">
              <div className="mb-4 xl:mb-6 text-[13px] md:text-[14px] leading-snug font-medium text-black/50">
                Solutions for partners
              </div>
              <h2 className="mb-4 xl:mb-6 font-bold uppercase text-black text-[20px]  ">Streamlined Workflows</h2>
              <p className="mb-6 xl:mb-10 max-w-[200px] lg:max-w-[390px] text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed text-black/90">
                We provide partners with End to End Solutions and Custom Lenses that meet different and wide ranges of Use-Cases, Taste, and style              </p>
              <Link href="#">
                <div className="flex items-center gap-3 text-[16px] font-normal text-black transition-colors hover:text-black/80" style={{ fontFamily: "var(--font-inter)" }}>
                  <span className="flex h-6 w-6 sm:h-6 sm:w-6 items-center justify-center border border-black/30 transition-all group-hover:border-black group-hover:bg-black group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <span>Become a Partner</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Top Right - Image */}
        <div className="relative flex flex-col items-center justify-center  border-b border-black/10">
          <div className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-square">
            <Image
              src="/about-optika.jpg"
              alt="Group of models wearing premium eyewear"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Bottom Left - Image */}
        <div className="relative  border-b md:border-b-0 md:border-r border-black/10">
          <div className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-square">
            <Image
              src="/about-optika2.jpg"
              alt="Models in white polo shirts wearing sunglasses"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Bottom Right - Text */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-20 xl:p-32">
          <div className="flex max-w-[480px] gap-5">
            <div className="flex-1 lg:pl-12">
              <div className="mb-4 xl:mb-6 text-[13px] md:text-[14px] font-medium text-black/50">
                A connected system
              </div>
              <h2 className="mb-4 xl:mb-6 font-bold text-black text-[20px]  ">SCALE WITHOUT <br /> LOSING CONSISTENCY</h2>

              <p className="text-[14px] md:text-[14px] mb-6 xl:mb-10 lg:text-[20px] leading-relaxed text-black/90 max-w-[200] lg:max-w-[390px]">
                We operate as an integrated system for partners to creates a stable foundation for growth, operational clarity, and a more consistent experience across every touch-point.              </p>
              <Link href="#">
                <div className="flex items-center gap-3 text-[16px] font-normal text-black transition-colors hover:text-black/80" style={{ fontFamily: "var(--font-inter)" }}>
                  <span className="flex h-6 w-6 sm:h-6 sm:w-6 items-center justify-center border border-black/30 transition-all group-hover:border-black group-hover:bg-black group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <span>Learn More</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Solutions;
