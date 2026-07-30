import Link from "next/link"
import { Award, BadgeCheck, ArrowUpRight } from "lucide-react"

// Presentational credential card, used on Home and About. Recognition cards use
// the site's warm accent; certification cards get MongoDB brand green (#00ED64).
// (The arbitrary color classes are written out in full so Tailwind's JIT keeps them.)

interface CredentialCardProps {
  kind: "recognition" | "certification"
  title: string
  org: string
  note?: string
  url?: string
}

const tones = {
  recognition: {
    icon: "text-accent",
    label: "!text-accent",
    stripe: "border-l-accent",
    bg: "bg-accent-weak",
    hover: "hover:border-accent",
    verify: "text-accent",
  },
  certification: {
    icon: "text-[#00ED64]",
    label: "!text-[#00ED64]",
    stripe: "border-l-[#00ED64]",
    bg: "bg-[#00ED64]/[0.06]",
    hover: "hover:border-[#00ED64]",
    verify: "text-[#00ED64]",
  },
} as const

export function CredentialCard({ kind, title, org, note, url }: CredentialCardProps) {
  const isCert = kind === "certification"
  const Icon = isCert ? BadgeCheck : Award
  const label = isCert ? "Certification" : "Recognition"
  const t = tones[kind]

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
