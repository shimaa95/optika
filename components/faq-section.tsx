export const faqs = [
    {
        question: "What makes Optika lenses different?",
        answer:
            "Optika lenses are manufactured in the Czech Republic using cutting-edge digital technology and tested to the highest industry standards. Every lens is customized to meet the specific needs of the wearer, ensuring unmatched visual clarity and comfort.",
    },
    {
        question: "How long does delivery take?",
        answer:
            "Most orders are delivered within 48 hours of production completion. We optimize every step of our workflow to ensure your lenses arrive on time and ready to perform.",
    },
    {
        question: "Can I customize my orders?",
        answer:
            "Yes. Our digital ordering system allows eye care professionals to customize every aspect of their lens orders. You control the specifications, and we handle the precision manufacturing.",
    },
    {
        question: "What quality standards do you follow?",
        answer:
            "Every lens meets global industry standards and passes through rigorous quality controls at every stage of production. We test what matters and deliver what works.",
    },
    {
        question: "Do you offer bulk ordering?",
        answer:
            "We serve eye care professionals of all sizes. Our system scales to your needs, whether you are ordering a few lenses or managing high-volume production.",
    },
    {
        question: "Reach out to our team for more information.",
        answer:
            "Our lenses combine Czech precision manufacturing with advanced digital technology. Each lens is customized to the wearer's exact specifications and tested rigorously before delivery. You get clarity that performs.",
    },
    {
        question: "What sets Optika apart?",
        answer:
            "We handle the ordering through a streamlined digital system designed for eye care professionals. You specify what you need, we manufacture with precision, and delivery happens within 48 hours. The process is built for efficiency.",
    },
    {
        question: "How does ordering work?",
        answer:
            "Every lens passes through strict quality controls at every production stage. We test what matters and only ship what meets our standards. Your patients will notice the difference immediately.",
    },
]

export function FaqSection({faqs = [], subheading}: {faqs?: {question: string, answer: string}[], subheading?: string}) {
    return (
        <section className="w-full min-h-screen lg:px-26 2xl:px-50 px-6  bg-white ">
            <div className="w-full py-16 sm:py-20 lg:py-24">
                {/* Header */}
                <div className="mb-10 sm:mb-12 lg:mb-14">
                    <h2 className="mb-2 text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl">
                        FAQ
                    </h2>
                    <p className="text-sm text-gray-500 sm:text-base">
                        {subheading || "Find answers to questions about our lenses and ordering process."}
                    </p>
                </div>

                {/* Two-column grid */}
                <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-10 xl:gap-x-20">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-t border-gray-200 pt-6">
                            <h3 className="mb-2 text-sm font-semibold text-black sm:text-base">
                                {faq.question}
                            </h3>
                            <p className="text-xs leading-relaxed text-gray-600 sm:text-sm text-justify">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
