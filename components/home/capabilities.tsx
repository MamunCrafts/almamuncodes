import { capabilities } from "@/config/site"
import { Container, Eyebrow } from "@/components/primitives/ui"
import { Reveal } from "@/components/primitives/reveal"

export function Capabilities() {
  return (
    <section className="border-t border-line py-20 lg:py-28">
      <Container>
        <Reveal>
          <Eyebrow>What I deliver</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-display-md">Outcomes, not a list of logos</h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[--radius] border border-line bg-line sm:grid-cols-2">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 60} as="div" className="bg-bg">
              <div className="flex h-full flex-col p-7 lg:p-9">
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-display-sm">{cap.title}</h3>
                <p className="mt-3 flex-1 text-muted">{cap.body}</p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {cap.tools.map((t) => (
                    <span key={t} className="font-mono text-[11px] text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
