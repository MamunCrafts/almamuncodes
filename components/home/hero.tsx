import { site, coreStack, headlineMetric, traces } from "@/config/site"
import { Container, CTA } from "@/components/primitives/ui"
import { HeadlineMetric, Trace } from "@/components/primitives/trace"
import { EngineeringScene } from "@/components/home/engineering-scene"

// A product stack introduces the work; measured results have their own section.
export function Hero() {
  return (
    <section className="studio-hero" aria-labelledby="hero-title">
      <Container className="pt-28 sm:pt-36">
        <div className="studio-hero-layout">
          {/* Introduction and actions stay readable outside the 3D scene. */}
          <div className="studio-intro">
            <p className="mb-7 flex items-center gap-2 text-sm text-muted">
              <span className="h-2 w-2 rounded-full bg-fast-fill" />
              Available for remote work
            </p>
            <h1 id="hero-title" className="studio-title">Web products,<br />built end to end.</h1>
            <p className="mt-7 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              I’m {site.shortName}. I build React interfaces, NestJS APIs, and the data layers
              behind them, and make them measurably faster.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTA href="#work" className="studio-button">View my work</CTA>
              <CTA href={`mailto:${site.email}`} variant="ghost">Email me</CTA>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted">
              <span>{site.yearsExperience}+ years in production</span>
              <span>{site.location.split(",")[0]} · {site.timezone}</span>
              <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">Résumé</a>
            </div>
          </div>
          <EngineeringScene />
        </div>

        {/* Preserve the stack and working hours for hiring teams. */}
        <div className="studio-stack-strip">
          <p className="text-sm text-ink">From interface to infrastructure</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted" aria-label="Core technologies">
            {coreStack.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </div>
        <p className="pb-8 text-sm text-muted">Remote overlap: UK/EU mornings, US East mornings, Australia afternoons.</p>

        {/* Original measurements retain their source and proportional bars. */}
        <figure className="studio-proof">
          <div>
            <figcaption className="mb-5 text-sm text-muted">Measured on the Fanfare GraphQL API · 2022–2025</figcaption>
            <HeadlineMetric {...headlineMetric} />
          </div>
          <div className="grid gap-5">
            {traces.map((trace) => <Trace key={trace.label} {...trace} />)}
            <p className="text-sm text-muted">Cost before and after. Shorter is better.</p>
          </div>
        </figure>
      </Container>
    </section>
  )
}
