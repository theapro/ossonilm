import type { ReactNode } from "react"
import { cn } from "../../lib/cn"

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <div
      className={cn("animate-rise motion-reduce:animate-none", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
