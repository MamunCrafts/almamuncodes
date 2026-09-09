"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { ModeToggle } from "@/components/theme/mode-toggle"
import { PalettePicker } from "@/components/theme/palette-picker"
import { nav, site } from "@/config/site"

// Sections tracked for active-state highlighting on the home page.
const SPY_IDS = ["skills", "contact"]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
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

  // One shared link renderer keeps desktop and mobile active states consistent.
  function navigationLinks() {
    return nav.map((item) => {
      const active = isActive(item.href)
      return (
        <Link
          key={item.href}
          href={item.href}
          aria-current={active ? (item.href.includes("#") ? "location" : "page") : undefined}
          className={`navbar-link${active ? " is-active" : ""}`}
          onClick={() => setOpen(false)}
        >
          {item.label}
          <ArrowUpRight className="navbar-mobile-arrow" size={16} aria-hidden="true" />
        </Link>
      )
    })
  }

  return (
    <header className="floating-header">
      <div
        className={`navbar-shell${scrolled ? " is-scrolled" : ""}`}
        onKeyDown={(event) => {
          // Let nested popovers handle Escape before closing the mobile panel.
          if (event.key === "Escape" && !event.defaultPrevented && open) {
            setOpen(false)
            menuButtonRef.current?.focus()
          }
        }}
      >
        {/* Brand, navigation, and actions each have their own visual space. */}
        <div className="navbar-row">
          <Link href="/" className="navbar-brand" onClick={() => setOpen(false)} aria-label={`${site.shortName} home`}>
            <span className="navbar-monogram" aria-hidden="true">m<span>.</span></span>
            <span className="navbar-brand-copy">{site.shortName}<span>Full-stack developer</span></span>
          </Link>

          <nav className="navbar-desktop-links" aria-label="Main navigation">
            {navigationLinks()}
          </nav>

          <div className="navbar-actions">
            <div className="navbar-theme-controls">
              <PalettePicker compact />
              <ModeToggle className="navbar-mode-toggle" />
            </div>
            <a href={`mailto:${site.email}`} className="navbar-contact">
              Let’s talk <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
            className="navbar-menu-toggle"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>

        {/* A non-modal disclosure keeps normal Tab navigation and Escape support. */}
        <div id="mobile-navigation" hidden={!open} className="navbar-mobile-panel">
          <nav aria-label="Mobile navigation" className="navbar-mobile-links">{navigationLinks()}</nav>
          <div className="navbar-mobile-footer">
            <span className="text-xs text-muted">Make it yours</span>
            <div className="flex items-center gap-2"><PalettePicker /><ModeToggle /></div>
          </div>
          <a href={`mailto:${site.email}`} onClick={() => setOpen(false)} className="navbar-contact navbar-mobile-contact">
            Let’s talk <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        {/* Reading progress follows the bottom edge without clipping dropdowns. */}
        <div className="navbar-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </header>
  )
}
