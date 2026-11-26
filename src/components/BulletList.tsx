interface BulletListProps {
  items: string[]
}

/** Lista com marcadores estilizados do tema (sem emoji), usada nas etapas e nos canais. */
export function BulletList({ items }: BulletListProps) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-[#506B82]">
          <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-[#C99A3C]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
