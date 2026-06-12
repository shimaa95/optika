import { ProductCard } from "./product-card"

const products = [
  {
    title: "ACTUS PLUS",
    subtitle: "ORGANIC RX PROGRESSIVE",
    description: "ACTUS PLUS is a premium, highly personalised progressive lens.",
    features: ["Dynamic vision", "Wide distance fields", "Ideal for outdoor activities"],
  },
  {
    title: "ACTUS PLUS",
    subtitle: "ORGANIC RX PROGRESSIVE",
    description: "ACTUS PLUS is a premium, highly personalised progressive lens.",
    features: ["Dynamic vision", "Wide distance fields", "Ideal for outdoor activities"],
  },
  {
    title: "ACTUS PLUS",
    subtitle: "ORGANIC RX PROGRESSIVE",
    description: "ACTUS PLUS is a premium, highly personalised progressive lens.",
    features: ["Dynamic vision", "Wide distance fields", "Ideal for outdoor activities"],
  },
  {
    title: "ACTUS PLUS",
    subtitle: "ORGANIC RX PROGRESSIVE",
    description: "ACTUS PLUS is a premium, highly personalised progressive lens.",
    features: ["Dynamic vision", "Wide distance fields", "Ideal for outdoor activities"],
  },
  {
    title: "ACTUS PLUS",
    subtitle: "ORGANIC RX PROGRESSIVE",
    description: "ACTUS PLUS is a premium, highly personalised progressive lens.",
    features: ["Dynamic vision", "Wide distance fields", "Ideal for outdoor activities"],
  },
  {
    title: "ACTUS PLUS",
    subtitle: "ORGANIC RX PROGRESSIVE",
    description: "ACTUS PLUS is a premium, highly personalised progressive lens.",
    features: ["Dynamic vision", "Wide distance fields", "Ideal for outdoor activities"],
  },
  {
    title: "ACTUS PLUS",
    subtitle: "ORGANIC RX PROGRESSIVE",
    description: "ACTUS PLUS is a premium, highly personalised progressive lens.",
    features: ["Dynamic vision", "Wide distance fields", "Ideal for outdoor activities"],
  },
  {
    title: "ACTUS PLUS",
    subtitle: "ORGANIC RX PROGRESSIVE",
    description: "ACTUS PLUS is a premium, highly personalised progressive lens.",
    features: ["Dynamic vision", "Wide distance fields", "Ideal for outdoor activities"],
  },
]

export function ProductGrid() {
  return (
    <section className="bg-white px-12 py-12">
      <div className="grid grid-cols-4 ">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            subtitle={product.subtitle}
            description={product.description}
            features={product.features}
          />
        ))}
      </div>
    </section>
  )
}
