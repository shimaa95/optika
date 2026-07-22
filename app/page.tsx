import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { sanityFetch } from '@/sanity/lib/live'
import {
  HOME_SEO_QUERY,
  HOME_HERO_QUERY,
  HOME_FAQ_QUERY,
  HOME_SOLUTIONS_QUERY,
  HOME_ABOUT_QUERY,
  HOME_GROUP_BANNER_QUERY,
  HOME_PARTNERS_QUERY,
  HOME_LENS_CATEGORIES_QUERY,
  HOME_PERFORMANCE_QUERY,
} from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import HomePageClient from '@/components/home/home-page-client'

const FALLBACK = {
  title: 'Optika — Premium Optical Lenses',
  description:
    'Where precision meets artistry. Premium eyewear crafted with innovative engineering and timeless elegance.',
  ogImage: '/og-default.png',
}

export async function generateMetadata(): Promise<Metadata> {
  // stega: false is critical — stega characters in <title> destroy SEO.
  // SEO fetches intentionally go through the un-tokenized `client` rather
  // than `sanityFetch` so they can never accidentally leak the read token
  // or include stega characters in the rendered <head>.
  const seo = await client.fetch(
    HOME_SEO_QUERY,
    {},
    { next: { revalidate: 60 }, stega: false }
  )

  const title = seo?.title?.trim() ? seo.title : FALLBACK.title
  const description = seo?.description?.trim()
    ? seo.description
    : FALLBACK.description
  const ogTitle = seo?.ogTitle?.trim() ? seo.ogTitle : title
  const ogDescription = seo?.ogDescription?.trim()
    ? seo.ogDescription
    : description

  const ogImageUrl = seo?.image
    ? urlFor(seo.image).width(1200).height(630).url()
    : FALLBACK.ogImage

  return {
    title,
    description,
    robots: seo?.noIndex ? 'noindex' : undefined,
    alternates: seo?.canonicalUrl
      ? { canonical: seo.canonicalUrl }
      : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: seo?.twitterCard === 'summary' ? 'summary' : 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [ogImageUrl],
    },
  }
}

export default async function HomePage() {
  // sanityFetch is the live-aware fetcher: subscribed to <SanityLive /> in
  // the root layout, and reads drafts when Draft Mode is on. Each call
  // returns { data }, not the raw payload — destructured below.
  const [
    { data: hero },
    { data: faq },
    { data: solutions },
    { data: about },
    { data: groupBanner },
    { data: partners },
    { data: lensCategories },
    { data: performance },
  ] = await Promise.all([
    sanityFetch({ query: HOME_HERO_QUERY }),
    sanityFetch({ query: HOME_FAQ_QUERY }),
    sanityFetch({ query: HOME_SOLUTIONS_QUERY }),
    sanityFetch({ query: HOME_ABOUT_QUERY }),
    sanityFetch({ query: HOME_GROUP_BANNER_QUERY }),
    sanityFetch({ query: HOME_PARTNERS_QUERY }),
    sanityFetch({ query: HOME_LENS_CATEGORIES_QUERY }),
    sanityFetch({ query: HOME_PERFORMANCE_QUERY }),
  ])

  return (
    <HomePageClient
      hero={hero?.hero ?? null}
      faq={faq?.faq ?? null}
      solutions={solutions?.solutions ?? null}
      about={about?.about ?? null}
      groupBanner={groupBanner?.groupBanner ?? null}
      partners={partners?.partners ?? null}
      lensCategories={lensCategories?.lensCategories ?? null}
      performance={performance?.performance ?? null}
    />
  )
}
