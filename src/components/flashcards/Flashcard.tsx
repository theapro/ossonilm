import type { ReactNode } from "react"
import type { CardFace, Product } from "../../types/product"
import { cn } from "../../lib/cn"

function Meaning({ children }: { children: string }) {
  return (
    <div className="mt-[0.7em] flex flex-col items-center">
      <span className="mb-[0.45em] h-px w-[1.6em] bg-mint" aria-hidden="true" />
      <p className="text-[clamp(0.5rem,3.5cqw,1rem)] font-medium tracking-wide">{children}</p>
    </div>
  )
}

function FaceBody({ face }: { face: CardFace }) {
  if (face.layout === "kana") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="flex items-center gap-[0.4em] text-[clamp(1rem,16cqw,3.75rem)]">
          <span className="font-jp font-medium leading-none">{face.glyph}</span>
          <span className="h-[0.8em] w-px bg-line" aria-hidden="true" />
          <span className="font-jp font-medium leading-none">{face.pairGlyph}</span>
        </div>
        <Meaning>{face.meaning}</Meaning>
      </div>
    )
  }

  if (face.layout === "back") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="text-[clamp(0.9rem,11cqw,2.7rem)] font-medium tracking-tight">{face.meaning}</p>
        <span className="my-[0.55em] h-px w-[1.6em] bg-mint" aria-hidden="true" />
        <p className="font-jp text-[clamp(0.85rem,9cqw,2rem)] leading-none">{face.glyph}</p>
        {face.reading ? (
          <p className="mt-[0.35em] font-jp-sans text-[clamp(0.45rem,3.2cqw,0.9rem)] tracking-[0.18em] text-muted">
            {face.reading}
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <p
        className={cn(
          "font-jp font-medium leading-none",
          face.layout === "word"
            ? "text-[clamp(0.72rem,10cqw,2.35rem)]"
            : "text-[clamp(1.35rem,28cqw,6rem)]",
        )}
      >
        {face.glyph}
      </p>
      {face.reading ? (
        <p className="mt-[0.35em] font-jp-sans text-[clamp(0.45rem,3.4cqw,0.95rem)] tracking-[0.22em] text-muted">
          {face.reading}
        </p>
      ) : null}
      <Meaning>{face.meaning}</Meaning>
    </div>
  )
}

export function Flashcard({
  face,
  orientation = "portrait",
  decorative = false,
  className,
}: {
  face: CardFace
  orientation?: Product["orientation"]
  decorative?: boolean
  className?: string
}) {
  if (face.image) {
    return (
      <div
        aria-hidden={decorative ? true : undefined}
        className={cn(
          "relative w-full overflow-hidden bg-white ring-1 ring-black/[0.06]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_1px_rgba(10,10,10,0.04),0_18px_40px_-24px_rgba(10,10,10,0.55)]",
          className,
        )}
      >
        <img
          src={face.image}
          alt=""
          width={1040}
          height={686}
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
    )
  }

  return (
    <div
      aria-hidden={decorative ? true : undefined}
      className={cn(
        "@container relative flex w-full flex-col overflow-hidden bg-white text-ink ring-1 ring-black/[0.06]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_1px_rgba(10,10,10,0.04),0_18px_40px_-24px_rgba(10,10,10,0.55)]",
        orientation === "portrait" ? "aspect-[7/10]" : "aspect-[85/55]",
        "px-[clamp(0.45rem,5cqw,1.75rem)] py-[clamp(0.4rem,4cqw,1.5rem)]",
        className,
      )}
    >
      <span
        className="pointer-events-none absolute top-[8%] bottom-[8%] left-[clamp(0.3rem,2.2cqw,0.55rem)] w-px bg-mint"
        aria-hidden="true"
      />
      <div className="flex min-h-[0.6em] justify-end">
        {face.series ? (
          <p className="hidden text-[clamp(0.45rem,2.6cqw,0.68rem)] tracking-[0.16em] text-muted @min-[7.5rem]:block">
            {face.series}
          </p>
        ) : null}
      </div>
      <FaceBody face={face} />
      <p className="mt-[0.4em] hidden text-center text-[clamp(0.4rem,2.1cqw,0.58rem)] tracking-[0.24em] text-[#8a8a8a] @min-[7.5rem]:block">
        OSSONILM
      </p>
    </div>
  )
}

export function CardSheet({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div
        className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-[#f3f3f2] ring-1 ring-black/[0.05]"
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </div>
  )
}
