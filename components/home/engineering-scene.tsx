"use client"

import type { PointerEvent } from "react"
import { Database, Layers3, Network, PanelsTopLeft } from "lucide-react"

// Touch and reduced-motion users get a static view of the same architecture.
export function EngineeringScene() {
  function moveScene(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5
    event.currentTarget.style.setProperty("--scene-turn", `${horizontal * 8}deg`)
    event.currentTarget.style.setProperty("--scene-lean", `${-vertical * 6}deg`)
  }

  function resetScene(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--scene-turn", "0deg")
    event.currentTarget.style.setProperty("--scene-lean", "0deg")
  }

  return (
    <div className="engineering-scene" onPointerMove={moveScene} onPointerLeave={resetScene}>
      <div role="img" aria-label="An application in three connected layers: React interface, NestJS API, and PostgreSQL data storage." className="scene-model">
        <div className="scene-floor" aria-hidden="true" />
        {/* An illustrative browser sits above the services that support it. */}
        <div className="scene-browser scene-slab" aria-hidden="true">
          <div className="scene-browser-bar">
            <span className="flex gap-1.5"><i /><i /><i /></span>
            <span>workspace / overview</span>
            <PanelsTopLeft size={13} />
          </div>
          <div className="scene-dashboard">
            <div className="scene-sidebar"><Layers3 size={20} /><b /><b /><b /><b /></div>
            <div className="scene-dashboard-content">
              <div className="flex items-center justify-between"><span className="text-sm font-medium">Product overview</span><span className="scene-status" /></div>
              <div className="scene-mini-cards"><span /><span /><span /></div>
              <div className="scene-chart"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
              <div className="scene-table"><span /><span /><span /></div>
            </div>
          </div>
          <div className="scene-layer-caption"><span>Interface</span><span>React / Next.js</span></div>
        </div>

        {/* These layers illustrate architecture rather than live performance. */}
        <div className="scene-api scene-slab" aria-hidden="true">
          <div className="scene-layer-heading"><Network size={21} /><span>Application layer</span><span className="scene-layer-tag">NestJS</span></div>
          <div className="scene-service-row"><span>Auth</span><span>GraphQL</span><span>Services</span></div>
        </div>
        <div className="scene-database scene-slab" aria-hidden="true">
          <div className="scene-layer-heading"><Database size={22} /><span>Data foundation</span></div>
          <div className="scene-storage-row"><span>PostgreSQL</span><span>MongoDB</span><span>Redis</span></div>
        </div>
      </div>
      <p className="scene-caption">Every layer. One connected product.</p>
    </div>
  )
}
