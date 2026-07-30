import type { Metadata } from "next"
import { getAllCaseStudies } from "@/lib/case-studies"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Container, Eyebrow } from "@/components/primitives/ui"
import { Reveal } from "@/components/primitives/reveal"
import { CaseStudyCard } from "@/components/work/case-study-card"

export const metadata: Metadata = {
  title: "Work",
  description: "Selected case studies: production web apps built end to end, with the engineering decisions behind them.",
}

export default function WorkPage() {
  const studies = getAllCaseStudies()

  return (
    <>
      <SiteHeader />
      <main className="pt-32 pb-24 sm:pt-40">
        <Container>
          <Reveal>
            <Eyebrow>Work</Eyebrow>
            <h1 className="mt-4 max-w-3xl text-display-md">
              Case studies: the problem, the decisions, and what I'd change
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Fewer projects, more depth. Each one covers the constraints I worked under and the
              tradeoffs I made, not just the stack.
            </p>
          </Reveal>

          <div className="mt-14">
            {studies.map((study, i) => (
              <Reveal key={study.slug} delay={i * 70}>
                <CaseStudyCard study={study} index={i} />
              </Reveal>
            ))}
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
