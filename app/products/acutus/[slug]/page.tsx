import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetailPage } from "@/components/product-detail/product-detail-page"
import { client } from "@/sanity/lib/client"
import { sanityFetch } from "@/sanity/lib/live"
import {
  ACUTUS_PRODUCT_BY_SLUG_QUERY,
  ACUTUS_PRODUCT_SLUGS_QUERY,
} from "@/sanity/lib/queries"
import { getProductBySlug } from "@/lib/products/product-detail"
import {
  acutusProductFromSanity,
  type SanityAcutusProduct,
} from "@/lib/products/product-detail-from-sanity"

interface AcutusProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const data = await client.fetch<{ slug: string }[]>(ACUTUS_PRODUCT_SLUGS_QUERY)
  if (Array.isArray(data) && data.length > 0) {
    return data
      .map((row) => (row?.slug ? { slug: row.slug } : null))
      .filter((row): row is { slug: string } => row !== null)
  }
  return []
}

export async function generateMetadata({
  params,
}: AcutusProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const data = await client.fetch<SanityAcutusProduct | null>(
    ACUTUS_PRODUCT_BY_SLUG_QUERY,
    { slug },
    { stega: false },
  )
  const fromSanity = acutusProductFromSanity(data)
  if (fromSanity) {
    return {
      title: `${fromSanity.name} | Optika`,
      description: fromSanity.idealFor,
    }
  }
  const fallback = getProductBySlug(slug)
  if (!fallback) return { title: "Product Not Found" }
  return {
    title: `${fallback.name} | Optika`,
    description: fallback.idealFor,
  }
}

export default async function AcutusProductPage({
  params,
}: AcutusProductPageProps) {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: ACUTUS_PRODUCT_BY_SLUG_QUERY,
    params: { slug },
  })
  const product =
    acutusProductFromSanity(data) ?? getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailPage product={product} />
}
