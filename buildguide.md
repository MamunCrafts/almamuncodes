# Portfolio Build Prompt

Paste everything below the line into Claude, Cursor, v0, or Lovable. Fill the `[BRACKETS]` first, delete anything that does not apply.

---




## ROLE

You are a senior frontend engineer and product designer. You build production-grade Next.js applications with strong visual identity. You write clean, typed, maintainable code and you do not ship placeholder junk.

## OBJECTIVE

Build a personal portfolio website for a senior full-stack engineer whose primary goal is landing **senior remote contract or full-time roles with companies in the US, EU, UK, Canada, Australia, Singapore, and the Gulf**.

The site has one job: make a hiring manager or technical founder who has 90 seconds decide to send a message. Every section either supports that decision or gets cut.

## ABOUT THE PERSON

- **Name:** [FULL NAME]
- **Title:** Senior Software Engineer
- **Location:** [CITY, COUNTRY] - works remotely across [TIMEZONE OVERLAP, e.g. "4+ hours overlap with EST, full overlap with CET"]
- **Years of experience:** [N]
- **Core stack:** TypeScript, Node.js, NestJS, React, Next.js, PostgreSQL, MongoDB, Redis/BullMQ, Docker
- **Specialisms:** [e.g. backend architecture, distributed systems, ERP and fintech domain work, event-driven systems, multi-tenant SaaS]
- **Certifications:** [e.g. MongoDB Certified Associate Developer]
- **Notable background:** [e.g. competitive programming, ranked 5th nationally at IEEE Xtreme 14.0, 600+ Codeforces problems solved]
- **Links:** GitHub `[URL]`, LinkedIn `[URL]`, Email `[EMAIL]`, Resume PDF `[PATH]`

## TARGET AUDIENCE

Three readers, in priority order:

1. **Technical hiring manager / CTO** - wants proof of depth. Scans for architecture decisions, scale, and whether this person has shipped hard things.
2. **Technical recruiter** - scans for stack keywords, seniority signals, availability, and how to contact.
3. **Founder hiring a contractor** - wants to know what problems get solved and how fast.

Write for reader 1. Readers 2 and 3 are served by clear structure and an obvious contact path.

## TECH REQUIREMENTS

- Next.js 15 (App Router), TypeScript strict mode
- Tailwind CSS v4
- No heavyweight UI kit. Build the components. Use `lucide-react` for icons only.
- MDX for case study content, loaded from local files. No CMS, no database.
- `next/font` for fonts, `next/image` for images
- Motion (`motion/react`) for animation, used sparingly and only where it earns attention
- Deployable to Vercel with zero configuration
- Static generation for every page

## SITE STRUCTURE

```
/                    Home
/work                Case study index
/work/[slug]         Individual case study
/about               Long-form background
/uses                Tools and setup (optional, only if it fits the design)
```

Skip a blog unless posts already exist. An empty blog is a negative signal.

## PAGE SPECS

### Home

**Hero.** Name, one-line positioning statement, availability status. The positioning line must be concrete and specific, not "passionate developer who loves clean code." Model it on: *"I build the backend systems that handle money, inventory, and everything else that cannot silently fail."* One primary CTA (email or call booking), one secondary (resume download). Availability shown as a small live-looking badge, for example "Available for contract work from [MONTH]."

**Selected work.** Three case studies maximum, as cards. Each card shows title, one-sentence problem framing, the stack as small tags, and one hard metric. Not a grid of twelve repos.

**Proof strip.** Something quantified and scannable. Examples: years shipping production systems, uptime maintained, request volume handled, team size led, cost reduction delivered. Four items maximum. Use real numbers or delete the section.

**Capabilities.** Three or four columns describing what gets delivered, framed as outcomes, not tool lists. "Backend architecture that survives the second year" beats "NestJS, TypeORM, PostgreSQL." Put the tool names underneath as small text.

**Contact.** Direct email, response time expectation, timezone, and how the person prefers to start a conversation.

### Case study page

This is the most important page on the site. Structure each one as:

1. **Context** - the company, the domain, the team size, the person's role
2. **Problem** - what was broken or missing, stated in business terms
3. **Constraints** - legacy code, deadline, team skill, budget, compliance
4. **Approach** - the actual engineering decisions, with the tradeoffs made explicit
5. **Architecture** - one clear diagram, described in a way the AI can render as SVG or as a labeled flow
6. **Outcome** - numbers where possible, honest qualitative results where not
7. **What I would change** - one short paragraph of retrospective. This single section separates senior candidates from everyone else.

Include a right-hand sticky sidebar on desktop with role, duration, stack, and team size. Collapse it to a card above the content on mobile.

### About

Long-form, first person, written like a person and not a LinkedIn summary. Cover: how the person got into engineering, what kinds of problems they gravitate toward, how they work with teams, and what they are looking for next. Include a short timeline component. End with a personal note that is not about code.

## DESIGN DIRECTION

Pick **one** clear aesthetic and execute it fully. Do not blend three.

Suggested direction, override if you have a stronger idea: **technical editorial.** Dark base, high contrast, generous whitespace, a monospace accent face used for metadata and labels, a refined serif or a characterful grotesque for headings, a clean sans for body. One saturated accent colour used with discipline. Think engineering documentation crossed with a design magazine.

Rules:

- No purple-to-blue gradients on white. No Inter. No Space Grotesk. No glassmorphism cards.
- Typography carries the design. Pair a distinctive display face with a highly readable body face and load both through `next/font`.
- Use a real type scale and stick to it. Same for spacing.
- Asymmetry over centered stacks. Let something break the grid.
- Add texture: subtle noise overlay, a fine grid, or a gradient mesh. Avoid flat solid backgrounds everywhere.
- Motion: one well-staggered page load reveal, meaningful hover states, and scroll-triggered reveals on case study sections. Respect `prefers-reduced-motion`.
- Dark mode is the default. Light mode optional, only if it looks as good.

## TECHNICAL QUALITY BAR

- Lighthouse: 95+ on performance, accessibility, best practices, SEO
- Full `metadata` export per route, including OpenGraph and Twitter cards
- Dynamic OG image generation with `next/og`
- `sitemap.ts` and `robots.ts`
- JSON-LD `Person` schema on the home page
- Semantic HTML, proper heading hierarchy, visible focus states, keyboard navigable throughout
- Colour contrast at WCAG AA minimum
- Zero layout shift, all images sized
- No console errors or warnings on any route

## CODE QUALITY BAR

- Feature-based folder structure, not one giant `components` dump
- Every component typed with explicit prop interfaces, no `any`
- Content and config separated from presentation. Site data lives in a typed `config/site.ts`, case studies in MDX with typed frontmatter validated by Zod.
- Components composable and reusable, no copy-paste variants
- Server Components by default, `"use client"` only where interaction actually requires it
- Named exports, sensible file naming, no default-export-everything

## DELIVERABLES

Build the full project. Return:

1. Complete file tree
2. All source files with full contents
3. `config/site.ts` populated with the details above
4. Two complete example case studies in MDX, written from the background provided, showing the depth expected
5. `README.md` covering local setup, how to add a case study, and how to deploy
6. A short list of the design decisions made and why

## WHAT TO AVOID

- Generic hero copy, "passionate about," "results-driven," "I love building things"
- Skill bars, star ratings, or percentage-based proficiency indicators
- A wall of technology logos
- Testimonials that are not real
- Contact forms that need a backend. Use a `mailto:` link or link to a booking page.
- Lorem ipsum anywhere. Write real copy from the background provided and mark any gaps with a clear `TODO:` comment.
- Templated AI look. If it resembles the default of every portfolio generator, redo the design pass.

## PROCESS

Before writing code, output:

1. The aesthetic direction chosen, in two or three sentences
2. Font pairing and the reasoning
3. Colour palette as CSS custom properties
4. The information architecture

Wait for approval on those, then build.
