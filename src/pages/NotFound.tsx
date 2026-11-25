import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { usePageTitle } from '@/hooks/use-page-title'

export default function NotFound() {
  usePageTitle('Página não encontrada')
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#F7F9FB] px-4 py-16">
      <div className="max-w-lg text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#8A651C]">
          Erro 404
        </p>
        <h1 className="mt-4 text-5xl font-extrabold uppercase tracking-[-0.05em] text-[#17324F]">
          Página não encontrada
        </h1>
        <p className="mt-5 leading-relaxed text-[#5B7186]">
          O endereço informado não existe ou foi movido.
        </p>
        <Button
          asChild
          className="mt-8 min-h-12 rounded-full bg-[#17324F] px-7 font-bold hover:bg-[#1E4266]"
        >
          <Link to="/">Voltar ao início</Link>
        </Button>
      </div>
    </main>
  )
}
