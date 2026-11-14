import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { about, cta, seo } from "../data/content"
import { products } from "../data/products"
import { usePageMeta } from "../hooks/usePageMeta"
import { Button } from "../components/ui/Button"
import { Container } from "../components/ui/Container"

export function About() {
  usePageMeta({
    title: seo.about.title,
    description: seo.about.description,
    path: "/about",
  })

  return (
    <section className="py-16 sm:py-24 lg:py-28">
      <Container>
        <p className="text-[11px] font-medium tracking-[0.18em] text-muted uppercase">AdlWisdom</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-medium tracking-[-0.03em] text-balance sm:text-5xl">
          {about.title}
        </h1>
        <div className="mt-10 max-w-3xl border-l border-mint pl-6">
          <p className="text-xl leading-relaxed text-pretty sm:text-2xl sm:leading-snug">{about.lead}</p>
          <p className="mt-6 text-sm text-muted">{about.project}</p>
        </div>
        <div className="mt-16 max-w-xl border-t border-line pt-8">
          <h2 className="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">Materiallar</h2>
          <ul className="mt-5 space-y-4">
            {products.map((product) => (
              <li key={product.id}>
                <Link to={`/products/${product.slug}`} className="group inline-flex items-center gap-3">
                  <span className="text-lg font-medium tracking-tight group-hover:underline">{product.name}</span>
                  <ArrowRight className="size-4 text-muted" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button to="/products">{cta.viewProducts}</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
