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

  return (
    <div className="flex items-center gap-2 rounded-[--radius] border border-line bg-bg p-2 pl-4 sm:gap-3">
      <a
        href={`mailto:${email}?subject=Remote%20role`}
        className="link-underline min-w-0 flex-1 truncate font-mono text-base text-ink sm:text-lg"
      >
        {email}
      </a>

      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-[calc(var(--radius)-2px)] border border-line px-3 text-sm text-muted transition-colors hover:border-ink/40 hover:text-ink"
      >
        {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
        <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
      </button>

      <a
        href={`mailto:${email}?subject=Remote%20role`}
        aria-label="Compose email"
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[calc(var(--radius)-2px)] bg-accent text-accent-ink transition-colors hover:bg-accent/90"
      >
        <ArrowUpRight className="h-5 w-5" />
      </a>
    </div>
  )
}
