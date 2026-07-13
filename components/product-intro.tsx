export function ProductIntro({
    tagline,
    title,
    body,
    ranges,
}: {
    tagline: string
    title: string
    body: string
    ranges: string[]
}) {
    return (
        <section className="w-full bg-white py-16 lg:py-24">
            <div className="mx-auto max-w-4xl px-6 lg:px-20 xl:px-24 2xl:px-50 text-center">
                {/* <p className="font-inter text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-6">
                    {tagline}
                </p>
                <h1 className="font-inter text-[32px] xl:text-[56px] font-semibold leading-[1.1] tracking-tight text-gray-900 mb-6">
                    {title}
                </h1> */}
                {/* <p className="font-inter text-[14px] xl:text-[18px] leading-relaxed text-gray-500 max-w-2xl mx-auto mb-10">
                    {body}
                </p> */}
                {/* {ranges.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {ranges.map((range) => (
                            <span
                                key={range}
                                className="font-inter text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.18em] text-gray-700 border border-gray-200 rounded-full px-4 py-2"
                            >
                                {range}
                            </span>
                        ))}
                    </div>
                )} */}
            </div>
        </section>
    )
}
