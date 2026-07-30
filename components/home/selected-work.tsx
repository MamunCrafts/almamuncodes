import { getAllCaseStudies } from "@/lib/case-studies"
import { Container, Eyebrow, CTA } from "@/components/primitives/ui"
import { Reveal } from "@/components/primitives/reveal"
import { CaseStudyCard } from "@/components/work/case-study-card"

export function SelectedWork() {
  const studies = getAllCaseStudies().slice(0, 3)

  return (
    <section id="work" className="scroll-mt-24 border-t border-line py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Selected work</Eyebrow>
              <h2 className="mt-4 max-w-2xl text-display-md">
                A few things I've built, and how I thought about them
              </h2>
            </div>
            <CTA href="/work" variant="ghost">All work</CTA>
          </div>
        </Reveal>

        <div className="mt-12">
          {studies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 80}>
              <CaseStudyCard study={study} index={i} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
