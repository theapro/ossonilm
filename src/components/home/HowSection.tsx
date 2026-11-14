import { steps } from "../../data/content"
import { Container } from "../ui/Container"
import { Reveal } from "../ui/Reveal"
import { Rule } from "../ui/Rule"

export function HowSection() {
  return (
    <section className="py-20 sm:py-28 xl:py-32" aria-labelledby="how-title">
      <Container>
        <Reveal>
          <h2 id="how-title" className="text-3xl font-medium tracking-[-0.03em] text-balance sm:text-4xl">
            Qanday ishlaydi
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <li key={step.index}>
              <Reveal delay={index * 80}>
                <Rule />
                <h3 className="mt-6 text-xl font-medium tracking-tight">
                  <span className="text-muted">{step.index} — </span>
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-pretty text-muted">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
