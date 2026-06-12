import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetailPage } from "@/components/product-detail/product-detail-page"
import {
  getAllProductSlugs,
  getProductBySlug,
} from "@/lib/products/product-detail"

interface AcutusProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: AcutusProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return { title: "Product Not Found" }
  }

  return {
    title: `${product.name} | Optika`,
    description: product.idealFor,
  }
}

export default async function AcutusProductPage({
  params,
}: AcutusProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailPage product={product} />
}
