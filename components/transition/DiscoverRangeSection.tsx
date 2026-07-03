import Image from "next/image";
import React from "react";

interface DiscoverRangeSectionProps {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    description?: React.ReactNode;
    imageSrc?: string;
    videoUrl?: string;
    reverseLayout?: boolean;
    className?: string;
}

export function DiscoverRangeSection({
    title = "ESSENTIAL - PIONEER - BEYOND",
    subtitle = "Optika Eyewear collections",
    description = (
        <p>
            Crafted with advanced digital surfacing technology, each lens is optimized to provide accurate vision correction tailored to contemporary lifestyles and demanding visual environments
        </p>
    ),
    imageSrc = "/acutusplus.jpeg",
    videoUrl,
    reverseLayout = false,
    className = "",
}: DiscoverRangeSectionProps) {
    return (
        <section className={`bg-white w-full p-16 sm:py-20 lg:py-16 px-6 lg:px-26 xl:px-50 ${className}`}>
            <div className="w-full">
                <div className="flex flex-col lg:flex-row w-full items-center gap-12">

                    {/* Text content */}
                    <div className={`flex flex-col lg:w-[90%] w-full ${reverseLayout ? 'order-2 lg:order-2 lg:pl-8 lg:pr-0' : 'order-2 lg:order-1'}`}>
                        <h2 className="text-2xl lg:text-3xl font-bold text-[#333333] tracking-wide uppercase mb-1">
                            {title}
                        </h2>
                        <h3 className="text-xl lg:text-2xl text-[#555555] mb-8 font-light">
                            {subtitle}
                        </h3>

                        <div className="text-[#666666] text-sm lg:text-base leading-relaxed space-y-6">
                            {description}
                        </div>
                    </div>

                    {/* Image/Video block */}
                    <div className={`relative w-full h-[80vh] flex items-center justify-center  ${reverseLayout ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
                        (
                        <Image
                            src={imageSrc}
                            alt=""
                            fill
                            className="object-cover w-full min-h-[500px ] "
                        />
                        )
                    </div>

                </div>
            </div>
        </section>
    );
}
