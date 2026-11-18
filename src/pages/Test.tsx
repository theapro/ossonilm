import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { ArrowRight, RotateCcw } from "lucide-react"
import { usePageMeta } from "../hooks/usePageMeta"
import { buildQuiz, deckInfo, isDeck, type DeckId, type QuizQuestion } from "../lib/quiz"
import { cn } from "../lib/cn"
import { Button } from "../components/ui/Button"
import { Container } from "../components/ui/Container"

function resultCopy(score: number, total: number) {
  const ratio = score / total
  if (ratio === 1) return "Hammasi to‘g‘ri."
  if (ratio >= 0.7) return "Yaxshi natija. Yana bir davra o‘tishingiz mumkin."
  if (ratio >= 0.4) return "Asosiy belgilar esda. Kartalarni qayta ko‘rib, testdan yana o‘ting."
  return "Hali yangi. Ma’no va o‘qilishni kartada ko‘rib, qaytadan boshlang."
}

export function Test() {
  const { deck = "" } = useParams()
  if (!isDeck(deck)) return <Navigate to="/tests" replace />
  return <Quiz key={deck} deck={deck} />
}

function Quiz({ deck }: { deck: DeckId }) {
  const info = deckInfo[deck]
  usePageMeta({
    title: `${info.title} — OSSONILM`,
    description: info.text,
    path: info.path,
  })

  const [round, setRound] = useState<QuizQuestion[]>(() => buildQuiz(deck))
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const question = round[index]
  const finished = index >= round.length
  const total = round.length

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (finished || !question) return
      if (picked) return
      const choice = question.choices[Number(event.key) - 1]
      if (!choice) return
      setPicked(choice)
      if (choice === question.answer) setScore((value) => value + 1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [finished, picked, question])

  function choose(choice: string) {
    if (picked || !question) return
    setPicked(choice)
    if (choice === question.answer) setScore((value) => value + 1)
  }

  function next() {
    setPicked(null)
    setIndex((value) => value + 1)
  }

  function again() {
    setRound(buildQuiz(deck))
    setIndex(0)
    setPicked(null)
    setScore(0)
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">{info.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-medium tracking-[-0.03em] text-balance sm:text-4xl">{info.title}</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-pretty text-muted sm:text-base">{info.text}</p>

          {finished ? (
            <div className="mt-12 border border-line p-8 sm:p-10">
              <p className="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">Natija</p>
              <p className="mt-4 font-jp text-6xl leading-none tracking-tight">
                {score}
                <span className="text-3xl text-muted"> / {total}</span>
              </p>
              <p className="mt-5 max-w-md text-base leading-relaxed text-pretty">{resultCopy(score, total)}</p>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
                <Button onClick={again}>
                  <RotateCcw className="size-4" aria-hidden="true" />
                  Qaytadan
                </Button>
                <Button to="/tests" variant="secondary">
                  Boshqa test
                </Button>
              </div>
            </div>
          ) : question ? (
            <div className="mt-10">
              <div className="h-px bg-line" aria-hidden="true">
                <div className="h-px bg-mint" style={{ width: `${(index / total) * 100}%` }} />
              </div>
              <p className="mt-4 text-[11px] font-medium tracking-[0.16em] text-muted">
                {index + 1} / {total}
              </p>
              <p className="mt-6 text-sm text-muted">{question.ask}</p>
              <p
                className={cn(
                  "mt-3 leading-none font-medium tracking-tight",
                  question.kind === "glyph" ? "text-4xl sm:text-5xl" : "font-jp text-7xl sm:text-8xl",
                )}
              >
                {question.prompt}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2" role="group" aria-label="Javob variantlari">
                {question.choices.map((choice, choiceIndex) => {
                  const selected = picked === choice
                  const correct = choice === question.answer
                  const show = picked !== null
                  return (
                    <button
                      key={choice}
                      type="button"
                      disabled={picked !== null}
                      onClick={() => choose(choice)}
                      className={cn(
                        "min-h-16 cursor-pointer border px-4 py-3 text-left transition-colors disabled:cursor-default",
                        question.kind === "glyph" && "font-jp text-3xl",
                        !show && "hover:border-ink",
                        show && correct && "border-mint bg-mint text-ink",
                        show && selected && !correct && "border-ink bg-mist text-muted",
                        show && !selected && !correct && "border-line text-muted",
                      )}
                    >
                      <span className="mr-3 text-xs tracking-[0.14em] text-muted">{choiceIndex + 1}</span>
                      {choice}
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 min-h-16" aria-live="polite">
                {picked ? (
                  <>
                    <p className="text-sm font-medium">{picked === question.answer ? "To‘g‘ri." : "Noto‘g‘ri."}</p>
                    <p className="mt-1 text-sm text-muted">{question.reveal}</p>
                    <button
                      type="button"
                      onClick={next}
                      className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-medium hover:underline"
                    >
                      {index + 1 === total ? "Natija" : "Keyingisi"}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </button>
                  </>
                ) : (
                  <p className="text-sm text-muted">Variantni tanlang.</p>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
