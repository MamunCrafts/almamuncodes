"use client"

import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme/theme-provider"

/**
 * Dark/light flip. Chrome only - ink, line and surface, no colour, per the
 * site's rule that colour marks measured data and nothing else.
 *
 * Both icons stay in the tree and one is hidden by class, so no element
 * structure has to be reconciled and the button never changes size.
 *
 * No suppressHydrationWarning here, deliberately. ThemeProvider's first render
 * reproduces the server output exactly and only adopts the real theme in an
 * effect, so the icon swap is an ordinary post-hydration state update. Adding
 * suppression back would hide genuine mismatches introduced later.
 */
export function ModeToggle({ className }: { className?: string }) {
  const { mode, toggleMode } = useTheme()
  const next = mode === "dark" ? "light" : "dark"

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={`Switch to ${next} mode`}
      className={cn(
        // 36px minimum hit target.
        "inline-flex h-9 w-9 items-center justify-center rounded-[--radius]",
        "border border-line text-muted transition-colors",
        "hover:bg-surface hover:text-ink",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        className,
      )}
    >
      <Sun
        aria-hidden
        className={cn("h-4 w-4", mode === "dark" ? "hidden" : "block")}
      />
      <Moon
        aria-hidden
        className={cn("h-4 w-4", mode === "dark" ? "block" : "hidden")}
      />
    </button>
  )
}
