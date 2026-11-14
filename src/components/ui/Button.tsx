import { Link } from "react-router-dom"
import type { ReactNode } from "react"
import { cn } from "../../lib/cn"

type Variant = "primary" | "secondary"
type Size = "sm" | "md"

const variants: Record<Variant, string> = {
  primary: "bg-mint text-ink hover:bg-mint-dark",
  secondary: "bg-white text-ink ring-1 ring-inset ring-ink hover:bg-ink hover:text-white",
}

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
}

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 font-medium tracking-[-0.01em] transition-colors duration-200"

type Props = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  to?: string
  href?: string
  external?: boolean
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  to,
  href,
  external,
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {external ? <span className="sr-only"> (yangi oynada ochiladi)</span> : null}
      </a>
    )
  }

  return (
    <button type="button" className={classes}>
      {children}
    </button>
  )
}
