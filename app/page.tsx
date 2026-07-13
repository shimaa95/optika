import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import {
  HOME_SEO_QUERY,
  HOME_FAQ_QUERY,
  HOME_SOLUTIONS_QUERY,
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
  // Fetch in parallel; each falls back to null on miss, and HomePageClient
  // uses its existing hardcoded data when null.
  const [faqResult, solutionsResult] = await Promise.all([
    client.fetch(HOME_FAQ_QUERY, {}, { next: { revalidate: 60 } }),
    client.fetch(HOME_SOLUTIONS_QUERY, {}, { next: { revalidate: 60 } }),
  ])

  return (
    <HomePageClient
      faq={faqResult?.faq ?? null}
      solutions={solutionsResult?.solutions ?? null}
    />
  )
}
