import type { Metadata } from "next"
import Image from "next/image"
import { site, highlights, education, credentials } from "@/config/site"
import { CredentialCard } from "@/components/credential-card"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Container, CTA } from "@/components/primitives/ui"
import { ArrowUpRight, Braces, GraduationCap, MapPin, Trophy } from "lucide-react"
import { Timeline, type TimelineItem } from "@/components/about/timeline"

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, a full-stack developer from Dhaka who came into software through competitive programming.`,
}

// Reverse-chronological: most recent first.
const timeline: TimelineItem[] = [
  {
    period: "2026–Present",
    title: "Senior Software Developer · Talent Pro",
    detail:
      "Five engineers report to me on a team of 20. I own architecture decisions on new services, run code reviews, and mentor on testing and API design. Rebuilt chat in-house on WebSockets after Firestore's per-operation billing made cost scale with engagement.",
  },
  {
    period: "2023–2026",
    title: "Software Developer · Talent Pro",
    detail:
      "Owned the GraphQL API and data layer behind Fanfare: schema, feed, notifications, Redis caching, and the transcoding pipeline at ~1,000 video uploads a day. Diagnosed endpoints exceeding five seconds with explain() and fixed the collection scans behind them.",
  },
  {
    period: "2023",
    title: "Junior Software Developer · Talent Pro",
    detail:
      "Shipped front-end features and built a library of responsive, reusable components. Wrote GraphQL APIs that simplified data fetching for the rest of the team, and worked with the database team on query optimisation.",
  },
  {
    period: "2022–2023",
    title: "Software Developer, Intern · Talent Pro",
    detail:
      "Internship that converted into a full-time role. Shipped React and Next.js features, wrote supporting Node.js endpoints, and picked up the team's code review, testing and Git workflow from the first week.",
  },
  {
    period: "2017–2022",
    title: "B.Sc. in Information & Communication Engineering · University of Rajshahi",
    detail:
      "Led the ICE department's competitive-programming team. Ranked 5th in Bangladesh at IEEE Xtreme 14.0, and solved 600+ problems on Codeforces.",
  },
]

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="about-studio">
        <Container>
          {/* The profile pairs a direct introduction with a dimensional portrait. */}
          <section className="about-hero" aria-labelledby="about-title">
            <div className="about-introduction">
              <p className="about-kicker">A little about me</p>
              <h1 id="about-title">Problem solver.<br />Product builder.</h1>
              <p className="about-lead">I’m {site.shortName}, a full-stack developer in {site.location}. I turn complicated problems into software that’s clear, useful, and built to last.</p>
              <p className="about-role">{site.title} · {site.yearsExperience}+ years in production</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTA href={`mailto:${site.email}`} className="studio-button">Let’s talk</CTA>
                <CTA href={site.resumeUrl} variant="ghost" external>Download résumé</CTA>
              </div>
            </div>
            {/* One upright portrait keeps the photo and profile details together. */}
            <figure className="about-profile-stage about-profile-card">
              <div className="about-portrait">
                <Image src="/mamun.jpg" alt={site.name} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 340px, 90vw" priority className="object-cover object-top" />
              </div>
              <figcaption className="about-profile-caption">
                <p className="about-profile-name">{site.name}</p>
                <p className="about-profile-location"><MapPin size={15} aria-hidden="true" />{site.location}</p>
                <p className="about-profile-status"><span aria-hidden="true" />Available for remote work</p>
              </figcaption>
            </figure>
          </section>

          {/* Existing achievements give the introduction concrete supporting evidence. */}
          <dl className="about-facts">
            <div><dt>Production experience</dt><dd>{site.yearsExperience}+ <span>years building web products</span></dd></div>
            <div><dt>Fanfare GraphQL API</dt><dd>2× <span>API throughput after optimisation</span></dd></div>
            <div><dt>Competitive programming</dt><dd>600+ <span>problems solved on Codeforces</span></dd></div>
          </dl>

          {/* Preserve the full personal story instead of replacing it with generic copy. */}
          <section className="about-story" aria-labelledby="about-story-title">
            <div className="about-story-heading"><span className="about-section-icon"><Braces size={25} aria-hidden="true" /></span><p className="about-kicker">How I got here</p><h2 id="about-story-title">It started with{" "}<br />a good problem.</h2><p className="about-story-note">From timed contests to production systems.</p></div>
            <div className="about-prose">
                  <p>
                    I'm {site.shortName}, a full-stack developer based in {site.location}. My way into
                    software wasn't a bootcamp or a framework tutorial; it was competitive
                    programming at university. Timed contests, a blank editor, and a problem that
                    doesn't care how you feel about it. That's still the part of the job I like most:
                    taking something vague and stubborn and reducing it to a small, testable core.
                  </p>
                  <p>
                    Over the last {site.yearsExperience}+ years I've carried that habit into
                    production work: building typed React and Next.js front ends, Node and NestJS
                    APIs, and the Postgres/Mongo/Redis layers behind them. I gravitate toward the
                    parts other people find fiddly: the N+1 query hiding in a feed, the cache that's
                    lying about its freshness, the schema that'll be painful to change next year.
                    Along the way I doubled API throughput on Fanfare, the social commerce product I
                    work on at Talent Pro, and was recognised with a Tech Genius award for
                    collaboration and innovation.
                  </p>
                  <p>
                    I work well async and write things down, which is what makes remote across time
                    zones actually work rather than just sound nice. I'm looking for a remote role,
                    contract or full-time, with a team in the UK, US or Australia where I can own
                    features end to end and be trusted with the hard ones.
                  </p>
                  <p className="text-ink">
                    Away from the keyboard: still a sucker for a good problem, the kind on a
                    whiteboard or a chessboard, not just a ticket.
                  </p>
            </div>
          </section>

          {/* Career entries remain chronological; supporting achievements sit alongside them. */}
          <div className="about-career-grid">
            <section aria-labelledby="about-career-title">
              <p className="about-kicker">The path so far</p>
              <h2 id="about-career-title" className="about-section-title">Growing with the work.</h2>
              <div className="about-timeline"><Timeline items={timeline} /></div>
            </section>
            <div className="about-background">
              <section className="about-detail-card" aria-labelledby="about-contests-title">
                <span className="about-section-icon"><Trophy size={24} aria-hidden="true" /></span>
                <h2 id="about-contests-title">Competitive programming</h2>
                <ul>{highlights.map((highlight) => <li key={highlight.name}><span className="about-detail-year">{highlight.year}</span><h3>{highlight.name}</h3><p>{highlight.detail}</p></li>)}</ul>
              </section>
              <section className="about-detail-card" aria-labelledby="about-education-title">
                <span className="about-section-icon"><GraduationCap size={24} aria-hidden="true" /></span>
                <h2 id="about-education-title">Education</h2>
                <ul>{education.map((item) => <li key={item.name}><span className="about-detail-year">{item.year}</span><h3>{item.name}</h3><p>{item.org}</p></li>)}</ul>
              </section>
            </div>
          </div>

          {/* Reuse the shared credential styling, including MongoDB's green accents. */}
          <section className="about-credentials" aria-labelledby="about-credentials-title">
            <h2 id="about-credentials-title" className="about-section-title">Recognition &amp; certification</h2>
            <div className="about-credentials-grid">
              <CredentialCard kind="recognition" title={credentials.recognition.title} org={credentials.recognition.org} note={credentials.recognition.note} />
              <CredentialCard kind="certification" title={credentials.certification.title} org={credentials.certification.org} url={credentials.certification.url} />
            </div>
          </section>

          {/* Close with a direct route from the biography to the actual work. */}
          <section className="about-next-step" aria-labelledby="about-next-title">
            <div><p className="about-kicker">The story continues in the work</p><h2 id="about-next-title">See what I’ve built.</h2></div>
            <CTA href="/work" className="studio-button">Explore the projects <ArrowUpRight size={18} aria-hidden="true" /></CTA>
          </section>
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
