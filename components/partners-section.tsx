import SplitLayoutHero from "./SplitLayoutHero"

export function PartnersSection() {
  return (
    <SplitLayoutHero
      id="partners"
      imageSrc="/partner.jpg"
      imageAlt="Team collaborating in a modern office space with warm lighting"
      tagline={`Hello Head\nSafe you\nAchieve`}
      heading={` PARTNERS\nINTEGRATED\nSOLUTIONS`}
      description="Optika supports hundreds and here holds units, ophthalmologists, low vision and vision and integrated specialists. Let Optika be your partner for distribution, marketing, and clinical support, opening new pathways from head safe until your patients live life better."
      buttonLabel="Discover Our Programs"
      pageName="programs"
      className="!z-30 bg-black" theme="dark"
      reverseLayout={true}
      contentClassName="px-0 md:px-0 ml-6 md:ml-26 py-16 sm:py-20 md:py-24 lg:py-0 2xl:ml-50" textSize="text-[50px]"
    />
  )
}