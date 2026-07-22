import { SharedFooter, type SharedFooterData } from "@/components/shared-footer";
import AboutHero from "@/components/AboutHero";
import { faqs as defaultFaqs, FaqSection } from "@/components/faq-section";
import BehindOptika from "@/components/behind-optika";
import { LensCategoriesSection } from "@/components/lens-categories-section";
import Succeed from "@/components/Succeed";
import { PerformanceSection } from "@/components/performance-section";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_PAGE_QUERY, SHARED_FOOTER_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { LensCategory } from "@/lib/lens-categories.config";

const DEFAULT_CATEGORIES: LensCategory[] = [
    {
        id: "Exceptional",
        image: "/about-optika.jpg",
        imageAlt: "Exceptional Performance",
        logoText: "Exceptional Performance",
        logoSubscript: "",
        description: "Freeform digital surfacing, wavefront optimisation, and precise fitting parameters. To faster adaptation, sharper acuity, and reduced eye strain across distances.",
        fontClass: "font-bold text-black/90 tracking-tight font-inter ",
        descriptionClassName: "mb-2  text-black/70",
    },
    {
        id: "High",
        image: "/test.jpg",
        imageAlt: "Woman wearing elegant cream framed eyeglasses",
        logoText: "High Standard Testing",
        logoSubscript: "",
        description: "Through the wavefront analysis, (MTF) evaluation, and wearer trials under real conditions. To validate optical quality, predictable performance, and enhanced wearer satisfaction across varied environments.",
        fontClass: "font-bold text-black tracking-tight font-inter",
        descriptionClassName: "mb-2 text-black/80",
    },
    {
        id: "Customised solutions",
        image: "/about-optika2.jpg",
        imageAlt: "Customised Solutions",
        logoText: "Customised Solutions",
        description: "Tailored to various lifestyles, occupations, and visual behaviours. Through task-specific optimisations to increases comfort, efficiency, and visual accuracy, minimising head movements and postural strains.  ",
        fontClass: "font-bold  tracking-tight font-inter text-black/90",
        descriptionClassName: " mb-2 text-black/70",
    },
]

export default async function AboutPage() {
    const [{ data: aboutData }, { data: footerData }] = await Promise.all([
        sanityFetch({ query: ABOUT_PAGE_QUERY }),
        sanityFetch({ query: SHARED_FOOTER_QUERY }),
    ])

    // LensCategories: prefer Sanity `lensCategoryCards[]` when present;
    // the cards the editor supplies are sparser than the hardcoded
    // fallback (no `id`, no `fontClass`/`descriptionClassName`), so we
    // synthesize IDs from the title and let the rest stay unstyled.
    const categoryItems: LensCategory[] | undefined =
        (aboutData?.lensCategoryCards?.length ?? 0) > 0
            ? aboutData!.lensCategoryCards
                  .filter((c: { title?: string }) => c.title)
                  .map((c: { image?: unknown; title: string; description?: string }) => ({
                      id: c.title.toLowerCase().replace(/\s+/g, '-'),
                      image: c.image ? urlFor(c.image).width(1200).url() : '',
                      imageAlt: c.title,
                      logoText: c.title,
                      logoSubscript: '',
                      description: c.description || '',
                  }))
            : undefined

    // FAQ: prefer the per-page Sanity block, otherwise the global
    // hardcoded list (matches the existing behaviour on the home page).
    const faqItems =
        (aboutData?.faq?.faqs?.length ?? 0) > 0
            ? aboutData!.faq.faqs
            : defaultFaqs
    const faqSubheading =
        aboutData?.faq?.subheading?.trim() ||
        'Find answers to questions about our lenses and ordering process.'

    return (
        <div className="relative gap-32 flex flex-col min-h-screen w-full bg-white overflow-x-hidden">
            <div className="flex flex-col gap-32 bg-[#f4f6f8] ">
                <AboutHero data={aboutData?.hero} />
                <BehindOptika data={aboutData?.behindOptika} />
                <LensCategoriesSection
                    cardVariant="constrained" titleClassName="text-black tracking-normal font-bold"
                    bgClassName="bg-[#f4f6f8]"
                    border="border-white/5 shadow-[0_1px_4px_rgba(f,f,f,f.1)] "
                    {...(categoryItems ? { categories: categoryItems } : { categories: DEFAULT_CATEGORIES })}
                    bgCards="bg-white"
                    descriptionClassName="text-black" LensCarouselControlsVariant="light"
                />
            </div>

            <Succeed data={aboutData?.succeed} />
            <PerformanceSection
                headline={aboutData?.performance?.headline}
                backgroundImage={aboutData?.performance?.backgroundImage}
            />

            <FaqSection faqs={faqItems} subheading={faqSubheading} />

            <SharedFooter data={footerData as SharedFooterData} />
        </div>
    )
}
