import type { ReactNode } from "react"

/**
 * The rail layout: metadata and measurements live in a narrow left column,
 * the argument lives in the wide right one. The split encodes something true
 * about the content rather than decorating it - anything in the rail is a fact
 * you could look up, anything in the main column is a claim being made.
 *
 * Collapses to a single column below `lg`, rail first.
 */
export function RailLayout({
  rail,
  children,
  className = "",
}: {
  rail: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`grid gap-10 lg:grid-cols-[12rem_1fr] lg:gap-14 ${className}`}>
      {/* Content leads in DOM and on mobile - the pitch should not sit below a
          block of metadata. Explicit grid placement puts the rail back on the
          left at lg without reordering the reading sequence. */}
      <div className="min-w-0 lg:col-start-2 lg:row-start-1">{children}</div>
      <div className="lg:col-start-1 lg:row-start-1 lg:sticky lg:top-28 lg:self-start">{rail}</div>
    </div>
  )
}

/** One labelled fact in the rail. */
export function RailItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-line py-3 first:border-t-0 first:pt-0">
      <dt className="label">{label}</dt>
      <dd className="mt-1.5 font-mono text-xs leading-relaxed text-ink">{children}</dd>
    </div>
  )
}

export function Rail({ children }: { children: ReactNode }) {
  return <dl className="grid grid-cols-2 gap-x-8 sm:grid-cols-3 lg:block">{children}</dl>
}
