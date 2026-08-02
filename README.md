# Md. Al Mamun Mim — Portfolio

Personal portfolio for a senior full-stack developer targeting remote roles in the UK, US and Australia. It is a fast, static, multi-page site: a home page, a case-study index, individual case studies, and an about page.

The whole site is **content-driven from a few typed files** — you rarely touch components to update it.

- **Live:** https://almamun.codes
- **Design:** warm technical-editorial, dark theme, one tangerine accent (MongoDB-green used only on the certification card)

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| UI | React 19.2 |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Icons | lucide-react |
| Content validation | Zod |
| Fonts | `next/font` — Fraunces (display), Hanken Grotesk (body), JetBrains Mono (labels) |
| Analytics | PostHog (optional, only runs if a key is set) |
| Hosting | Vercel (zero-config, fully static) |

No CMS, no database. Case studies are typed TypeScript modules validated by Zod. Contact is `mailto:` — there is no backend form.

**Requirements:** Node.js `>= 20.9` (Next 16 minimum) and Yarn.

---

## Getting started

```bash
yarn install       # install dependencies
yarn dev           # start the dev server at http://localhost:3000
yarn build         # production build (Turbopack)
yarn start         # serve the production build
yarn typecheck     # tsc --noEmit
```

### Environment variables (optional)

Analytics is off unless a key is present. To enable PostHog, copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then set your PostHog key:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

---

## Project structure

```
app/
  layout.tsx            Root layout: fonts, metadata, JSON-LD Person
  page.tsx              Home (hero, proof, work, capabilities, skills, credentials, contact)
  work/page.tsx         Case-study index
  work/[slug]/page.tsx  Individual case study (static per slug)
  about/page.tsx        Long-form about + timeline + credentials
  opengraph-image.tsx   Generated 1200x630 social image (from config)
  twitter-image.tsx     Reuses the OG image
  icon.tsx              Generated favicon (tangerine "M")
  apple-icon.tsx        Generated iOS icon
  sitemap.ts / robots.ts
  globals.css           Design tokens + base styles

config/
  site.ts               SINGLE SOURCE OF TRUTH: identity, contact, skills,
                        proof, capabilities, credentials, education, highlights

content/
  work/*.ts             One typed case study per file

lib/
  case-studies.ts       Zod schema + registry for case studies

components/
  layout/               site-header, site-footer
  home/                 hero, proof-strip, selected-work, capabilities,
                        skills, credentials, contact, copy-email
  work/                 case-study-card, case-study-view, architecture-diagram
  about/                timeline
  primitives/           reveal (scroll animation), ui (Container, CTA, Eyebrow)
  credential-card.tsx   Shared award/certification card
```

---

## Editing content

**Almost everything lives in `config/site.ts`.** Change your name, title, email, phone,
socials, skills, proof stats, capabilities, credentials, education, or highlights there
and it propagates across the whole site — including the header, footer, generated social
image, and structured data.

---

## Adding a case study

Case studies are typed data, validated at build time by Zod. To add one:

1. **Create** `content/work/<slug>.ts`:

   ```ts
   import type { CaseStudy } from "@/lib/case-studies"

   export const mySlug: CaseStudy = {
     slug: "my-slug",
     title: "Project: what it is",
     teaser: "One sentence framing the problem.",
     metric: { value: "2×", label: "throughput" }, // one hard number
     cover: "/some-image.png",                       // used for the share image
     year: "2025",
     meta: {
       role: "Full-Stack Developer",
       duration: "2024–2025",
       team: "Small team",
       stack: ["Next.js", "NestJS", "PostgreSQL"],
       links: [{ label: "Live", href: "https://…" }], // [] if none
     },
     context: "Company, domain, your role.",
     problem: "What was broken or missing, in business terms.",
     constraints: ["…", "…"],
     approach: [{ heading: "…", body: "…" }],
     architecture: {
       caption: "One-line description of the diagram.",
       nodes: [{ id: "ui", label: "Next.js UI", kind: "client" }],   // kind: client | service | datastore | external
       edges: [{ from: "ui", to: "api", label: "requests" }],
     },
     outcome: ["Result with a number where possible."],
     retro: "What you would change — the senior differentiator.",
     order: 4, // lower shows first; home shows the top 3
   }
   ```

2. **Register** it in `lib/case-studies.ts`:

   ```ts
   import { mySlug } from "@/content/work/my-slug"
   const registry = z.array(caseStudySchema).parse([dgihub, fanfare, quranAnalyzer, mySlug])
   ```

The `/work/<slug>` page, the `/work` index, the home "Selected work" list (top 3 by `order`),
and the sitemap all update automatically. If a field is wrong or missing, the Zod parse
fails the build with a clear message.

> The architecture diagram renders from `nodes`/`edges` as a labeled flow — you don't draw SVG by hand.

---

## Customizing the design

- **Colors / theme:** edit the CSS custom properties at the top of `app/globals.css`
  (`--bg`, `--ink`, `--accent`, etc.). Everything reads from these.
- **Fonts:** swap the `next/font` imports in `app/layout.tsx`.
- **Favicon / social image:** edit `app/icon.tsx`, `app/apple-icon.tsx`, and
  `app/opengraph-image.tsx`. They are generated from code and rebuild automatically —
  no image files to maintain.
- **Motion:** scroll reveals use `components/primitives/reveal.tsx` and respect
  `prefers-reduced-motion`.

---

## Deployment

Deploys to **Vercel** with zero configuration:

1. Push the repo to GitHub.
2. Import it in Vercel and deploy. Every route is statically generated.
3. Add the `NEXT_PUBLIC_POSTHOG_*` env vars in the Vercel dashboard if you want analytics.

`yarn build` also produces a standalone static output you can host anywhere that serves a Next.js app.

---

## TODO

- [ ] Host an ATS-friendly résumé PDF at `/public/resume.pdf` and point `site.resumeUrl` to it.
- [ ] Add a Cal.com / Calendly link as `site.bookingUrl` to enable "Book a call".
- [ ] Confirm DgiHub's dates and team size in `content/work/dgihub.ts`.
- [ ] Replace the DgiHub cover placeholder with a real screenshot.
```
