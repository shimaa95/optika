const benefits = [
  { title: "UV PROTECTION", description: "100% OF UV RAYS BLOCK" },
  { title: "STYLE", description: "WIDE COLOUR RANGE" },
  { title: "BLUE LIGHT  FILTER", description: "BLUE-VIOLET LIGHT FILTERING" },
  { title: "ADAPTATION", description: "CHANGE FROM CLEAR INDOORS TO DARK OUTDOORS" },
]

export function BenefitsSection() {
  return (
    <section className="bg-white w-full py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <h2 className="mx-auto mb-12 max-w-xl text-center text-2xl font-bold uppercase leading-tight tracking-tight text-black sm:text-3xl lg:mb-16 lg:text-4xl">
          The Benefit of Transitions Lenses
        </h2>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex flex-col">
              <div className="mb-5 aspect-square w-full max-w-[150px] bg-[#d9d9d9]" />
              <h3 className="text-xs font-bold uppercase tracking-wide text-black">{benefit.title}</h3>
              <p className="mt-1 text-[10px] uppercase leading-relaxed tracking-wide text-black/50">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
