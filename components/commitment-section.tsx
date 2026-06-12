// Venn shape: two overlapping circles side by side
// Fixed viewBox so shape is pixel-identical on every screen size
function TwoCirclesShape() {
    return (
        <svg
            width="240"
            height="180"
            viewBox="0 0 240 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ display: "block", flexShrink: 0 }}
        >
            {/* Left circle */}
            <circle cx="80" cy="90" r="75" stroke="#d1d5db" strokeWidth="1" fill="none" />
            {/* Right circle */}
            <circle cx="160" cy="90" r="75" stroke="#d1d5db" strokeWidth="1" fill="none" />
        </svg>
    )
}

const cards = [
    {
        id: 1,
        title: "EXCEPTIONAL\nPERFORMANCE",
        description:
            "freeform digital surfacing, wavefront optimisation, and precise fitting parameters. To faster adaptation, sharper acuity, and reduced eye strain across distances.",
    },
    {
        id: 2,
        title: "EXCEPTIONAL\nPERFORMANCE",
        description:
            "freeform digital surfacing, wavefront optimisation, and precise fitting parameters. To faster adaptation, sharper acuity, and reduced eye strain across distances.",
    },
    {
        id: 3,
        title: "EXCEPTIONAL\nPERFORMANCE",
        description:
            "freeform digital surfacing, wavefront optimisation, and precise fitting parameters. To faster adaptation, sharper acuity, and reduced eye strain across distances.",
    },
]

export function CommitmentSection() {
    return (
        <section
            className="flex w-full min-h-screen   flex-col "
            style={{ backgroundColor: "#f5f5f5" }}
        >
            {/* Heading */}
            <div className="px-4 py-16 text-center sm:py-20 lg:py-24">
                <h2
                    className="mx-auto max-w-2xl font-bold uppercase leading-tight tracking-tight text-black"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                >
                    WE ARE COMMITTED TO
                    <br />
                    ADVANCING HOW YOU SEE
                    <br />
                    THE WORLD.
                </h2>
            </div>

            {/* Cards — flex grow to fill remaining space, no gaps */}
            <div className="flex w-full flex-1 flex-col md:flex-row px-4 md:px-10 pb-0 " style={{ gap: 0, marginTop: "auto" }}>
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="flex  flex-1 flex-col items-center justify-between bg-white px-6 pb-10 pt-16 text-center "
                        style={{
                            border: "1px solid #111",
                            borderLeft: card.id === 1 ? "1px solid #111" : "1px solid #111",
                            minHeight: "70vh"
                        }}
                    >
                        {/* Shape — identical SVG on every device */}
                        <div className="flex items-center justify-center">
                            <TwoCirclesShape />
                        </div>

                        {/* Text Group */}
                        <div className="mt-12 flex w-full flex-col items-center">
                            {/* Title — fixed font size, no responsive scaling */}
                            <h3
                                className="mb-6 font-bold uppercase tracking-wide px-10 text-4xl  text-black whitespace-pre-line "
                                style={{ lineHeight: "1.3" }}
                            >
                                {card.title}
                            </h3>

                            {/* Description — fixed font size */}
                            <p
                                className="leading-relaxed text-black"
                                style={{ fontSize: "0.875rem", maxWidth: "300px" }}
                            >
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section >
    )
}
