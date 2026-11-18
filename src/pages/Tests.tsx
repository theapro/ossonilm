import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { seo } from "../data/content"
import { usePageMeta } from "../hooks/usePageMeta"
import { deckInfo, type DeckId } from "../lib/quiz"
import { Container } from "../components/ui/Container"

const order: DeckId[] = ["hiragana", "katakana", "n5"]

export function Tests() {
  usePageMeta({
    title: seo.tests.title,
    description: seo.tests.description,
    path: "/tests",
  })

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">Hiragana · Katakana · N5</p>
          <h1 className="mt-3 text-3xl font-medium tracking-[-0.03em] text-balance sm:text-4xl">Testlar</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-pretty text-muted sm:text-base">
            Uchta alohida test. Har birida 10 ta savol, javobni tanlagach to‘g‘ri variant ochiladi.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {order.map((id) => {
            const info = deckInfo[id]
            return (
              <Link
                key={id}
                to={info.path}
                className="group flex min-h-52 flex-col border border-line p-6 transition-colors hover:border-ink"
              >
                <span className="font-jp text-5xl leading-none">{info.sample}</span>
                <span className="mt-6 text-lg font-medium tracking-[-0.02em]">{info.title.replace(" testi", "")}</span>
                <span className="mt-1 text-sm text-muted">{info.eyebrow}</span>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium">
                  Boshlash
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
