import Image from "next/image"
import Tagline from "../Tagline"
import Headline from "../Headline"

const lensRanges = [
  {
    title: "ACUTUS LENS FAMILY",
    description: "Optika Exclusive range of Lens",
  },
  {
    title: "SINGLE VISION LENSES",
    description: "Innovative Single Vision Lenses",
  },
  {
    title: "TRANSITION LENSES",
    description: "Light Innovative Technology Lenses",
  },
]

export function DiscoverRangeSection({ videoUrl, imageSrc }: { videoUrl?: string, imageSrc?: string }) {
  return (
    <section className="bg-[#f5f5f5] w-full pb-16 sm:pb-20 lg:pb-24 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10 items-stretch">
        {/* Video / media block */}
        <div className="relative w-full aspect-[4/3]  lg:aspect-[2/3] lg:h-full min-h-[300px] lg:min-h-[90vh] overflow-hidden">
          {videoUrl && <video src={videoUrl} autoPlay loop muted className="w-full h-full object-cover lg:pr-10" />}
          {imageSrc && <Image src={imageSrc} fill alt="" className="w-full h-full object-cover" />}
        </div>


        {/* Text content */}
        <div className="flex flex-col justify-center px-8 py-16  lg:px-20 lg:py-20 ">
          <div className="max-w-md">
            <Tagline className="mb-8"> Our <br />  Products </Tagline>
            <Headline size="lg" className="mb-8">
              Discover Optika&apos;s <br /> Wide Range of Lenses</Headline>

            <div className="flex flex-col gap-7">
              {lensRanges.map((range) => (
                <div key={range.title}>
                  <h3 className="font-bold uppercase text-black text-[20px] tracking-[0.1em] leading-[28px]">{range.title}</h3>
                  <p className="mt-1 text-black/50 2xl:text-[20px] text-[16px]">{range.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}
