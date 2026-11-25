import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react'

import { BrandMark } from '@/components/BrandMark'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const anchorLinks = [
  { label: 'Início', hash: 'inicio' },
  { label: 'Serviços', hash: 'servicos' },
  { label: 'Contato', hash: 'contato' },
]

export default function Layout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const mainRef = useRef<HTMLElement>(null)
  const previousPath = useRef(pathname)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 16)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  useEffect(() => {
    if (previousPath.current === pathname) return
    previousPath.current = pathname
    window.scrollTo({ top: 0, behavior: 'instant' })
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  function goToSection(hash: string) {
    if (pathname !== '/') {
      navigate(`/#${hash}`)
      return
    }
    document.getElementById(hash)?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  const headerLinks = (
    <>
      {anchorLinks.map((item) => (
        <button
          key={item.hash}
          type="button"
          onClick={() => goToSection(item.hash)}
          className="nav-underline min-h-11 rounded-md px-2 text-sm font-bold text-[#17324F] transition-colors duration-200 hover:text-[#8A651C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A3C] focus-visible:ring-offset-2"
        >
          {item.label}
        </button>
      ))}
      <Button
        asChild
        variant="ghost"
        className="min-h-11 font-bold text-[#17324F] hover:bg-[#EAF1F7]"
      >
        <Link to="/painel">Painel</Link>
      </Button>
    </>
  )

  return (
    <div className="flex min-h-dvh flex-col bg-[#F7F9FB] text-[#17324F]">
      <a
        href="#conteudo-principal"
        className="sr-only fixed left-4 top-4 z-[100] rounded-md bg-white px-4 py-3 font-bold text-[#17324F] shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A3C]"
      >
        Pular para o conteúdo
      </a>
      <header
        className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,backdrop-filter] duration-200 ${
          scrolled
            ? 'border-[#DCE6EE] bg-white/90 shadow-[0_6px_22px_rgba(23,50,79,0.08)] backdrop-blur-xl'
            : 'border-transparent bg-white'
        }`}
      >
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <BrandMark />
          <nav aria-label="Principal" className="hidden items-center gap-2 lg:flex">
            {headerLinks}
            <Button
              type="button"
              onClick={() => goToSection('contato')}
              className="ml-2 min-h-11 rounded-full bg-[#17324F] px-6 font-bold text-white hover:bg-[#1E4266]"
            >
              Fale conosco
            </Button>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Abrir menu"
                className="size-11 border-[#C9D5DF] text-[#17324F] lg:hidden"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent className="border-l-[#DCE6EE] bg-white">
              <SheetHeader className="text-left">
                <SheetTitle className="text-[#17324F]">Navegação ELO</SheetTitle>
                <SheetDescription>Encontre informações e fale com a equipe.</SheetDescription>
              </SheetHeader>
              <nav aria-label="Menu móvel" className="mt-8 flex flex-col items-stretch gap-2">
                {anchorLinks.map((item) => (
                  <SheetClose asChild key={item.hash}>
                    <button
                      type="button"
                      onClick={() => goToSection(item.hash)}
                      className="min-h-12 rounded-xl px-4 text-left font-bold text-[#17324F] hover:bg-[#EAF1F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A3C]"
                    >
                      {item.label}
                    </button>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button
                    asChild
                    variant="ghost"
                    className="min-h-12 justify-start px-4 font-bold text-[#17324F]"
                  >
                    <Link to="/painel">Painel</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    type="button"
                    onClick={() => goToSection('contato')}
                    className="mt-3 min-h-12 rounded-full bg-[#17324F] font-bold text-white hover:bg-[#1E4266]"
                  >
                    Fale conosco
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main
        id="conteudo-principal"
        ref={mainRef}
        tabIndex={-1}
        className="flex flex-1 flex-col focus-visible:outline-none"
      >
        <Outlet />
      </main>

      <footer className="mt-auto bg-[#10283F] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] md:items-end lg:px-8">
          <div>
            <BrandMark inverted />
            <p className="mt-7 font-bold">ELO — Canal de Comunicação Institucional</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#D7E2EB]">
              Avisos, convocações, inscrições e sugestões em um só lugar.
            </p>
          </div>
          <p className="border-t border-white/15 pt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#E5B95C] md:border-l md:border-t-0 md:pl-8 md:pt-0">
            Demonstração — dados de exemplo
          </p>
        </div>
      </footer>
    </div>
  )
}
