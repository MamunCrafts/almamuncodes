import { site, coreStack } from "@/config/site"
import { Container, CTA } from "@/components/primitives/ui"

const spec: [string, string][] = [
  ["Role", site.title],
  ["Based", `${site.location.split(",")[0]} · ${site.timezone}`],
  ["Overlap", "UK/EU AM · US East AM · AU PM"],
]

export function Hero() {
  return (
    <section className="bg-noise relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />

      <Container className="pt-36 pb-20 sm:pt-44 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left: the statement */}
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="label !text-ink/80">{site.availability}</span>
            </span>

            <h1 className="mt-7 max-w-4xl text-display-lg">
              I build web products <span className="font-display italic text-accent">end to end</span>:
              {" "}front end, API, and the data that keeps them fast.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              {site.positioning} Based in {site.location} and working remotely with teams across the UK,
              US and Australia.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <CTA href={`mailto:${site.email}`}>Email me</CTA>
              <CTA href={site.resumeUrl} variant="ghost" external>
                Résumé
              </CTA>
            </div>
          </div>

          {/* Right: spec sheet for the keyword-scanning recruiter */}
          <div className="lg:col-span-4">
            <dl className="rounded-[--radius] border border-line bg-surface/60 p-5 font-mono text-sm">
              {spec.map(([k, v]) => (
                <div key={k} className="flex gap-4 border-b border-line py-2.5 first:pt-0 last:border-0 last:pb-0">
                  <dt className="w-16 shrink-0 text-faint">{k}</dt>
                  <dd className="text-ink">{v}</dd>
                </div>
              ))}
              <div className="pt-3.5">
                <dt className="mb-2 text-faint">Stack</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {coreStack.map((t) => (
                    <span key={t} className="rounded border border-line px-1.5 py-0.5 text-[11px] text-muted">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  )
}
