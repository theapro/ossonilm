import { seo } from "../data/content"
import { usePageMeta } from "../hooks/usePageMeta"
import { AboutBand } from "../components/home/AboutBand"
import { Hero } from "../components/home/Hero"
import { PracticeBand } from "../components/home/PracticeBand"
import { ProductShowcase } from "../components/home/ProductShowcase"
import { StudySection } from "../components/home/StudySection"
import { WhySection } from "../components/home/WhySection"

export function Home() {
  usePageMeta({
    title: seo.home.title,
    description: seo.home.description,
    path: "/",
  })

  return (
    <>
      <Hero />
      <PracticeBand />
      <ProductShowcase />
      <StudySection />
      <WhySection />
      <AboutBand />
    </>
  )
}
