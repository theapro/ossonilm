export const site = {
  name: "OSSONILM",
  domain: "www.ossonilm.uz",
  origin: "https://www.ossonilm.uz",
  organization: "AdlWisdom",
  tagline: "O’rganishni osonlashtiramiz.",
  instagram: "https://instagram.com/ossonilm",
  telegram: "https://t.me/ossonilm",
  year: 2026,
} as const

export const navLinks = [
  { to: "/", label: "Bosh sahifa", end: true },
  { to: "/products", label: "Mahsulotlar", end: false },
  { to: "/tests", label: "Testlar", end: false },
  { to: "/about", label: "Biz haqimizda", end: true },
] as const

export function absoluteUrl(path: string) {
  if (path === "/") return `${site.origin}/`
  return `${site.origin}${path}`
}
