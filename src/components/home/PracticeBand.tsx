import { ArrowRight } from "lucide-react"
import { n5Kanji } from "../../data/n5Kanji"
import { cta } from "../../data/content"
import { Button } from "../ui/Button"
import { Container } from "../ui/Container"

const sample = ["日", "本", "人", "水", "月", "火"]

export function PracticeBand() {
  const known = sample.filter((glyph) => n5Kanji.some((card) => card.kanji === glyph))

  return (
    <section className="bg-ink text-white" aria-labelledby="practice-title">
      <Container className="py-16 sm:py-20">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium tracking-[0.16em] text-white/60 uppercase">N5 · 100 ta kanji</p>
            <h2 id="practice-title" className="mt-4 text-3xl font-medium tracking-[-0.03em] text-balance sm:text-4xl">
              Shu kanjilarni testda sinab ko‘ring.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-pretty text-white/75 sm:text-base">
              O‘nta savol. Ba’zida ma’no, ba’zida belgining o‘zi, ba’zida kun’yomi yoki on’yomi so‘raladi.
            </p>
            <div className="mt-8">
              <Button to="/tests/n5">
                {cta.test}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <p className="font-jp text-4xl leading-none tracking-[0.18em] text-white sm:text-5xl" aria-hidden="true">
            {known.join(" ")}
          </p>
        </div>
      </Container>
    </section>
  )
}
