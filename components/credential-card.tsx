import Link from "next/link"
import { Award, BadgeCheck, ArrowUpRight } from "lucide-react"

// Shared by Home and About. MongoDB keeps its brand colors in every theme.

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
  title: "text-ink",
  detail: "text-muted",
} as const

// Use readable green text in each mode and retain the MongoDB green stripe.
const mongoDBTone = {
  icon: "text-[var(--mongodb-text)]",
  label: "!text-[var(--mongodb-text)]",
  stripe: "border-l-[#00ed64]",
  bg: "bg-raised",
  hover: "hover:border-[var(--mongodb-text)]",
  verify: "text-[var(--mongodb-text)]",
  title: "text-[var(--mongodb-text)]",
  detail: "text-muted",
} as const

export function CredentialCard({ kind, title, org, note, url }: CredentialCardProps) {
  const isCert = kind === "certification"
  const Icon = isCert ? BadgeCheck : Award
  const label = isCert ? "Certification" : "Recognition"
  const t = isCert && org === "MongoDB, Inc." ? mongoDBTone : tone

  const base = `group flex h-full flex-col rounded-[--radius] border border-line border-l-2 ${t.stripe} ${t.bg} p-6`

  const body = (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${t.icon}`} />
          <span className={`label ${t.label}`}>{label}</span>
        </div>
        {url && (
          <ArrowUpRight className={`h-4 w-4 ${t.icon} transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5`} />
        )}
      </div>
      <p className={`mt-4 font-display text-xl ${t.title}`}>{title}</p>
      <p className={`mt-1 text-sm ${t.detail}`}>{org}</p>
      {note && <p className={`mt-3 text-sm ${t.detail}`}>{note}</p>}
      {url && <p className={`mt-3 font-mono text-sm ${t.verify}`}>Verify on Credly</p>}
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
