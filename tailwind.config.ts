import type { Config } from "tailwindcss"

const config: Config = {
  // The site has no `.dark` class; mode lives on <html data-mode="dark|light">.
  darkMode: ["selector", '[data-mode="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts}",
    "./content/**/*.{js,ts}",
    "./lib/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        raised: "var(--raised)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        line: "var(--line)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        "accent-weak": "var(--accent-weak)",
        // The data pair. Reserved for measured values - see globals.css.
        slow: "var(--slow)",
        fast: "var(--fast)",
        // Role-split tokens - see the header comment in app/globals.css.
        // `accent`/`slow`/`fast` are FILLS; `accent-text` and `slow`/`fast` as
        // text have their own values because one mid-tone cannot do both.
        "accent-text": "var(--accent-text)",
        "slow-fill": "var(--slow-fill)",
        "fast-fill": "var(--fast-fill)",
        "accent-2": "var(--accent-2)",
        tint: "var(--tint)",
        "glow-1": "var(--glow-1)",
        "glow-2": "var(--glow-2)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Restrained display scale. The old top end (5rem) let the hero eat a
        // whole viewport; the trace block is the hero's subject now, not the type.
        "display-lg": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.625rem, 3vw, 2.375rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.25rem, 2vw, 1.625rem)", { lineHeight: "1.15", letterSpacing: "-0.005em" }],
      },
      maxWidth: {
        prose: "68ch",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        // The signature: a trace bar drawing itself to its measured width.
        "trace-in": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "trace-in": "trace-in 0.9s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
}
export default config
