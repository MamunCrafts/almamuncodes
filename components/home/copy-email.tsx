"use client"

import { useState } from "react"
import { ArrowUpRight, Check, Copy } from "lucide-react"

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable; the mailto link below still works */
    }
  }

  // Note on the color-mix hover: Tailwind cannot apply an opacity modifier to a
  // colour declared as a bare var(), so `hover:bg-accent/90` compiles to
  // nothing at all and the hover state silently disappears. color-mix() keeps
  // the intent (a slightly dimmed accent) and stays token-driven in every mode.
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-[--radius] border border-line bg-bg p-3 sm:flex">
      <a
        href={`mailto:${email}?subject=Remote%20role`}
        className="link-underline col-span-2 min-w-0 flex-1 break-all font-mono text-sm leading-relaxed text-ink"
      >
        {email}
      </a>

      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        className="inline-flex h-10 shrink-0 justify-self-start items-center gap-1.5 rounded-[calc(var(--radius)-2px)] border border-line px-3 text-sm text-muted transition-colors hover:border-faint hover:text-ink"
      >
        {copied ? <Check className="h-4 w-4 text-accent-text" /> : <Copy className="h-4 w-4" />}
        <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
      </button>

      <a
        href={`mailto:${email}?subject=Remote%20role`}
        aria-label="Compose email"
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[calc(var(--radius)-2px)] bg-accent text-accent-ink transition-colors hover:bg-[color:color-mix(in_srgb,var(--accent)_88%,var(--bg))]"
      >
        <ArrowUpRight className="h-5 w-5" />
      </a>
    </div>
  )
}
