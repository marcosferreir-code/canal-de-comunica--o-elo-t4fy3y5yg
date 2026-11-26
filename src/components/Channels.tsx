import { Globe, Lock, Megaphone, MessagesSquare, type LucideIcon } from 'lucide-react'

import { BulletList } from '@/components/BulletList'

const telegramMaterials = [
  'Documentos e arquivos;',
  'Fotos e vídeos;',
  'Estudos e materiais técnicos;',
  'Modelos, manuais e orientações;',
  'Histórico de debates e discussões;',
  'Conteúdos organizados por temas de interesse.',
]

// WhatsApp e Telegram já são descritos nos cards acima: aqui fica só o que não se repete.
const tools: Array<{ icon: LucideIcon; label: string; text: string }> = [
  {
    icon: Globe,
    label: 'Portal ELO:',
    text: 'nossa central de informações, conhecimentos e soluções institucionais.',
  },
]

const iconCircle =
  'flex size-12 shrink-0 items-center justify-center rounded-full bg-[#17324F] text-[#E5B95C]'

export function Channels() {
  return (
    <section
      id="canais"
      className="scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8"
      aria-labelledby="canais-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#8A651C]">
            Canais oficiais
          </p>
          <h2
            id="canais-title"
            className="mt-4 text-4xl font-extrabold uppercase leading-tight tracking-[-0.04em] text-[#17324F] sm:text-5xl"
          >
            Conheça nossos canais de comunicação e participação
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="reveal rounded-[1.75rem] border border-[#DCE6EE] bg-white p-7 shadow-[0_18px_55px_rgba(23,50,79,0.08)] sm:p-9">
            <span className={iconCircle}>
              <Megaphone className="size-6" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <p className="mt-6 text-lg leading-relaxed text-[#506B82]">
              O Canal Oficial da ELO no WhatsApp será o nosso{' '}
              <strong className="font-bold text-[#17324F]">Mural de Avisos</strong>, destinado à
              divulgação de comunicados, notícias, informativos, convites e novidades
              institucionais.
            </p>
          </article>

          <article className="reveal rounded-[1.75rem] bg-[#10283F] p-7 text-[#E7EEF4] sm:p-9">
            <span className="flex size-12 items-center justify-center rounded-full border border-[#E5B95C]/50 text-[#E5B95C]">
              <Lock className="size-6" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-xl font-extrabold text-white">Privacidade e segurança</h3>
            <p className="mt-3 leading-relaxed">
              Neste canal, os nomes e números de telefone dos seguidores não ficam visíveis aos
              demais participantes, preservando a privacidade e evitando mensagens indesejadas.
            </p>
          </article>

          <article className="reveal rounded-[1.75rem] border border-[#DCE6EE] bg-[#EAF1F7] p-7 sm:p-9 lg:col-span-2">
            <span className={iconCircle}>
              <MessagesSquare className="size-6" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-xl font-extrabold text-[#17324F]">
              Espaços de participação e deliberação
            </h3>
            <p className="mt-3 leading-relaxed text-[#506B82]">
              Teremos também salas temáticas no Telegram, destinadas à interação, troca de
              experiências, apresentação de sugestões, debates e construção coletiva de propostas.
            </p>
            <p className="mt-5 font-semibold text-[#17324F]">
              O Telegram permitirá organizar e manter disponíveis materiais como:
            </p>
            <BulletList items={telegramMaterials} />
          </article>
        </div>

        <div className="reveal mt-6 rounded-[1.75rem] border border-[#DCE6EE] bg-white p-7 sm:p-9">
          <p className="font-extrabold text-[#17324F]">Cada ferramenta terá uma finalidade:</p>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <li key={tool.label} className="flex items-start gap-4">
                  <span className={iconCircle}>
                    <Icon className="size-6" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <p className="leading-relaxed text-[#506B82]">
                    <strong className="font-bold text-[#17324F]">{tool.label}</strong> {tool.text}
                  </p>
                </li>
              )
            })}
          </ul>
          <p className="mt-8 border-t border-[#DCE6EE] pt-6 text-[#506B82]">
            Os links de acesso às salas do Telegram serão divulgados oportunamente neste canal.
          </p>
        </div>

        <p className="reveal mt-12 border-l-4 border-[#C99A3C] pl-6 text-xl font-extrabold leading-relaxed text-[#17324F] sm:text-2xl">
          Mais do que compartilhar informações, queremos construir uma rede de pessoas,
          conhecimentos e oportunidades.
        </p>

        <div className="reveal mt-10">
          <p className="font-bold text-[#17324F]">ELO — União do Legislativo Catarinense</p>
          <a
            href="https://www.elosc.org"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block rounded-sm font-semibold text-[#8A651C] underline decoration-[#C99A3C] underline-offset-4 hover:text-[#17324F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A3C] focus-visible:ring-offset-2"
          >
            www.elosc.org
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
      </div>
    </section>
  )
}
