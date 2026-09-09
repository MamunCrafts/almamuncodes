import type { Metadata } from "next"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { getAllCaseStudies } from "@/lib/case-studies"
import { site } from "@/config/site"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Container } from "@/components/primitives/ui"
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
      <main className="work-gallery-page">
        <Container>
          {/* A concise introduction frames the portfolio around real engineering work. */}
          <section className="work-gallery-intro" aria-labelledby="work-title">
            <div>
              <p className="work-gallery-kicker"><span />Selected projects</p>
              <h1 id="work-title">Built for the<br />real world.</h1>
              <p className="work-gallery-description">Products, platforms, and the decisions behind them. A closer look at the problems I solved, the tradeoffs I made, and what I’d improve next.</p>
              <a href="#projects" className="work-gallery-jump">Explore {studies.length} case studies <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
            <div className="work-file-stack" aria-hidden="true">
              <div className="work-file work-file-back"><span>Data & integrations</span></div>
              <div className="work-file work-file-middle"><span>APIs & infrastructure</span></div>
              <div className="work-file work-file-front">
                <span className="work-file-tab">From idea to production</span>
                <span className="work-file-title">The work<br />behind the screen.</span>
                <span className="work-file-rule" /><span className="work-file-rule" />
                <span className="work-file-footer">Web products, end to end.<ArrowUpRight size={22} /></span>
              </div>
            </div>
          </section>

          {/* The leading project gets a wide panel; the remaining cases form a gallery. */}
          <section id="projects" className="work-gallery" aria-label="Project case studies">
            <div className="work-gallery-divider"><span>Inside the projects</span><span>{studies.length} case studies</span></div>
            <div className="work-gallery-grid">
              {studies.map((study, index) => (
                <div key={study.slug} className={index === 0 ? "work-gallery-item work-gallery-featured" : "work-gallery-item"}>
                  <CaseStudyCard study={study} index={index} dimensional headingLevel="h2" />
                </div>
              ))}
            </div>
          </section>

          {/* A short closing invitation gives readers a next step after the case studies. */}
          <section className="work-gallery-contact" aria-labelledby="work-contact-title">
            <div><p className="text-sm text-muted">Have something in mind?</p><h2 id="work-contact-title">Let’s build what’s next.</h2></div>
            <a href={`mailto:${site.email}`} className="contact-primary">Talk about your project <ArrowUpRight size={18} aria-hidden="true" /></a>
          </section>
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
