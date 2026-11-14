import { useLocation } from "react-router-dom"
import { seo } from "../data/content"
import { usePageMeta } from "../hooks/usePageMeta"
import { Button } from "../components/ui/Button"
import { Container } from "../components/ui/Container"

export function NotFound() {
  const { pathname } = useLocation()

  usePageMeta({
    title: seo.notFound.title,
    description: seo.notFound.description,
    path: pathname,
    noindex: true,
  })

  return (
    <Container className="py-24 sm:py-32">
      <p className="text-[11px] font-medium tracking-[0.18em] text-muted">404</p>
      <h1 className="mt-4 text-4xl font-medium tracking-[-0.03em] sm:text-5xl">Sahifa topilmadi</h1>
      <p className="mt-4 max-w-md text-muted">Bu manzil mavjud emas.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button to="/">Bosh sahifa</Button>
        <Button to="/products" variant="secondary">
          Mahsulotlar
        </Button>
      </div>
    </Container>
  )
}
