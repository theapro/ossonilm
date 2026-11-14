export function Rule({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-px bg-line ${className}`} aria-hidden="true">
      <span className="absolute top-0 left-0 h-px w-8 bg-mint" />
    </div>
  )
}
