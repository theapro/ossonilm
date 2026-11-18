import { BookOpen, CircleCheck, Languages, ListChecks } from "lucide-react"
import { reasons } from "../../data/content"
import { Container } from "../ui/Container"
import { Reveal } from "../ui/Reveal"
import { Rule } from "../ui/Rule"

const icons = [Languages, BookOpen, ListChecks, CircleCheck]

export function WhySection() {
  return (
    <section className="bg-mist py-20 sm:py-28 xl:py-32" aria-labelledby="why-title">
      <Container>
        <Reveal>
          <h2 id="why-title" className="max-w-xl text-3xl font-medium tracking-[-0.03em] text-balance sm:text-4xl">
            Nima uchun OSSONILM
          </h2>
        </Reveal>
        <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = icons[index]
            return (
              <li key={reason.title}>
                <Reveal delay={index * 70}>
                  <Rule />
                  <p className="mt-5 text-[11px] font-medium tracking-[0.16em] text-muted">{reason.index}</p>
                  <h3 className="mt-3 flex items-center gap-2 text-lg font-medium">
                    {Icon ? <Icon className="size-4" strokeWidth={1.5} aria-hidden="true" /> : null}
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-pretty text-muted">{reason.text}</p>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
