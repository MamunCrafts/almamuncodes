import Link from "next/link"
import { ArrowUpRight, Clock3, Github, Linkedin, MapPin, Phone } from "lucide-react"
import { site } from "@/config/site"
import { Container } from "@/components/primitives/ui"
import { CopyEmail } from "@/components/home/copy-email"

export function Contact() {
  return (
    <section id="contact" className="contact-studio scroll-mt-24 border-t border-line" aria-labelledby="contact-title">
      <Container>
        <div className="contact-stage">
          <div className="contact-sculpture">
            {/* A clear invitation stays separate from the decorative envelope. */}
            <div className="contact-intro-grid">
              <div className="contact-intro">
                <p className="contact-availability"><span aria-hidden="true" />Open to remote opportunities</p>
                <h2 id="contact-title">Good work starts<br />with a conversation.</h2>
                <p className="contact-description">
                  Have a product to build or a team to grow? Let’s talk about it.
                  I work with teams in the UK, US and Australia. Contract or full-time, both welcome.
                </p>
                <a href={`mailto:${site.email}?subject=Let%E2%80%99s%20work%20together`} className="contact-primary">
                  Start a conversation <ArrowUpRight size={19} aria-hidden="true" />
                </a>
              </div>

              {/* CSS surfaces create an envelope without adding image assets or animation code. */}
              <div className="contact-envelope-scene" aria-hidden="true">
                <div className="contact-envelope-orbit" />
                <div className="contact-envelope">
                  <div className="contact-letter">
                    <span className="contact-letter-mark">Hello<span>.</span></span>
                    <span className="contact-letter-line" /><span className="contact-letter-line" />
                    <span className="contact-letter-signature">Let’s build something good.</span>
                  </div>
                  <div className="contact-envelope-back" />
                  <div className="contact-envelope-front" />
                  <div className="contact-envelope-seal"><ArrowUpRight size={30} strokeWidth={1.5} /></div>
                </div>
                <span className="contact-reply-tag"><Clock3 size={15} />A reply within a day</span>
              </div>
            </div>

            {/* The inset contact dock keeps all real actions available on every screen. */}
            <div className="contact-dock">
              <div className="contact-email-block">
                <p className="mb-3 text-sm text-muted">Prefer to reach out directly?</p>
                <CopyEmail email={site.email} />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="contact-phone"><Phone size={14} aria-hidden="true" />{site.phone}</a>
              </div>
              <div className="contact-links">
                <Link href={site.resumeUrl} target="_blank" rel="noopener noreferrer" className="contact-resume">Download résumé <ArrowUpRight size={17} aria-hidden="true" /></Link>
                <div className="contact-socials">
                  <Link href={site.socials.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} aria-hidden="true" />LinkedIn</Link>
                  <Link href={site.socials.github} target="_blank" rel="noopener noreferrer"><Github size={17} aria-hidden="true" />GitHub</Link>
                </div>
              </div>
            </div>

            {/* Working details are readable text rather than part of the illustration. */}
            <dl className="contact-details">
              <div><dt><MapPin size={14} aria-hidden="true" />Based in</dt><dd>{site.location} · {site.timezone}</dd></div>
              <div><dt>Working overlap</dt><dd>UK/EU AM · US East AM · AU PM</dd></div>
              <div><dt><Clock3 size={14} aria-hidden="true" />Response time</dt><dd>Within a day</dd></div>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  )
}
