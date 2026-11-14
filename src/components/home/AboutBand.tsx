import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { about } from "../../data/content"
import { Container } from "../ui/Container"
import { Reveal } from "../ui/Reveal"

export function AboutBand() {
  return (
    <section className="border-t border-line py-20 sm:py-28" aria-labelledby="about-title">
      <Container>
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
            <h2
              id="about-title"
              className="text-3xl font-medium tracking-[-0.03em] text-balance sm:text-4xl lg:col-span-4"
            >
              {about.title}
            </h2>
            <div className="border-l border-mint pl-6 lg:col-span-7 lg:col-start-6">
              <p className="text-lg leading-relaxed text-pretty">{about.lead}</p>
              <p className="mt-6 text-sm text-muted">{about.project}</p>
              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium hover:underline"
              >
                Biz haqimizda
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
