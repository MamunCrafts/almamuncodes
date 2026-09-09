import { Braces, Cloud, Database, MessagesSquare, Server, ShieldCheck } from "lucide-react"
import { skillGroups } from "@/config/site"
import { Container, Eyebrow } from "@/components/primitives/ui"

// Category icons describe each layer without depending on its position in the list.
const categoryIcons = {
  Frontend: Braces,
  Backend: Server,
  Databases: Database,
  "Cloud & DevOps": Cloud,
  Testing: ShieldCheck,
  "Remote & process": MessagesSquare,
}

export function Skills() {
  return (
    <section id="skills" className="skills-studio scroll-mt-24 border-t border-line py-20 lg:py-28" aria-labelledby="skills-title">
      <Container>
        {/* Keep the introduction outside the dimensional panels. */}
        <div>
          <Eyebrow>Toolkit</Eyebrow>
          <h2 id="skills-title" className="mt-4 max-w-2xl text-display-md">The stack I reach for</h2>
          <p className="mt-4 max-w-xl text-muted">
            Technologies I use day to day and can talk through in depth, not a checklist of
            everything I've ever touched.
          </p>
        </div>

        {/* Static semantic lists remain readable without scripts or hover. */}
        <div className="skills-platform-grid">
          {skillGroups.map((group) => {
            const Icon = categoryIcons[group.title as keyof typeof categoryIcons] ?? Braces
            return (
              <div key={group.title} className="skills-platform-stage">
                <article className="skills-platform">
                  <div className="skills-platform-heading">
                    <span className="skills-platform-icon"><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span>
                    <h3>{group.title}</h3>
                  </div>
                  <ul className="skills-platform-list">
                    {group.skills.map((skill) => (
                      <li key={skill} className="skills-key">{skill}</li>
                    ))}
                  </ul>
                  <div className="skills-platform-foot" aria-hidden="true"><span /><span /><span /></div>
                </article>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
