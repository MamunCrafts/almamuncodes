import { site, coreStack, headlineMetric, traces } from "@/config/site"
import { Container, CTA } from "@/components/primitives/ui"
import { Rail, RailItem, RailLayout } from "@/components/primitives/rail"
import { HeadlineMetric, Trace, TraceGroup } from "@/components/primitives/trace"

/**
 * The hero leads with measurement, not manifesto: a short headline, then three
 * to-scale before/after traces. A hiring manager scanning for eight seconds
 * should see evidence, and the evidence should be checkable.
 */
export function Hero() {
  return (
    <section className="bg-aurora relative">
      <Container className="pt-28 pb-16 sm:pt-32 lg:pb-24">
        <RailLayout
          rail={
            <Rail>
              <RailItem label="Status">
                <span className="inline-flex items-baseline gap-2">
                  <span className="mb-px h-1.5 w-1.5 shrink-0 self-center rounded-full bg-accent" />
                  Available · remote
                </span>
              </RailItem>
              <RailItem label="Based">
                {site.location.split(",")[0]} · {site.timezone}
              </RailItem>
              <RailItem label="Overlap">
                UK/EU AM
                <br />
                US East AM
                <br />
                AU PM
              </RailItem>
              <RailItem label="Experience">
                <span className="tnum">{site.yearsExperience}+ yrs</span> in production
              </RailItem>
              <RailItem label="Stack">
                {/* Separator travels with the word before it, so a wrapped
                    line never opens with a stray middot. */}
                <span className="flex flex-wrap gap-x-1.5 text-muted">
                  {coreStack.map((t, i) => (
                    <span key={t} className="whitespace-nowrap">
                      {t}
                      {i < coreStack.length - 1 && " ·"}
                    </span>
                  ))}
                </span>
              </RailItem>
            </Rail>
          }
        >
          <h1 className="max-w-[24ch] text-display-lg">
            I build web products end to end, then make them{" "}
            <span className="slant">measurably faster</span>.
          </h1>

          <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-muted">
            Typed React front ends, Node and NestJS APIs, and the fast, secure data layers behind
            them, for teams across the UK, US and Australia.
          </p>

          <TraceGroup
            caption="Measured on the Fanfare GraphQL API · 2022–2025"
            note="Bars show cost before and after. Shorter is better."
          >
            <HeadlineMetric {...headlineMetric} />
            <div className="grid gap-6 border-t border-line pt-7">
              {traces.map((t, i) => (
                <Trace key={t.label} {...t} delay={420 + i * 160} />
              ))}
            </div>
          </TraceGroup>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <CTA href={`mailto:${site.email}`}>Email me</CTA>
            <CTA href={site.resumeUrl} variant="ghost" external>
              Résumé
            </CTA>
          </div>
        </RailLayout>
      </Container>
    </section>
  )
}
