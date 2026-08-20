"use client"

// Theme state lives here, but the SOURCE OF TRUTH for what is on screen is the
// pair of attributes on <html>. A pre-paint script in app/layout.tsx resolves
// them from localStorage before first paint.
//
// ── WHY STATE STARTS AT THE DEFAULTS AND NOT AT THE DOM ─────────────────────
// The hydration render must reproduce the SERVER output byte for byte. The
// server rendered with DEFAULT_MODE / DEFAULT_PALETTE, because it cannot know
// what is in a visitor's localStorage. So reading the live DOM in a useState
// initialiser - which is what this file used to do - makes the first client
// render disagree with the server for anyone whose stored theme differs from
// the default, and React reports a hydration mismatch.
//
// suppressHydrationWarning is NOT the fix: React states such attributes are
// "not patched up", so a stale aria-label would persist - a real accessibility
// bug rather than mere console noise.
//
// Instead: start at the defaults (deterministic, matches SSR), then adopt the
// DOM in an effect after hydration commits. Nothing flashes visually, because
// the colours come from CSS variables the pre-paint script already applied;
// only React-derived strings (labels, aria-checked, swatch data-*) settle one
// frame later. `mounted` is exposed for anything that must not render a
// theme-derived value before then.

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import {
  DEFAULT_MODE,
  DEFAULT_PALETTE,
  STORAGE_KEYS,
  isMode,
  isPaletteId,
  type Mode,
  type PaletteId,
} from "@/config/palettes"

export interface ThemeContextValue {
  mode: Mode
  palette: PaletteId
  /** False until the post-hydration sync has run. */
  mounted: boolean
  setMode: (mode: Mode) => void
  setPalette: (palette: PaletteId) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

/** Read the already-painted mode off <html>. SSR-safe; validated. */
function readMode(): Mode {
  if (typeof document === "undefined") return DEFAULT_MODE
  const value = document.documentElement.dataset.mode
  return isMode(value) ? value : DEFAULT_MODE
}

/** Read the already-painted palette off <html>. SSR-safe; validated. */
function readPalette(): PaletteId {
  if (typeof document === "undefined") return DEFAULT_PALETTE
  const value = document.documentElement.dataset.palette
  return isPaletteId(value) ? value : DEFAULT_PALETTE
}

/** localStorage throws outright in Safari private mode and when disabled. */
function persist(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* no-op: the attribute on <html> still holds for this session */
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Deterministic initial state, identical to what the server rendered.
  const [mode, setModeState] = useState<Mode>(DEFAULT_MODE)
  const [palette, setPaletteState] = useState<PaletteId>(DEFAULT_PALETTE)
  const [mounted, setMounted] = useState(false)

  // Adopt what the pre-paint script already put on <html>, after hydration.
  useEffect(() => {
    const domMode = readMode()
    const domPalette = readPalette()
    setModeState((prev) => (prev === domMode ? prev : domMode))
    setPaletteState((prev) => (prev === domPalette ? prev : domPalette))
    setMounted(true)
  }, [])

  const setMode = useCallback((next: Mode) => {
    if (!isMode(next)) return
    document.documentElement.dataset.mode = next
    persist(STORAGE_KEYS.mode, next)
    setModeState(next)
  }, [])

  const setPalette = useCallback((next: PaletteId) => {
    if (!isPaletteId(next)) return
    document.documentElement.dataset.palette = next
    persist(STORAGE_KEYS.palette, next)
    setPaletteState(next)
  }, [])

  const toggleMode = useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark")
  }, [mode, setMode])

  // Keep tabs in agreement. Another tab writes localStorage; we mirror it onto
  // this document so the two never drift.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEYS.mode && isMode(event.newValue)) {
        document.documentElement.dataset.mode = event.newValue
        setModeState(event.newValue)
      } else if (event.key === STORAGE_KEYS.palette && isPaletteId(event.newValue)) {
        document.documentElement.dataset.palette = event.newValue
        setPaletteState(event.newValue)
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, palette, mounted, setMode, setPalette, toggleMode }),
    [mode, palette, mounted, setMode, setPalette, toggleMode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>")
  return ctx
}
