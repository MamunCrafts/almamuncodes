import Link from "next/link"
import { Github, Linkedin } from "lucide-react"
import { site } from "@/config/site"
import { Container, CTA } from "@/components/primitives/ui"
import { Reveal } from "@/components/primitives/reveal"
import { CopyEmail } from "@/components/home/copy-email"

export function Contact() {
  return (
    <section id="contact" className="bg-noise relative scroll-mt-24 overflow-hidden border-t border-line py-20 lg:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 rotate-180" aria-hidden />
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[calc(var(--radius)+4px)] border border-line bg-surface/50 p-8 sm:p-12 lg:p-16">
            {/* accent edge: the one bold flourish */}
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" aria-hidden />

            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bg px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="label !text-ink/80">{site.availability}</span>
            </span>

            <h2 className="mt-7 max-w-3xl text-display-lg">
              Let's <span className="font-display italic text-accent">talk.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Hiring for a remote team in the UK, US or Australia? Email is the fastest way to reach
              me, and I reply within a day. Contract or full-time, both welcome.
            </p>

            {/* Primary action: big, unmissable */}
            <div className="mt-9 max-w-xl">
              <CopyEmail email={site.email} />
              <p className="mt-3 font-mono text-sm text-muted">
                or call{" "}
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="link-underline text-ink">
                  {site.phone}
                </a>
              </p>
            </div>

            {/* Secondary actions */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <CTA href={site.resumeUrl} variant="ghost" external>
                Download résumé
              </CTA>
              <Link
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[--radius] border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-ink/40 hover:bg-bg"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </Link>
              <Link
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[--radius] border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-ink/40 hover:bg-bg"
              >
                <Github className="h-4 w-4" /> GitHub
              </Link>
            </div>

            {/* Meta footer */}
            <dl className="mt-10 grid gap-x-8 gap-y-4 border-t border-line pt-8 font-mono text-sm sm:grid-cols-3">
              <div>
                <dt className="label mb-1.5">Based</dt>
                <dd className="text-ink">{site.location} · {site.timezone}</dd>
              </div>
              <div>
                <dt className="label mb-1.5">Overlap</dt>
                <dd className="text-ink">UK/EU AM · US East AM · AU PM</dd>
              </div>
              <div>
                <dt className="label mb-1.5">Response</dt>
                <dd className="text-ink">Within a day</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
