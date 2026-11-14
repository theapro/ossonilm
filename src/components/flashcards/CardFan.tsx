import type { CSSProperties } from "react"
import { heroCards } from "../../data/products"
import { cn } from "../../lib/cn"
import { Flashcard } from "./Flashcard"

type FanStyle = CSSProperties & {
  "--tilt": string
  "--tilt-hover": string
}

const placements = [
  {
    className: "bottom-0 left-0 z-10 w-[70%] sm:w-[62%]",
    tilt: "-6deg",
    hover: "-6deg",
    delay: "40ms",
    front: false,
  },
  {
    className: "top-0 right-0 z-10 w-[64%] sm:w-[56%]",
    tilt: "7deg",
    hover: "7deg",
    delay: "140ms",
    front: false,
  },
  {
    className: "top-[22%] left-[12%] z-20 w-[62%] sm:w-[54%]",
    tilt: "-1.5deg",
    hover: "2deg",
    delay: "240ms",
    front: true,
  },
] as const

export function CardFan() {
  return (
    <div
      className="group relative mx-auto h-[400px] w-full max-w-[520px] sm:h-[460px] lg:mx-0 lg:h-[520px] lg:max-w-none"
      role="img"
      aria-label="OSSONILM flashcardlari: hiragana あ va katakana ア."
    >
      <div aria-hidden="true" className="absolute inset-0">
        {heroCards.map((card, index) => {
          const place = placements[index]
          if (!place) return null
          const style: FanStyle = {
            "--tilt": place.tilt,
            "--tilt-hover": place.hover,
          }
          return (
            <div
              key={card.face.id}
              className={cn(
                "absolute animate-rise motion-reduce:animate-none",
                place.className,
              )}
              style={{ animationDelay: place.delay }}
            >
              <div className={cn("fan-card", place.front && "fan-front")} style={style}>
                <Flashcard face={card.face} orientation={card.orientation} decorative />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
