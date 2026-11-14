import { seo } from "../data/content"
import { usePageMeta } from "../hooks/usePageMeta"
import { AboutBand } from "../components/home/AboutBand"
import { Hero } from "../components/home/Hero"
import { HowSection } from "../components/home/HowSection"
import { ProductShowcase } from "../components/home/ProductShowcase"
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
      <ProductShowcase />
      <WhySection />
      <HowSection />
      <AboutBand />
    </>
  )
}
