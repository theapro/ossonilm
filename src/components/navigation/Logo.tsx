import { Link } from "react-router-dom"
import { cn } from "../../lib/cn"

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      to="/"
      aria-label="OSSONILM, bosh sahifa"
      className="inline-flex items-center gap-2.5"
    >
      <img
        src="/branding/Logo.png"
        alt=""
        width={128}
        height={128}
        className="size-8 shrink-0 object-contain sm:size-9"
      />
      <span
        className={cn(
          "text-[13px] font-medium tracking-[0.2em]",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        OSSONILM
      </span>
    </Link>
  )
}
