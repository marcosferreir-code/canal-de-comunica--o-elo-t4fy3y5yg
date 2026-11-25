import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

interface BrandMarkProps {
  className?: string
  inverted?: boolean
}

export function BrandMark({ className, inverted = false }: BrandMarkProps) {
  return (
    <Link
      to="/"
      aria-label="ELO — ir para a página inicial"
      className={cn(
        'group inline-flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
    >
      <span className="relative inline-flex items-center">
        <span
          className={cn(
            'text-2xl font-extrabold tracking-[-0.08em]',
            inverted ? 'text-white' : 'text-[#17324F]',
          )}
        >
          ELO
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 52 18"
          width="52"
          height="18"
          className="absolute -bottom-2 -left-1 overflow-visible text-[#C99A3C]"
        >
          <path
            d="M2 15C14 2 33 0 50 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span
        className={cn(
          'hidden border-l pl-3 text-[0.68rem] font-bold uppercase leading-tight tracking-[0.18em] sm:block',
          inverted ? 'border-white/25 text-white/80' : 'border-[#C9D5DF] text-[#5B7186]',
        )}
      >
        Canal de
        <br />
        comunicação
      </span>
    </Link>
  )
}
