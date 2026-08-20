import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="label flex items-center gap-2.5">
      <span className="inline-block h-px w-6 bg-accent" />
      {children}
    </p>
  )
}

// Tailwind cannot apply an opacity modifier to a colour declared as a bare
// var(), so `hover:bg-accent/90` compiles to nothing and the primary CTA loses
// its hover state entirely. color-mix() keeps the intent - accent dimmed toward
// the page ground - and resolves correctly in every palette and both modes.
const ACCENT_HOVER = "hover:bg-[color:color-mix(in_srgb,var(--accent)_88%,var(--bg))]"

type CTAProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "ghost"
  external?: boolean
  children: ReactNode
}

export function CTA({ variant = "primary", external, className = "", children, ...props }: CTAProps) {
  const base =
    "group inline-flex items-center gap-2 rounded-[--radius] px-5 py-3 text-sm font-medium transition-colors"
  const styles =
    variant === "primary"
      ? `bg-accent text-accent-ink ${ACCENT_HOVER}`
      : "border border-line text-ink hover:border-faint hover:bg-surface"
  return (
    <Link
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${styles} ${className}`}
    >
      {children}
      {external && <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
    </Link>
  )
}
