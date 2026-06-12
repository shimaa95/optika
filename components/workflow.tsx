import { ArrowRight, Sparkles, LayoutGrid, Globe } from "lucide-react"
import Image from "next/image"

export function WorkflowSection() {
    return (
        <section id="workflow" className="w-full h-screen min-h-screen bg-[#f5f5f5] flex flex-col justify-center overflow-hidden" style={{
            fontFamily: "var(--font-inter)"
        }}>
            <div className="grid h-full w-full grid-cols-1 lg:grid-cols-2">
                {/* Left Side - Full Bleed Image for Design-Perfect Visual */}
                <div className="w-full min-h-[55vh] lg:min-h-screen p-0 sm:p-0 lg:p-16 flex overflow-hidden">
                    <div className="relative w-full h-full overflow-hidden flex-1 ">
                        <Image
                            src="/workflow.png"
                            alt="Team collaborating in a modern office space with warm lighting"
                            fill
                            className="object-cover object-center "
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                </div>

                {/* Right Side - Content Area */}
                <div className="flex flex-col items-center justify-center bg-[#F5F5F5] px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 lg:py-0 xl:px-20 2xl:px-28">
                    <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl text-left">
                        {/* Tagline */}
                        <p
                            className="mb-6 sm:mb-6 lg:mb-6 text-black/70 text-[9px] sm:text-[10px] lg:text-xs tracking-[0.11em] leading-[135%] font-playfair font-normal uppercase"
                            style={{ fontFamily: "var(--font-playfair)", fontWeight: 400 }}
                        >
                            Exceptional Optical Solutions
                        </p>

                        {/* Main Heading */}
                        <h2
                            className="mb-6 sm:mb-8 font-inter font-semibold lg:mb-10 relative z-10 text-[32px] sm:text-[40px] md:text-[48px] lg:text-[50px] xl:text-[50px]  tracking-[-0.02em] text-black" style={{ lineHeight: "119%" }}
                        >
                            STREAMLINED
                            <br />
                            WORKFLOWS
                        </h2>

                        {/* Description */}
                        <p
                            className="mb-8 max-w-sm sm:mb-10 md:max-w-md lg:mb-10 text-black text-[13px] sm:text-sm lg:text-base leading-[150%] tracking-[0.02em]"
                            style={{ fontFamily: "var(--font-inter)", fontWeight: 400, color: "#333" }}
                        >
                            We are committed to advancing how you see the world. Our teams are perfecting the science of digital optics, providing diverse solutions and lenses that meet different Use-cases, Taste, and style.
                        </p>



                        {/* CTA Button */}
                        <button
                            className="group cursor-pointer inline-flex w-fit items-center gap-3 text-sm font-medium text-black transition-colors hover:text-black/80 sm:text-base lg:text-[16px]"
                            style={{ fontFamily: "var(--font-inter)" }}
                        >
                            <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center border border-black/30 transition-all group-hover:border-black group-hover:bg-black group-hover:text-white">
                                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                            </span>
                            <span>Contact Us</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
