import { Eye, LayoutGrid, LineChart, Truck, LucideIcon, Sparkles, Globe, Award, Shield, Zap } from 'lucide-react'
import React from 'react'

export interface SucceedBoxProps {
    icon: LucideIcon;
    title: string;
    description: React.ReactNode;
}

interface SucceedData {
    eyebrow?: string
    heading?: string
    subheading?: string
    videoUrl?: string
    boxes?: { title: string; description: string; icon?: string }[]
}

interface SucceedProps {
    SucceedHeader?: boolean;
    videoUrl?: string; className?: string;
    boxes?: SucceedBoxProps[];
    data?: SucceedData;
}

// Maps editor-supplied icon names from Sanity to Lucide components.
// Editors don't have access to the icon library, so a short allowlist
// keeps the surface small and stable.
const ICON_MAP: Record<string, LucideIcon> = {
    LayoutGrid, Eye, LineChart, Truck,
    Sparkles, Globe, Award, Shield, Zap,
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
    boxes,
    data,
    className = "",
}: SucceedProps) {
    // Sanity-driven path: convert editor icon strings to Lucide components
    // and fall back to LayoutGrid for any unknown / missing icon.
    const resolvedBoxes: SucceedBoxProps[] = (() => {
        if ((data?.boxes?.length ?? 0) === 0) {
            return boxes ?? defaultBoxes
        }
        return data!.boxes!.map((b) => ({
            icon: ICON_MAP[b.icon ?? ''] ?? LayoutGrid,
            title: b.title,
            description: b.description,
        }))
    })()

    const resolvedHeading = data?.heading?.trim() || 'Everything You Need\nTo Succeed'
    const resolvedSubheading =
        data?.subheading?.trim() ||
        'Our integrated platform streamlines every aspect of lens ordering, production, and delivery.'
    const resolvedVideoUrl = data?.videoUrl?.trim() || videoUrl

    const renderHeading = (s: string) =>
        s.split('\n').map((line, i, arr) => (
            <React.Fragment key={i}>
                {line}
                {i < arr.length - 1 && <br />}
            </React.Fragment>
        ))

    return (
        <section className={`w-full bg-white px-6 lg:px-20 xl:px-24 2xl:px-50 ${className}`}>
            <div className="mx-auto">
                {/* Section Header */}
                {SucceedHeader && <div className="mb-10 text-center sm:mb-16 ">
                    <h2 className="mb-3 text-[32px] font-bold uppercase tracking-tight text-black">
                        {renderHeading(resolvedHeading)}
                    </h2>
                    <p className="mx-auto max-w-[500px] text-[11px] leading-[1.6] text-gray-500 sm:text-xs">
                        {resolvedSubheading}
                    </p>
                </div>}

                {/* 3-Column Layout */}
                <div className="flex flex-col lg:flex-row items-stretch gap-6 sm:gap-8 lg:gap-10 w-full">
                    {/* Left Column (Boxes 0 and 1) */}
                    <div className="flex w-full lg:w-1/4 shrink-0 flex-col gap-6 sm:gap-8 lg:gap-10">
                        {resolvedBoxes.slice(0, 2).map((box, idx) => {
                            const Icon = box.icon;
                            return (
                                <div key={idx} className="flex-1 border border-gray-200 p-6 sm:p-8">
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center">
                                        <Icon className="h-6 w-6 text-black" />
                                    </div>
                                    <h3 className="mb-2 font-bold text-black text-[16px] tracking-tight leading-[28px]">{box.title}</h3>
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
                            src={resolvedVideoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline controls={false}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Right Column (Boxes 2 and 3) */}
                    <div className="flex w-full lg:w-1/4 shrink-0 flex-col gap-6 sm:gap-8 lg:gap-10">
                        {resolvedBoxes.slice(2, 4).map((box, idx) => {
                            const Icon = box.icon;
                            return (
                                <div key={idx} className="flex-1 border border-gray-200 p-6 sm:p-8">
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center">
                                        <Icon className="h-6 w-6 text-black" />
                                    </div>
                                    <h3 className="mb-2 font-bold text-black text-[16px] tracking-tight leading-[20px]">{box.title}</h3>
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
