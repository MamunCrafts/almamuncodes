"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { nav, site } from "@/config/site"

// Sections tracked for active-state highlighting on the home page.
const SPY_IDS = ["skills", "contact"]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeHash, setActiveHash] = useState<string | null>(null)

  // Scrolled state + reading-progress line.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 16)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, y / max) : 0)
      if (pathname === "/" && y < 200) setActiveHash(null)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname])

  // Scroll-spy for the home page's in-page sections.
  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash(null)
      return
    }
    const els = SPY_IDS.map((id) => document.getElementById(id)).filter(Boolean) as Element[]
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveHash(`#${e.target.id}`)
        })
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/" && activeHash === href.slice(1)
    return href !== "/" && pathname.startsWith(href)
  }

  const brand = (
    <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
      <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-accent font-display text-sm font-bold text-accent-ink">
        M
      </span>
      <span className="font-display text-base font-medium tracking-tight">{site.shortName}</span>
    </Link>
  )

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-4">
          {brand}
          <span className="hidden items-center gap-2 rounded-full border border-line bg-surface px-2.5 py-1 lg:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="label !text-[10px] !text-ink/70">Available for remote work</span>
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center gap-1.5 text-sm transition-colors ${
                  active ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
                {active && <span className="h-1 w-1 rounded-full bg-accent" />}
              </Link>
            )
          })}
          <a
            href={`mailto:${site.email}`}
            className="rounded-[--radius] bg-accent px-4 py-2 text-sm font-medium text-accent-ink transition-colors hover:bg-accent/90"
          >
            Get in touch
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-[--radius] border border-line md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* reading-progress line */}
      <div
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />

      {open && (
        <nav className="border-t border-line bg-bg px-5 py-4 sm:px-8 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-[--radius] px-2 py-2.5 text-sm transition-colors ${
                    active ? "bg-surface text-ink" : "text-muted hover:bg-surface hover:text-ink"
                  }`}
                >
                  {active && <span className="h-1 w-1 rounded-full bg-accent" />}
                  {item.label}
                </Link>
              )
            })}
            <a
              href={`mailto:${site.email}`}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-[--radius] bg-accent px-4 py-2.5 text-center text-sm font-medium text-accent-ink"
            >
              Get in touch
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
