import { ArrowRight } from "lucide-react"
import { useId } from "react"
import { Link } from "react-router-dom"
import { cta } from "../../data/content"
import { cn } from "../../lib/cn"
import type { Product } from "../../types/product"
import { CardSheet, Flashcard } from "../flashcards/Flashcard"

function Title({
  as,
  id,
  children,
}: {
  as: "h2" | "h3"
  id: string
  children: string
}) {
  const className = "text-2xl font-medium tracking-[-0.03em] text-balance sm:text-[1.75rem]"
  if (as === "h2") {
    return (
      <h2 id={id} className={className}>
        {children}
      </h2>
    )
  }
  return (
    <h3 id={id} className={className}>
      {children}
    </h3>
  )
}

function Visual({ product, layout }: { product: Product; layout: "row" | "stack" }) {
  const face = product.faces[0]
  if (!face) return null

  return (
    <div
      className={cn(
        "flex items-center justify-center border border-line bg-mist transition-colors duration-300 group-hover:border-mint",
        layout === "stack" ? "h-[320px] sm:h-[400px]" : "h-[320px] md:min-h-[460px]",
      )}
    >
      <div
        className={cn(
          "transition-transform duration-500 ease-out group-hover:-translate-y-1",
          product.orientation === "portrait" ? "w-[168px] sm:w-[196px]" : "w-[220px] sm:w-[268px]",
        )}
      >
        <CardSheet>
          <Flashcard face={face} orientation={product.orientation} decorative />
        </CardSheet>
      </div>
    </div>
  )
}

export function ProductCard({
  product,
  index,
  layout,
  reverse = false,
  titleAs,
}: {
  product: Product
  index: number
  layout: "row" | "stack"
  reverse?: boolean
  titleAs: "h2" | "h3"
}) {
  const titleId = useId()
  const descId = useId()
  const metaId = useId()

  const copy = (
    <div className={cn(layout === "stack" ? "pt-6" : "md:py-4")}>
      <p className="text-[11px] font-medium tracking-[0.18em] text-muted">
        {String(index + 1).padStart(2, "0")}
      </p>
      <Title as={titleAs} id={titleId}>
        {product.name}
      </Title>
      <p id={descId} className="mt-4 max-w-md text-sm leading-relaxed text-pretty text-muted sm:text-base">
        {product.description}
      </p>
      <p id={metaId} className="mt-5 text-sm">
        {product.cardCount}
        <span className="text-muted"> · {product.size}</span>
      </p>
      <span className="mt-6 inline-flex h-10 w-fit items-center gap-2 border border-ink px-4 text-sm font-medium transition-colors duration-200 group-hover:bg-ink group-hover:text-white">
        {cta.details}
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </div>
  )

  return (
    <article className={cn(layout === "stack" && "h-full")}>
      <Link
        to={`/products/${product.slug}`}
        aria-labelledby={titleId}
        aria-describedby={`${descId} ${metaId}`}
        className="group block h-full"
      >
        {layout === "row" ? (
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <div className={cn(reverse && "md:order-2")}>
              <Visual product={product} layout={layout} />
            </div>
            <div className={cn(reverse && "md:order-1")}>{copy}</div>
          </div>
        ) : (
          <div>
            <Visual product={product} layout={layout} />
            {copy}
          </div>
        )}
      </Link>
    </article>
  )
}
