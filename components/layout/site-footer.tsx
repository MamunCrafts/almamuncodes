import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { site } from "@/config/site"
import { Container } from "@/components/primitives/ui"

const socials = [
  { href: site.socials.github, icon: Github, label: "GitHub" },
  { href: site.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${site.email}`, icon: Mail, label: "Email" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-12">
      <Container className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
        <div>
          <p className="font-display text-lg">{site.name}</p>
          <p className="mt-1 max-w-sm text-sm text-muted">
            {site.title} · open to remote roles · {site.location} ({site.timezone})
          </p>
          <a
            href={`mailto:${site.email}`}
            className="link-underline mt-3 inline-block font-mono text-sm text-ink"
          >
            {site.email}
          </a>
        </div>

        <div className="flex flex-col items-start gap-4 sm:items-end">
          <div className="flex items-center gap-1">
            {socials.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-[--radius] text-muted transition-colors hover:bg-surface hover:text-ink"
              >
                <Icon className="h-[18px] w-[18px]" />
              </Link>
            ))}
          </div>
          <p className="label">© 2026 · built with Next.js &amp; Tailwind</p>
        </div>
      </Container>
    </footer>
  )
}
