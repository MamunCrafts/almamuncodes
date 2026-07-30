import { skillGroups } from "@/config/site"
import { Container, Eyebrow } from "@/components/primitives/ui"
import { Reveal } from "@/components/primitives/reveal"

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-line py-20 lg:py-28">
      <Container>
        <Reveal>
          <Eyebrow>Toolkit</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-display-md">The stack I reach for</h2>
          <p className="mt-4 max-w-xl text-muted">
            Technologies I use day to day and can talk through in depth, not a checklist of
            everything I've ever touched.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[--radius] border border-line bg-line md:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 60} as="div" className="bg-bg">
              <div className="h-full p-7 lg:p-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-lg text-ink">{group.title}</h3>
                  <span className="label">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {group.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2.5 font-mono text-sm text-muted">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
