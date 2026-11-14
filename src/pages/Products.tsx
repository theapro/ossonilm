import { productsIntro, seo } from "../data/content"
import { products } from "../data/products"
import { usePageMeta } from "../hooks/usePageMeta"
import { ProductCard } from "../components/products/ProductCard"
import { Container } from "../components/ui/Container"

export function Products() {
  usePageMeta({
    title: seo.products.title,
    description: seo.products.description,
    path: "/products",
  })

  return (
    <section className="py-14 sm:py-20 lg:py-24">
      <Container>
        <header className="max-w-2xl">
          <h1 className="text-4xl font-medium tracking-[-0.03em] text-balance sm:text-5xl">{productsIntro.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-pretty text-muted sm:text-lg">{productsIntro.subtitle}</p>
        </header>
        <div className="mt-14 grid gap-16 lg:mt-20 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-16">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} layout="stack" titleAs="h2" />
          ))}
        </div>
      </Container>
    </section>
  )
}
