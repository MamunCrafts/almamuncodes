"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import type { KeyboardEvent } from "react"
import { Palette as PaletteIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { PALETTES, type Mode, type PaletteId } from "@/config/palettes"
import { useTheme } from "@/components/theme/theme-provider"

/**
 * A live swatch, with no colour value anywhere in JS.
 *
 * The palette blocks in app/globals.css are attribute-scoped, not :root-scoped
 * (`[data-palette="oxide"] { … }`, and `[data-mode="light"][data-palette="oxide"]`
 * for light). Putting BOTH attributes on this element re-declares the custom
 * properties on it, so `bg-bg` / `bg-ink` / `bg-slow` / `bg-fast` inside resolve
 * against the previewed palette instead of the page's. Both attributes are
 * required: with `data-palette` alone, a light page would still show the dark
 * block, because the light rules only match when `data-mode` is on the same
 * element.
 */
function Swatch({ palette, mode }: { palette: PaletteId; mode: Mode }) {
  return (
    <span
      data-palette={palette}
      data-mode={mode}
      aria-hidden
      className="flex shrink-0 items-center gap-px rounded-[--radius] border border-line bg-raised p-1"
    >
      <span className="h-4 w-1.5 bg-bg" />
      <span className="h-4 w-1.5 bg-ink" />
      <span className="h-4 w-1.5 bg-slow" />
      <span className="h-4 w-1.5 bg-fast" />
    </span>
  )
}

/**
 * Self-contained trigger + popover panel, built to sit in the site header.
 *
 * Keyboard: the panel is a radiogroup with a roving tabindex. Arrow keys move
 * between options and select as they go (ARIA APG radiogroup behaviour), which
 * doubles as a live preview of the whole site. Home/End jump to the ends.
 * Enter or Space commits and closes. Escape closes and returns focus to the
 * trigger. Tab leaves and closes without stealing focus.
 */
export function PalettePicker({ className }: { className?: string }) {
  const { mode, palette, setPalette } = useTheme()
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])
  const labelId = useId()

  const activeIndex = Math.max(
    0,
    PALETTES.findIndex((p) => p.id === palette),
  )
  const current = PALETTES[activeIndex]

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false)
    if (restoreFocus) triggerRef.current?.focus()
  }, [])

  // Focus the selected option when the panel opens.
  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus()
    // activeIndex intentionally excluded: re-focusing on every arrow-key
    // selection would fight the roving tabindex.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Outside click. Focus only returns to the trigger if it was inside the
  // panel - otherwise the click already moved it somewhere the user chose.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (!target) return
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return
      close(panelRef.current?.contains(document.activeElement) ?? false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [open, close])

  const focusOption = (index: number) => {
    const next = (index + PALETTES.length) % PALETTES.length
    setPalette(PALETTES[next].id)
    optionRefs.current[next]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "Escape":
        event.preventDefault()
        close(true)
        return
      case "Tab":
        setOpen(false)
        return
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault()
        focusOption(activeIndex + 1)
        return
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault()
        focusOption(activeIndex - 1)
        return
      case "Home":
        event.preventDefault()
        focusOption(0)
        return
      case "End":
        event.preventDefault()
        focusOption(PALETTES.length - 1)
        return
      default:
    }
  }

  return (
    <div className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Colour palette: ${current.name}`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            event.preventDefault()
            close(true)
          }
        }}
        className={cn(
          // 36px minimum hit target, matching the header's icon buttons.
          "inline-flex h-9 items-center gap-2 rounded-[--radius] border border-line px-2.5",
          "text-muted transition-colors hover:bg-surface hover:text-ink",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
          open && "bg-surface text-ink",
        )}
      >
        <PaletteIcon aria-hidden className="h-4 w-4" />
        <span className="label hidden text-inherit sm:inline">
          {current.name}
        </span>
      </button>

      {open && (
        <div
          ref={panelRef}
          onKeyDown={onKeyDown}
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[17.5rem] rounded-[--radius] border border-line bg-bg p-2"
        >
          <p id={labelId} className="label px-1.5 pb-2 pt-1">
            Palette
          </p>
          <div role="radiogroup" aria-labelledby={labelId} className="flex flex-col gap-0.5">
            {PALETTES.map((p, index) => {
              const active = p.id === palette
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    optionRefs.current[index] = el
                  }}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  tabIndex={active ? 0 : -1}
                  onClick={() => {
                    setPalette(p.id)
                    close(true)
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-[--radius] border px-2 py-2 text-left transition-colors",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                    active ? "border-ink bg-surface" : "border-transparent hover:bg-surface",
                  )}
                >
                  <Swatch palette={p.id} mode={mode} />
                  <span className="min-w-0 flex-1">
                    <span className={cn("label block", active ? "text-ink" : "text-muted")}>
                      {p.name}
                    </span>
                    <span className="mt-1.5 block font-sans text-xs leading-snug text-muted">
                      {p.note}
                    </span>
                  </span>
                  {active && <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-ink" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
