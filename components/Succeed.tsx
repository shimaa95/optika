import { Eye, LayoutGrid, LineChart, Truck } from 'lucide-react'
import React from 'react'

function Succeed() {
  return (
  <section className="w-full-safe bg-white px-6 py-16 sm:py-20   md:py-24 lg:py-28">
                <div className="mx-auto xl:max-w-[1000px] 2xl:max-w-[1200px] lg:px-[53px] 2xl:px-[103px]  ">
                    {/* Section Header */}
                    <div className="mb-10 text-center sm:mb-12 lg:mb-16">
                        <h2 className="mb-3 text-[22px] font-bold uppercase tracking-tight text-black sm:text-[28px] md:text-[32px] lg:text-[36px]">
                            Everything You Need
                            <br />
                            To Succeed
                        </h2>
                        <p className="mx-auto max-w-[500px] text-[11px] leading-[1.6] text-gray-500 sm:text-xs">
                            Our integrated platform streamlines every aspect of lens ordering, production, and delivery.
                        </p>
                    </div>

                    {/* 3-Column Layout */}
                    <div className="flex  place-content-center flex-col lg:flex-row items-stretch gap-6 sm:gap-8 lg:gap-10">
                        {/* Left Column */}
                        <div className="flex w-full lg:w-[35%] shrink-0 flex-col gap-6 sm:gap-8 lg:gap-10">
                            {/* Custom order */}
                            <div className="flex-1 border border-gray-200 p-6 sm:p-8">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center">
                                    <LayoutGrid className="h-6 w-6 text-black" />
                                </div>
                                <h3 className="mb-2 text-[13px] font-bold text-black sm:text-sm">Custom order</h3>
                                <p className="text-[11px] leading-[1.6] text-gray-500 sm:text-xs">
                                    Place detailed orders through our advanced digital system with complete customization options.
                                </p>
                            </div>

                            {/* Real-time tracking */}
                            <div className="flex-1 border border-gray-200 p-6 sm:p-8">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center">
                                    <Eye className="h-6 w-6 text-black" />
                                </div>
                                <h3 className="mb-2 text-[13px] font-bold text-black sm:text-sm">Real-time tracking</h3>
                                <p className="text-[11px] leading-[1.6] text-gray-500 sm:text-xs">
                                    Monitor your lens production at every stage from manufacturing through quality control.
                                </p>
                            </div>
                        </div>

                        {/* Center Video Section */}
                        <div className="order-first lg:order-none flex-1 min-h-[300px] aspect-video  w-full lg:w-[50%] bg-black">
                            <video
                                src="/acutus.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline controls={false}
                                className=" inset-0 h-full w-full object-cover"
                            />
                        </div>

                        {/* Right Column */}
                        <div className="flex w-full lg:w-[35%] shrink-0 flex-col gap-6 sm:gap-8 lg:gap-10">
                            {/* Production stages */}
                            <div className="flex-1 border border-gray-200 p-6 sm:p-8">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center">
                                    <LineChart className="h-6 w-6 text-black" />
                                </div>
                                <h3 className="mb-2 text-[13px] font-bold text-black sm:text-sm">Production stages</h3>
                                <p className="text-[11px] leading-[1.6] text-gray-500 sm:text-xs">
                                    Follow your lenses through each production phase with complete visibility and control.
                                </p>
                            </div>

                            {/* Delivery management */}
                            <div className="flex-1 border border-gray-200 p-6 sm:p-8 ">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center ">
                                    <Truck className="h-6 w-6 text-black" />
                                </div>
                                <h3 className="mb-2 text-[13px] font-bold text-black sm:text-sm">Delivery management</h3>
                                <p className="text-[11px] leading-[1.6] text-gray-500 sm:text-xs">
                                    Seamless delivery coordination ensures your lenses arrive on time and in perfect condition.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
  )
}

export default Succeed
