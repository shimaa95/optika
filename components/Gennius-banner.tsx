import { ArrowRight } from 'lucide-react'
import React from 'react'

function GenniusBanner() {
  return (

        <section className="w-full bg-black px-6 py-20 sm:px-10 sm:py-16 md:px-12 flex flex-col items-center justify-center md:py-20 lg:px-16 lg:py-32 2xl:py-50 ">
                <div className="mx-auto max-w-[900px] text-center ">
                    <h2 className="mb-4 text-[22px] font-bold uppercase leading-[1.1] tracking-tight text-white sm:mb-5 sm:text-[28px] md:text-[34px] lg:text-[40px] 2xl:my-10">
                        Genuine Aspiration Toward
                        <br />
                        Excellence
                    </h2>
                    <p className="mx-auto mb-10 max-w-[600px] text-[12px] leading-[1.7] text-white/80 sm:text-[13px] md:text-sm">
                        Optika positions itself with unwavering commitment to industry best practices. We deliver and manufacture what works and we prioritize performance.
                    </p>
                    <button
                        className="mx-auto  group cursor-pointer self-center flex w-fit items-center gap-3 text-sm font-medium text-white transition-colors hover:text-white/80 sm:text-base lg:text-[16px]"
                        style={{ fontFamily: "var(--font-inter)" }}
                    >
                        <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center  border border-white/30 transition-all group-hover:border-white group-hover:bg-white group-hover:text-black">
                            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                        </span>
                        <span>Contact us</span>
                    </button>
                </div>
            </section>
 
  )
}

export default GenniusBanner
