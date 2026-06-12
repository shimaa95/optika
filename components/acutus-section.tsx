import Image from "next/image"

export function AcutusSection() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/actushero.png"
        alt="Fashion model wearing Acutus lenses on runway"
        fill
        loading="eager"
        className="object-cover object-center"
        priority
      />

      {/* Large ACUTUS Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-[120px] md:text-[200px] lg:text-[280px] font-bold text-white tracking-tight select-none">
          ACUTUS
        </h2>
      </div>
    </section>
  )
}
