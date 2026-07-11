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
        <section className="w-full bg-white px-6 lg:px-20 xl:px-24 2xl:px-50 py-16 sm:py-20 ">
            <div className="mx-auto">
                {/* Section Header */}
                {SucceedHeader && <div className="mb-10 text-center sm:mb-12 lg:mb-16">
                    <h2 className="mb-3 text-[32px] font-bold uppercase tracking-tight text-black">
                        Everything You Need
                        <br />
                        To Succeed
                    </h2>
                    <p className="mx-auto max-w-[500px] text-[11px] leading-[1.6] text-gray-500 sm:text-xs">
                        Our integrated platform streamlines every aspect of lens ordering, production, and delivery.
                    </p>
                </div>}

                {/* 3-Column Layout */}
                <div className="flex flex-col lg:flex-row items-stretch gap-6 sm:gap-8 lg:gap-10 w-full">
                    {/* Left Column (Boxes 0 and 1) */}
                    <div className="flex w-full lg:w-1/4 shrink-0 flex-col gap-6 sm:gap-8 lg:gap-10">
                        {boxes.slice(0, 2).map((box, idx) => {
                            const Icon = box.icon;
                            return (
                                <div key={idx} className="flex-1 border border-gray-200 p-6 sm:p-8">
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center">
                                        <Icon className="h-6 w-6 text-black" />
                                    </div>
                                    <h3 className="mb-2 font-bold text-black text-[20px] tracking-[0.1em] leading-[28px]">{box.title}</h3>
                                    <p className="text-[11px] leading-[1.6] text-gray-500 sm:text-xs">
                                        {box.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Center Video Section */}
                    <div className="order-first lg:order-none w-full lg:flex-1 min-h-[300px] aspect-video bg-black">
                        <video
                            src={videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline controls={false}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Right Column (Boxes 2 and 3) */}
                    <div className="flex w-full lg:w-1/4 shrink-0 flex-col gap-6 sm:gap-8 lg:gap-10">
                        {boxes.slice(2, 4).map((box, idx) => {
                            const Icon = box.icon;
                            return (
                                <div key={idx} className="flex-1 border border-gray-200 p-6 sm:p-8">
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center">
                                        <Icon className="h-6 w-6 text-black" />
                                    </div>
                                    <h3 className="mb-2 font-bold text-black text-[20px] tracking-[0.1em] leading-[28px]">{box.title}</h3>
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

