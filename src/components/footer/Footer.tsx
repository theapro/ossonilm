import { Send } from "lucide-react"
import { Link } from "react-router-dom"
import { navLinks, site } from "../../data/site"
import { Container } from "../ui/Container"
import { Logo } from "../navigation/Logo"
import { InstagramIcon } from "../ui/SocialIcons"

export function Footer() {
  return (
    <footer className="site-footer bg-ink text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">{site.tagline}</p>
          </div>
          <nav className="lg:col-span-3" aria-label="Pastki menyu">
            <p className="text-[11px] font-medium tracking-[0.16em] text-white/60 uppercase">Sayt</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/75 hover:text-white hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-4">
            <p className="text-[11px] font-medium tracking-[0.16em] text-white/60 uppercase">Aloqa</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white hover:underline"
                >
                  <InstagramIcon />
                  Instagram
                  <span className="sr-only"> (yangi oynada ochiladi)</span>
                </a>
              </li>
              <li>
                <a
                  href={site.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white hover:underline"
                >
                  <Send className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  Telegram
                  <span className="sr-only"> (yangi oynada ochiladi)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.year} {site.name} · {site.organization}
          </p>
          <a href={`${site.origin}/`} className="hover:text-white hover:underline">
            {site.domain}
          </a>
        </div>
      </Container>
    </footer>
  )
}
