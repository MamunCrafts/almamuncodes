import type { ReactNode } from "react"

/**
 * The trace bar: this site's signature element.
 *
 * A proportional before/after measurement. Bars are drawn to scale against a
 * shared axis, so a 60% payload cut *looks* like 60% instead of being asserted
 * in text. Iron red is the cost before, teal the cost after - the only two
 * places colour is allowed in this design.
 *
 * One axis, one direction: every bar encodes cost, and shorter is always
 * better. A higher-is-better figure would invert that reading, so it belongs
 * in <HeadlineMetric> instead of in the chart.
 *
 * Pure CSS animation, no client JS: the fill scales from 0 on mount, staggered
 * per row. Under prefers-reduced-motion the global rule zeroes both duration
 * and delay, so the bars land fully drawn instead of holding an empty frame.
 */

export interface TraceRow {
  /** 0–1, relative to the group's shared maximum. */
  ratio: number
  /** The readout, e.g. "~40%". */
  value: string
  path: "before" | "after"
}

export interface TraceProps {
  label: string
  before: Omit<TraceRow, "path">
  after: Omit<TraceRow, "path">
  delay?: number
}

function Bar({ ratio, value, path, delay }: TraceRow & { delay: number }) {
  // Bar is a large area (3:1); the readout beside it is text (4.5:1). They are
  // deliberately different tokens - see the header comment in app/globals.css.
  const tone = path === "before" ? "bg-slow-fill" : "bg-fast-fill"
  const ink = path === "before" ? "text-slow" : "text-fast"
  return (
    <div className="flex items-center gap-4">
      <div className="h-2.5 min-w-0 flex-1 bg-line">
        <div
          className={`h-full origin-left animate-trace-in ${tone}`}
          style={{ width: `${Math.max(0, Math.min(1, ratio)) * 100}%`, animationDelay: `${delay}ms` }}
        />
      </div>
      <span className={`tnum w-12 shrink-0 text-right font-mono text-xs ${ink}`}>{value}</span>
    </div>
  )
}

export function Trace({ label, before, after, delay = 0 }: TraceProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:items-center sm:gap-x-6">
      <p className="label !text-ink">{label}</p>
      <div className="grid gap-1.5">
        <Bar {...before} path="before" delay={delay} />
        <Bar {...after} path="after" delay={delay + 140} />
      </div>
    </div>
  )
}

/**
 * The single headline figure. Set in the display face at a size no other number
 * on the page gets, so the hierarchy is unambiguous.
 */
export function HeadlineMetric({
  value,
  label,
  detail,
}: {
  value: string
  label: string
  detail?: string
}) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="tnum font-display text-5xl leading-none text-fast sm:text-6xl">{value}</span>
      <span>
        <span className="label !text-ink">{label}</span>
        {detail && <span className="mt-1.5 block max-w-[34ch] text-sm text-muted">{detail}</span>}
      </span>
    </div>
  )
}

/**
 * Groups the figures under one source line. The caption is not decoration -
 * every number here has to be attributable in an interview.
 */
export function TraceGroup({
  caption,
  note,
  children,
}: {
  caption: ReactNode
  note?: string
  children: ReactNode
}) {
  return (
    <figure className="mt-12 max-w-2xl">
      <figcaption className="label flex items-center gap-3">
        <span className="h-px w-6 bg-faint" />
        {caption}
      </figcaption>
      <div className="mt-6 grid gap-7">{children}</div>
      {note && <p className="mt-5 font-mono text-[0.6875rem] text-muted">{note}</p>}
    </figure>
  )
}
