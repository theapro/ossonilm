import { useState, type KeyboardEvent } from "react"
import type { Product } from "../../types/product"
import { cn } from "../../lib/cn"
import { CardSheet, Flashcard } from "../flashcards/Flashcard"

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0)
  const face = product.faces[active]
  const label = product.images[active] ?? product.name

  function onKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return
    event.preventDefault()
    const count = product.faces.length
    if (count === 0) return
    const next =
      event.key === "ArrowRight" ? (active + 1) % count : (active - 1 + count) % count
    setActive(next)
    const buttons = event.currentTarget.querySelectorAll("button")
    buttons[next]?.focus()
  }

  if (!face) return null

  return (
    <div>
      <div
        className={cn(
          "flex items-center justify-center border border-line bg-mist px-6",
          product.orientation === "portrait" ? "min-h-[440px] sm:min-h-[540px]" : "min-h-[300px] sm:min-h-[380px]",
        )}
      >
        <div
          className={cn(
            product.orientation === "portrait"
              ? "w-[200px] sm:w-[240px] lg:w-[270px]"
              : "w-[250px] sm:w-[320px] lg:w-[380px]",
          )}
        >
          <CardSheet>
            <Flashcard face={face} orientation={product.orientation} decorative />
          </CardSheet>
        </div>
      </div>
      <ul
        className="mt-4 flex snap-x gap-3 overflow-x-auto p-2"
        aria-label="Karta ko’rinishlari"
        onKeyDown={onKeyDown}
      >
        {product.faces.map((item, index) => {
          const selected = index === active
          return (
            <li key={item.id} className="snap-start">
              <button
                type="button"
                aria-pressed={selected}
                aria-label={`${selected ? "Tanlangan: " : ""}${product.images[index] ?? item.glyph}`}
                onClick={() => setActive(index)}
                className={cn(
                  "block cursor-pointer bg-white transition-transform",
                  product.orientation === "portrait" ? "w-[72px]" : "w-[108px]",
                  selected && "-translate-y-0.5 ring-1 ring-mint ring-offset-2 ring-offset-white",
                )}
              >
                <Flashcard face={item} orientation={product.orientation} decorative />
              </button>
            </li>
          )
        })}
      </ul>
      <p className="sr-only">{label}</p>
    </div>
  )
}
