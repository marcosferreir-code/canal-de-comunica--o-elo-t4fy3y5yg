import type { ReactNode } from 'react'

interface AuthShellProps {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}

export function AuthShell({ eyebrow, title, description, children }: AuthShellProps) {
  return (
    <section className="relative flex min-h-[calc(100dvh-5rem)] items-center overflow-hidden px-4 py-16 sm:px-6">
      <div className="elo-arc elo-arc--auth" aria-hidden="true" />
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-[2rem] border border-[#DCE6EE] border-l-4 border-l-[#C99A3C] bg-white p-6 shadow-[0_20px_60px_rgba(23,50,79,0.10)] sm:p-9">
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.22em] text-[#8A651C]">
            {eyebrow}
          </p>
          <h1 className="text-3xl font-extrabold uppercase leading-tight tracking-[-0.035em] text-[#17324F]">
            {title}
          </h1>
          <p className="mt-3 leading-relaxed text-[#5B7186]">{description}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  )
}
