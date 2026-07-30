import { credentials } from "@/config/site"
import { Container, Eyebrow } from "@/components/primitives/ui"
import { Reveal } from "@/components/primitives/reveal"
import { CredentialCard } from "@/components/credential-card"

export function Credentials() {
  return (
    <section id="credentials" className="scroll-mt-24 border-t border-line py-20 lg:py-28">
      <Container>
        <Reveal>
          <Eyebrow>Credentials</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-display-md">Recognition &amp; certification</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Reveal>
            <CredentialCard
              kind="recognition"
              title={credentials.recognition.title}
              org={credentials.recognition.org}
              note={credentials.recognition.note}
            />
          </Reveal>
          <Reveal delay={80}>
            <CredentialCard
              kind="certification"
              title={credentials.certification.title}
              org={credentials.certification.org}
              url={credentials.certification.url}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
