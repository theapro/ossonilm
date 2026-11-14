import { ArrowUpRight } from "lucide-react"
import { cta } from "../../data/content"
import { site } from "../../data/site"
import type { Product } from "../../types/product"
import { Button } from "../ui/Button"

export function ProductInfo({ product }: { product: Product }) {
  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">{product.cardCount}</p>
      <h1 className="mt-3 text-3xl font-medium tracking-[-0.03em] text-balance sm:text-4xl">{product.name}</h1>
      <p className="mt-5 text-base leading-relaxed text-pretty text-muted">{product.description}</p>
      <p className="mt-3 text-base leading-relaxed text-pretty">{product.details}</p>

      <div className="mt-10">
        <p className="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">Narx</p>
        <p className="mt-2 text-3xl font-medium tracking-tight">{product.price}</p>
        <p className="mt-2 text-sm text-muted">{product.priceNote}</p>
      </div>

      <div className="mt-6">
        <Button href={site.telegram} external>
          {cta.order}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Button>
        <p className="mt-3 text-sm text-muted">{cta.telegram}</p>
      </div>

      <h2 className="mt-12 text-[11px] font-medium tracking-[0.16em] text-muted uppercase">Xususiyatlar</h2>
      <dl className="mt-4 border-t border-line">
        {product.specs.map((spec) => (
          <div key={`${spec.label}-${spec.value}`} className="flex items-baseline justify-between gap-6 border-b border-line py-3 text-sm">
            <dt className="text-muted">{spec.label}</dt>
            <dd className="text-right font-medium">{spec.value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-12 text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
        O’rganish imkoniyatlari
      </h2>
      <ul className="mt-4 space-y-3">
        {product.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm leading-relaxed">
            <span className="mt-2 size-1 shrink-0 bg-mint" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
