import type { Metadata } from "next"
import Image from "next/image"
import { site, highlights, education, credentials } from "@/config/site"
import { CredentialCard } from "@/components/credential-card"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Container, Eyebrow, CTA } from "@/components/primitives/ui"
import { Reveal } from "@/components/primitives/reveal"
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
      <main className="pt-32 pb-24 sm:pt-40">
        <Container>
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-4 max-w-3xl text-display-md">
              I got into software by trying to <span className="font-display italic text-accent">out-think</span> the problem
            </h1>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="max-w-prose space-y-5 text-lg leading-relaxed text-muted">
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

                <div className="mt-9 flex flex-wrap gap-3">
                  <CTA href={`mailto:${site.email}`}>Email me</CTA>
                  <CTA href={site.resumeUrl} variant="ghost" external>Résumé</CTA>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={80}>
                <div className="group relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[--radius] border border-line">
                  <Image
                    src="/mamun.jpg"
                    alt={site.name}
                    fill
                    sizes="320px"
                    className="object-cover grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow>Path</Eyebrow>
                <div className="mt-8">
                  <Timeline items={timeline} />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={80}>
                {/* Highlighted credentials */}
                <div className="mb-10 space-y-4">
                  <CredentialCard
                    kind="recognition"
                    title={credentials.recognition.title}
                    org={credentials.recognition.org}
                    note={credentials.recognition.note}
                  />
                  <CredentialCard
                    kind="certification"
                    title={credentials.certification.title}
                    org={credentials.certification.org}
                    url={credentials.certification.url}
                  />
                </div>

                <Eyebrow>Competitive programming</Eyebrow>
                <ul className="mt-8 divide-y divide-line rounded-[--radius] border border-line">
                  {highlights.map((h) => (
                    <li key={h.name} className="flex items-baseline justify-between gap-4 p-4">
                      <div>
                        <p className="text-sm font-medium text-ink">{h.name}</p>
                        <p className="text-sm text-muted">{h.detail}</p>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-faint">{h.year}</span>
                    </li>
                  ))}
                </ul>

                <p className="label mt-8">Education</p>
                <ul className="mt-4 divide-y divide-line rounded-[--radius] border border-line">
                  {education.map((e) => (
                    <li key={e.name} className="flex items-baseline justify-between gap-4 p-4">
                      <div>
                        <p className="text-sm font-medium text-ink">{e.name}</p>
                        <p className="text-sm text-muted">{e.org}</p>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-faint">{e.year}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
