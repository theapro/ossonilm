import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { cta } from "../../data/content"
import { navLinks } from "../../data/site"
import { cn } from "../../lib/cn"
import { Button } from "../ui/Button"
import { Container } from "../ui/Container"
import { Logo } from "./Logo"

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const content = document.getElementById("content")
    const footer = document.querySelector("footer")

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }

    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }

    if (open) {
      if (content) content.inert = true
      if (footer instanceof HTMLElement) footer.inert = true
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", onKey)
    }

    window.addEventListener("resize", onResize)

    return () => {
      if (content) content.inert = false
      if (footer instanceof HTMLElement) footer.inert = false
      document.body.style.overflow = ""
      document.removeEventListener("keydown", onKey)
      window.removeEventListener("resize", onResize)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <Container className="flex h-16 items-center">
        <Logo />
        <nav className="ml-10 hidden items-center gap-8 lg:flex" aria-label="Asosiy">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn("relative py-1 text-sm transition-colors", isActive ? "font-medium text-ink" : "text-muted hover:text-ink")
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px w-full bg-mint transition-transform duration-200",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto hidden lg:block">
          <Button to="/products" size="sm">
            {cta.viewProducts}
          </Button>
        </div>
        <button
          type="button"
          className="ml-auto inline-flex size-10 cursor-pointer items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" strokeWidth={1.5} aria-hidden="true" /> : <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />}
        </button>
      </Container>
      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 bottom-0 z-40 animate-fade overflow-y-auto bg-white motion-reduce:animate-none lg:hidden"
        >
          <Container className="py-6">
            <nav className="flex flex-col" aria-label="Mobil menyu">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    cn(
                      "border-b border-line py-4 text-2xl font-medium tracking-[-0.03em]",
                      isActive ? "text-ink" : "text-muted",
                    )
                  }
                >
                  {({ isActive }) => (
                    <span className="flex items-center justify-between gap-4">
                      {link.label}
                      <span className={cn("h-px w-8 bg-mint", isActive ? "opacity-100" : "opacity-0")} aria-hidden="true" />
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
            <div className="mt-8">
              <Button to="/products" className="w-full">
                {cta.viewProducts}
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
