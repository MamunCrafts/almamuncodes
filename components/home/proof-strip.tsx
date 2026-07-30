import { proof } from "@/config/site"
import { Container } from "@/components/primitives/ui"
import { Reveal } from "@/components/primitives/reveal"

export function ProofStrip() {
  return (
    <section className="border-t border-line bg-surface/40 py-14">
      <Container>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          {proof.map((p, i) => (
            <Reveal key={p.label} delay={i * 70} as="div">
              <dd className="font-display text-4xl text-ink lg:text-5xl">{p.value}</dd>
              <dt className="mt-2 max-w-[16ch] text-sm leading-snug text-muted">{p.label}</dt>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  )
}
