import { ArrowRight } from "lucide-react"
import { cta, hero } from "../../data/content"
import { Button } from "../ui/Button"
import { Container } from "../ui/Container"
import { CardFan } from "../flashcards/CardFan"

export function Hero() {
  return (
    <section className="overflow-x-clip pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
          <div className="max-w-xl">
            <div>
              <span className="block h-px w-8 bg-mint" aria-hidden="true" />
              <p className="mt-4 max-w-[18rem] text-[11px] leading-relaxed font-medium tracking-[0.14em] text-muted sm:max-w-none sm:tracking-[0.16em]">
                {hero.label}
              </p>
            </div>
            <h1 className="mt-6 text-[2.45rem] leading-[1.12] font-medium tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl xl:text-[4.15rem]">
              {hero.titleLead}
              <br />
              {hero.titleRest}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-pretty text-muted sm:text-lg">
              {hero.text}
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button to="/tests">
                {cta.test}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button to="/products" variant="secondary">
                {cta.viewProducts}
              </Button>
            </div>
          </div>
          <CardFan />
        </div>
      </Container>
    </section>
  )
}
