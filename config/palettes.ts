// The theme registry. Colour VALUES live in app/globals.css and nowhere else -
// this file holds only identity and copy, so there is one source of truth for
// the palettes. The picker renders its swatches by nesting an element that
// carries `data-palette` / `data-mode`, which re-scopes the CSS variables
// locally; that is why no hex codes appear here.

export type Mode = "dark" | "light"
export type PaletteId =
  | "aurora"
  | "ember"
  | "lagoon"
  | "orchid"
  | "slate"
  | "terracotta"
  | "verdigris"
  | "olive"

export interface Palette {
  id: PaletteId
  name: string
  /** Shown under the name in the picker. Names the instrument it comes from. */
  note: string
}

export const PALETTES: Palette[] = [
  { id: "terracotta", name: "Terracotta", note: "Warm clay · burnt orange and teal" },
  { id: "verdigris", name: "Verdigris", note: "Oxidised copper · teal and green" },
  { id: "olive", name: "Olive", note: "Warm green · leaf and terracotta" },
  { id: "aurora", name: "Aurora", note: "Indigo night · violet and cyan" },
  { id: "ember", name: "Ember", note: "Warm dusk · amber and rose" },
  { id: "lagoon", name: "Lagoon", note: "Deep water · cyan and green" },
  { id: "orchid", name: "Orchid", note: "Plum dark · magenta and violet" },
  { id: "slate", name: "Slate", note: "Quiet cool · one blue" },
]

export const DEFAULT_PALETTE: PaletteId = "terracotta"
export const DEFAULT_MODE: Mode = "dark"

/** localStorage keys. Read by the pre-paint script in app/layout.tsx. */
export const STORAGE_KEYS = {
  mode: "mim-mode",
  palette: "mim-palette",
} as const

export const MODES: Mode[] = ["dark", "light"]

export function isMode(v: unknown): v is Mode {
  return v === "dark" || v === "light"
}

export function isPaletteId(v: unknown): v is PaletteId {
  return typeof v === "string" && PALETTES.some((p) => p.id === v)
}
