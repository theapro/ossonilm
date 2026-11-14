import { productsIntro } from "../../data/content"
import { products } from "../../data/products"
import { ProductCard } from "../products/ProductCard"
import { Container } from "../ui/Container"
import { Reveal } from "../ui/Reveal"

export function ProductShowcase() {
  return (
    <section id="mahsulotlar" className="border-t border-line py-20 sm:py-28 xl:py-32">
      <Container>
        <Reveal>
          <header className="max-w-2xl">
            <h2 className="text-3xl font-medium tracking-[-0.03em] text-balance sm:text-4xl">
              {productsIntro.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-muted sm:text-lg">
              {productsIntro.subtitle}
            </p>
          </header>
        </Reveal>
        <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 60}>
              <ProductCard
                product={product}
                index={index}
                layout="row"
                reverse={index % 2 === 1}
                titleAs="h3"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
