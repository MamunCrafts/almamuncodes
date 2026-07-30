"use client"

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  /** stagger, in ms */
  delay?: number
  className?: string
  as?: ElementType
}

/**
 * Lightweight scroll-reveal. Adds `.reveal` (see globals.css) and toggles
 * `.is-in` once in view. Reduced-motion is handled entirely in CSS.
 * (Deliberately dependency-free; swap for motion/react later if wanted.)
 */
export function Reveal({ children, delay = 0, className = "", as }: RevealProps) {
  const Tag = (as ?? "div") as ElementType
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
