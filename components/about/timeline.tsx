export interface TimelineItem {
  period: string
  title: string
  detail: string
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-l border-line">
      {items.map((item, i) => (
        <li key={i} className="relative pb-9 pl-7 last:pb-0">
          <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-accent bg-bg" />
          <p className="label">{item.period}</p>
          <h3 className="mt-2 font-display text-lg text-ink">{item.title}</h3>
          <p className="mt-1 max-w-prose text-sm leading-relaxed text-muted">{item.detail}</p>
        </li>
      ))}
    </ol>
  )
}
