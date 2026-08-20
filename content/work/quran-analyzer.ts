import type { CaseStudy } from "@/lib/case-studies"

// Quran Analyzer, a login-gated Quran study workspace built at Talent Pro.
// NOTE (for the owner): this copy is reconstructed from the live app's visible
// behaviour (reading, private notes, audio recitations, accounts). Please read
// it once and correct anything that does not match how it actually works.
export const quranAnalyzer: CaseStudy = {
  slug: "quran-analyzer",
  title: "Quran Analyzer: a study workspace",
  teaser:
    "A login-gated workspace for studying the Quran: read the surahs, keep private notes against specific passages, and listen to audio recitations in one place.",
  cover: "/project-quran-analyzer.png",
  meta: {
    role: "Full-Stack Developer",
    team: "3 people",
    stack: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB"],
    links: [],
  },
  context:
    "Quran Analyzer is a study tool built at Talent Pro. Most Quran apps are built for reading; this one is built for studying, so a signed-in reader can move through the surahs, keep their own notes against specific passages, and listen to audio recitations in the same place. I worked on it full-stack as part of a team of three.",
  problem:
    "Reading and studying are different jobs. A plain reader gets you through the text; studying means returning to the same passages, keeping your own notes on them, and hearing them recited. The real work is stitching those three things (the text, a person's private notes, and audio) into one place that stays in sync per account.",
  constraints: [
    "Everything is per-account and private, so the app is login-gated and a user's notes and progress have to stay tied to them across sessions and devices.",
    "Audio recitations are large files, so they have to stream and load on demand rather than ship with the page.",
    "The text is fixed and structured by surah and verse, so notes and audio need to anchor to a specific verse reliably.",
  ],
  approach: [
    {
      heading: "Anchor everything to the verse",
      body: "Modelled the content by surah and verse so a note or an audio position points at an exact place in the text. That keeps a person's notes stable even as the interface around them changes.",
    },
    {
      heading: "Keep the reading surface fast",
      body: "Built the reader in Next.js and load audio on demand rather than up front, so opening a surah stays quick and the heavy recitation files only download when someone presses play.",
    },
    {
      heading: "Private by default",
      body: "Put the whole workspace behind authentication, with each person's notes and reading progress stored against their account so they pick up where they left off on any device.",
    },
  ],
  architecture: {
    caption:
      "A login-gated Next.js reader talks to a Node API for a user's notes and reading progress in MongoDB, and streams audio recitations on demand.",
    nodes: [
      { id: "ui", label: "Next.js reader", kind: "client" },
      { id: "api", label: "Node API (auth)", kind: "service" },
      { id: "mongo", label: "MongoDB (users, notes)", kind: "datastore" },
      { id: "audio", label: "Audio recitations", kind: "external" },
    ],
    edges: [
      { from: "ui", to: "api", label: "signed-in requests" },
      { from: "api", to: "mongo", label: "notes · progress" },
      { from: "ui", to: "audio", label: "stream on play" },
    ],
  },
  outcome: [
    "Brought reading, private notes and audio recitation into one place, instead of juggling a reader, a notes app and a separate player.",
    "Notes and reading progress persist per account, so a person's study carries across sessions and devices.",
    "Audio loads on demand, so the reader stays quick even though the recitation files are large.",
  ],
  retro:
    "I'd give the notes some structure instead of leaving them free-form: tags, or references between passages, so a user can find their own notes again once there are a lot of them. I'd also make the audio more forgiving on poor connections, with clearer loading and less chance of dropping out mid-recitation.",
  order: 5,
}
