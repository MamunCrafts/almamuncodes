import Link from "next/link"
import { Award, BadgeCheck, ArrowUpRight } from "lucide-react"

// Presentational credential card, used on Home and About.
//
// Both kinds share one token-driven tone. The certification card used to carry
// MongoDB's brand green (#00ED64) as text, stripe, border and tint; that broke
// the site's colour rule (colour marks measurements and nothing else), clashed
// with the violet and cyan palettes, and as text on any light ground it sat
// around 1.6:1, unreadable. The card is distinguished by its icon, its label
// and its typography instead.
//
// The panel fill is --raised, the contract's card token. It used to be
// --accent-weak, which every palette defines as the --line colour: as a panel
// that dropped the secondary text to 3.75:1 on mineral light and made the
// card's own `border-line` invisible. On --raised the same text clears 4.5:1
// in all five palettes, both modes.

interface CredentialCardProps {
  kind: "recognition" | "certification"
  title: string
  org: string
  note?: string
  url?: string
}

const tone = {
  icon: "text-accent-text",
  label: "!text-accent-text",
  stripe: "border-l-accent",
  bg: "bg-raised",
  hover: "hover:border-accent",
  verify: "text-accent-text",
} as const

export function CredentialCard({ kind, title, org, note, url }: CredentialCardProps) {
  const isCert = kind === "certification"
  const Icon = isCert ? BadgeCheck : Award
  const label = isCert ? "Certification" : "Recognition"
  const t = tone

  const base = `group flex h-full flex-col rounded-[--radius] border border-line border-l-2 ${t.stripe} ${t.bg} p-6`

  const body = (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${t.icon}`} />
          <span className={`label ${t.label}`}>{label}</span>
        </div>
        {url && (
          <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
        )}
      </div>
      <p className="mt-4 font-display text-xl text-ink">{title}</p>
      <p className="mt-1 text-sm text-muted">{org}</p>
      {note && <p className="mt-3 text-sm text-muted">{note}</p>}
      {url && <p className={`mt-3 font-mono text-xs ${t.verify}`}>Verify on Credly</p>}
    </>
  )

  if (url) {
    return (
      <Link href={url} target="_blank" rel="noopener noreferrer" className={`${base} transition-colors ${t.hover}`}>
        {body}
      </Link>
    )
  }
  return <div className={base}>{body}</div>
}
