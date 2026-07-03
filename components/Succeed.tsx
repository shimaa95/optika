import { Eye, LayoutGrid, LineChart, Truck, LucideIcon } from 'lucide-react'
import React from 'react'

export interface SucceedBoxProps {
    icon: LucideIcon;
    title: string;
    description: React.ReactNode;
}

interface SucceedProps {
    SucceedHeader?: boolean;
    videoUrl?: string;
    boxes?: SucceedBoxProps[];
}

const defaultBoxes: SucceedBoxProps[] = [
    {
        icon: LayoutGrid,
        title: "Custom order",
        description: "Place detailed orders through our advanced digital system with complete customization options."
    },
    {
        icon: Eye,
        title: "Real-time tracking",
        description: "Monitor your lens production at every stage from manufacturing through quality control."
    },
    {
        icon: LineChart,
        title: "Production stages",
        description: "Follow your lenses through each production phase with complete visibility and control."
    },
    {
        icon: Truck,
        title: "Delivery management",
        description: "Seamless delivery coordination ensures your lenses arrive on time and in perfect condition."
    }
];

function Succeed({ 
    SucceedHeader = true, 
    videoUrl = "/acutus.mp4",
    boxes = defaultBoxes
}: SucceedProps) {
    return (
        <section className="w-full-safe bg-white px-6 py-16 sm:py-20 md:py-24 lg:py-28">
            <div className="mx-auto lg:max-w-[1000px] xl:max-w-[1200px] lg:px-[53px] xl:px-[103px]">
                {/* Section Header */}
                {SucceedHeader && <div className="mb-10 text-center sm:mb-12 lg:mb-16">
                    <h2 className="mb-3 text-[22px] font-bold uppercase tracking-tight text-black sm:text-[28px] md:text-[32px] lg:text-[36px]">
                        Everything You Need
                        <br />
                        To Succeed
                    </h2>
                    <p className="mx-auto max-w-[500px] text-[11px] leading-[1.6] text-gray-500 sm:text-xs">
                        Our integrated platform streamlines every aspect of lens ordering, production, and delivery.
                    </p>
                </div>}

                {/* 3-Column Layout */}
                <div className="flex place-content-center flex-col lg:flex-row items-stretch gap-6 sm:gap-8 lg:gap-10">
                    {/* Left Column (Boxes 0 and 1) */}
                    <div className="flex w-full lg:w-[35%] shrink-0 flex-col gap-6 sm:gap-8 lg:gap-10">
                        {boxes.slice(0, 2).map((box, idx) => {
                            const Icon = box.icon;
                            return (
                                <div key={idx} className="flex-1 border border-gray-200 p-6 sm:p-8">
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center">
                                        <Icon className="h-6 w-6 text-black" />
                                    </div>
                                    <h3 className="mb-2 text-[13px] font-bold text-black sm:text-sm">{box.title}</h3>
                                    <p className="text-[11px] leading-[1.6] text-gray-500 sm:text-xs">
                                        {box.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Center Video Section */}
                    <div className="order-first lg:order-none flex-1 min-h-[300px] aspect-video w-full lg:w-[50%] bg-black">
                        <video
                            src={videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline controls={false}
                            className="inset-0 h-full w-full object-cover"
                        />
                    </div>

                    {/* Right Column (Boxes 2 and 3) */}
                    <div className="flex w-full lg:w-[35%] shrink-0 flex-col gap-6 sm:gap-8 lg:gap-10">
                        {boxes.slice(2, 4).map((box, idx) => {
                            const Icon = box.icon;
                            return (
                                <div key={idx} className="flex-1 border border-gray-200 p-6 sm:p-8">
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center">
                                        <Icon className="h-6 w-6 text-black" />
                                    </div>
                                    <h3 className="mb-2 text-[13px] font-bold text-black sm:text-sm">{box.title}</h3>
                                    <p className="text-[11px] leading-[1.6] text-gray-500 sm:text-xs">
                                        {box.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Succeed

