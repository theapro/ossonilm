import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { absoluteUrl } from "../data/site"
import { getOtherProducts, getProduct } from "../data/products"
import { seo } from "../data/content"
import { usePageMeta } from "../hooks/usePageMeta"
import { ProductGallery } from "../components/products/ProductGallery"
import { ProductInfo } from "../components/products/ProductInfo"
import { Container } from "../components/ui/Container"
import { NotFound } from "./NotFound"

export function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug)

  usePageMeta({
    title: product ? `${product.name} — OSSONILM` : seo.notFound.title,
    description: product ? product.description : seo.notFound.description,
    path: product ? `/products/${product.slug}` : `/products/${slug ?? ""}`,
    noindex: !product,
  })

  useEffect(() => {
    if (!product) return

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      brand: { "@type": "Brand", name: "OSSONILM" },
      category: "O’quv materiallari",
      url: absoluteUrl(`/products/${product.slug}`),
    })
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [product])

  if (!product) return <NotFound />

  const others = getOtherProducts(product.slug)

  return (
    <article className="py-10 sm:py-14 lg:py-16">
      <Container>
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Mahsulotlar
        </Link>
        <div className="mt-8 grid items-start gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16">
          <ProductGallery key={product.slug} product={product} />
          <ProductInfo product={product} />
        </div>
        {others.length > 0 ? (
          <aside className="mt-20 border-t border-line pt-10 sm:mt-28">
            <h2 className="text-[11px] font-medium tracking-[0.18em] text-muted uppercase">
              {others.length > 1 ? "Boshqa to’plamlar" : "Yana bir to’plam"}
            </h2>
            <ul className="mt-2 divide-y divide-line">
              {others.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/products/${item.slug}`}
                    className="group flex items-center justify-between gap-6 py-5"
                  >
                    <span>
                      <span className="block text-2xl font-medium tracking-tight group-hover:underline">
                        {item.name}
                      </span>
                      <span className="mt-2 block text-sm text-muted">{item.description}</span>
                    </span>
                    <ArrowRight className="size-5 shrink-0" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </Container>
    </article>
  )
}
