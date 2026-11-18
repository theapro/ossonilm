import { Container } from "../ui/Container"
import { Reveal } from "../ui/Reveal"

const facts = [
  { label: "Kun’yomi", value: "みず", jp: true },
  { label: "On’yomi", value: "スイ", jp: true },
  { label: "Ma’no", value: "Suv", jp: false },
  { label: "Gap", value: "水を 飲みます。", jp: true },
]

export function StudySection() {
  return (
    <section className="border-t border-line py-20 sm:py-28" aria-labelledby="study-title">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">Kartada nima bor</p>
            <h2 id="study-title" className="mt-4 max-w-md text-3xl font-medium tracking-[-0.03em] text-balance sm:text-4xl">
              Bitta belgi, to‘liq ma’lumot.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-pretty text-muted">
              Old tomonda yozuv va chizish tartibi. Orqa tomonda o‘qilish, oltita misol va shu kanji ishtirokidagi gap.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
              {facts.map((fact) => (
                <div key={fact.label} className="border-t border-line pt-3">
                  <dt className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">{fact.label}</dt>
                  <dd className={fact.jp ? "mt-2 font-jp text-lg" : "mt-2 text-lg"}>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex min-h-[320px] items-center justify-center border border-line bg-mist sm:min-h-[420px]">
              <p className="font-jp text-[8rem] leading-none sm:text-[10rem]">水</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
