import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import type { CaseStudy } from "@/lib/case-studies"
import { Container } from "@/components/primitives/ui"
import { Reveal } from "@/components/primitives/reveal"
import { ArchitectureDiagram } from "@/components/work/architecture-diagram"

function SectionHeading({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-baseline gap-4">
      <span className="label pt-1">{n}</span>
      <h2 className="text-display-sm">{children}</h2>
    </div>
  )
}

export function CaseStudyView({ study }: { study: CaseStudy }) {
  return (
    <article className="pt-32 pb-24 sm:pt-40">
      <Container>
        <Link href="/work" className="link-underline inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> All work
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="label">Case study{study.year ? ` · ${study.year}` : ""}</p>
          <h1 className="mt-4 text-display-md">{study.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{study.teaser}</p>
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Sticky sidebar (collapses above content on mobile) */}
          <aside className="lg:col-span-4 lg:order-2">
            <dl className="rounded-[--radius] border border-line bg-surface/60 p-6 font-mono text-sm lg:sticky lg:top-28">
              {(
                [
                  ["Role", study.meta.role],
                  ["Duration", study.meta.duration],
                  ["Team", study.meta.team],
                ] as [string, string | undefined][]
              )
                .filter(([, v]) => Boolean(v))
                .map(([k, v]) => (
                  <div key={k} className="border-b border-line py-3 first:pt-0">
                    <dt className="label mb-1.5">{k}</dt>
                    <dd className="text-ink">{v}</dd>
                  </div>
                ))}
              <div className="py-3">
                <dt className="label mb-2">Stack</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {study.meta.stack.map((t) => (
                    <span key={t} className="rounded border border-line px-1.5 py-0.5 text-[11px] text-muted">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
              {study.meta.links.length > 0 && (
                <div className="border-t border-line pt-3">
                  <dt className="label mb-2">Links</dt>
                  <dd className="flex flex-col gap-1.5">
                    {study.meta.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-ink hover:text-accent"
                      >
                        {l.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </aside>

          {/* Body */}
          <div className="space-y-16 lg:col-span-8 lg:order-1">
            <Reveal as="section">
              <SectionHeading n="01">Context</SectionHeading>
              <p className="max-w-prose leading-relaxed text-muted">{study.context}</p>
            </Reveal>

            <Reveal as="section">
              <SectionHeading n="02">Problem</SectionHeading>
              <p className="max-w-prose leading-relaxed text-muted">{study.problem}</p>
            </Reveal>

            <Reveal as="section">
              <SectionHeading n="03">Constraints</SectionHeading>
              <ul className="max-w-prose space-y-3">
                {study.constraints.map((c, i) => (
                  <li key={i} className="flex gap-3 leading-relaxed text-muted">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal as="section">
              <SectionHeading n="04">Approach</SectionHeading>
              <div className="space-y-7">
                {study.approach.map((a) => (
                  <div key={a.heading} className="border-l-2 border-line pl-5">
                    <h3 className="font-display text-lg text-ink">{a.heading}</h3>
                    <p className="mt-2 max-w-prose leading-relaxed text-muted">{a.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal as="section">
              <SectionHeading n="05">Architecture</SectionHeading>
              <ArchitectureDiagram architecture={study.architecture} />
            </Reveal>

            <Reveal as="section">
              <SectionHeading n="06">Outcome</SectionHeading>
              <ul className="max-w-prose space-y-3">
                {study.outcome.map((o, i) => (
                  <li key={i} className="flex gap-3 leading-relaxed text-muted">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal as="section">
              <SectionHeading n="07">What I'd change</SectionHeading>
              <p className="max-w-prose border-l-2 border-accent pl-5 leading-relaxed text-ink">
                {study.retro}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </article>
  )
}
