import type { ReactNode } from 'react'
import { Globe, HeartHandshake, Target, Users, Waypoints, type LucideIcon } from 'lucide-react'

import { BulletList } from '@/components/BulletList'

/** Texto da etapa 5, reaproveitado como apoio visual do formulário de pré-cadastro. */
export const MANIFESTATION_TEXT =
  'Realize seu cadastro e acompanhe nossa Comunicação institucional — Divulgação da fundação, objetivos, comunicados e visitas às Câmaras.'

interface JourneyStep {
  id: string
  title: ReactNode
  icon: LucideIcon
  content: ReactNode
}

const bodyClass = 'mt-3 leading-relaxed text-[#506B82]'
const highlightClass = 'mt-5 border-l-4 border-[#C99A3C] pl-4 font-bold text-[#17324F]'

export const journeySteps: JourneyStep[] = [
  {
    id: 'o-que-e',
    title: 'O que é ELO?',
    icon: Waypoints,
    content: (
      <p className={bodyClass}>
        A ELO — União do Legislativo Catarinense é uma iniciativa associativa, em fase de fundação,
        que nasce para integrar, fortalecer e valorizar os profissionais dos Legislativos Municipais
        de Santa Catarina.
      </p>
    ),
  },
  {
    id: 'objetivo',
    title: 'Qual é o objetivo da ELO?',
    icon: Target,
    content: (
      <>
        <p className={bodyClass}>
          Promover a integração e o fortalecimento dos Legislativos Municipais de Santa Catarina por
          meio da união de seus profissionais.
        </p>
        <p className="mt-4 font-semibold text-[#17324F]">A ELO tem como objetivos:</p>
        <BulletList
          items={[
            'Valorizar os profissionais do Legislativo;',
            'Compartilhar conhecimentos, experiências e boas práticas;',
            'Promover a capacitação e o desenvolvimento profissional;',
            'Desenvolver soluções para o aprimoramento da gestão legislativa e administrativa;',
            'Ampliar oportunidades e benefícios coletivos;',
            'Fortalecer a cooperação entre os Legislativos Municipais.',
          ]}
        />
        <p className={highlightClass}>Transformar desafios individuais em soluções coletivas.</p>
      </>
    ),
  },
  {
    id: 'quem-participa',
    title: 'Quem participa da ELO?',
    icon: Users,
    content: (
      <>
        <p className={bodyClass}>
          A ELO é destinada a todos os agentes públicos do poder Legislativo Municipal,
          independentemente do cargo ou da função que exercem.
        </p>
        <BulletList
          items={[
            'Servidores efetivos;',
            'Servidores comissionados;',
            'Vereadores;',
            'Demais agentes públicos do Legislativo.',
          ]}
        />
        <p className={`${bodyClass} mt-5`}>
          A ELO nasce com uma proposta inclusiva, reconhecendo a importância de cada profissional na
          construção de um Legislativo mais forte, qualificado e integrado.
        </p>
        <p className={highlightClass}>
          Diferentes funções. Diferentes experiências. Um propósito em comum.
        </p>
        <p className="mt-5 font-extrabold text-[#8A651C]">Venha fazer parte dessa construção!</p>
      </>
    ),
  },
  {
    id: 'portal',
    title: (
      <a
        href="https://www.elosc.org"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-sm underline decoration-[#C99A3C] decoration-2 underline-offset-4 hover:text-[#8A651C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A3C] focus-visible:ring-offset-2"
      >
        Visite elosc.org
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    ),
    icon: Globe,
    content: (
      <p className={bodyClass}>Conheça como estamos nos organizando — visite nosso portal.</p>
    ),
  },
  {
    id: 'manifestacao',
    title: 'Manifestação de interesse',
    icon: HeartHandshake,
    content: <p className={bodyClass}>{MANIFESTATION_TEXT}</p>,
  },
]

export function Journey() {
  return (
    <section
      id="jornada"
      className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="journey-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal max-w-3xl">
          <h2
            id="journey-title"
            className="text-4xl font-extrabold uppercase tracking-[-0.04em] text-[#17324F] sm:text-5xl"
          >
            Quem somos
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {journeySteps.map((step) => {
            const Icon = step.icon
            return (
              <article
                key={step.id}
                className="journey-card group relative overflow-hidden rounded-[1.75rem] border border-[#DCE6EE] bg-[#EAF1F7] p-6 transition-[transform,box-shadow] duration-200 motion-safe:hover:-translate-y-1 sm:p-7"
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#17324F] text-[#E5B95C] shadow-sm">
                    <Icon className="size-7" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-extrabold uppercase leading-tight text-[#17324F]">
                    {step.title}
                  </h3>
                </div>
                <div className="mt-3">{step.content}</div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
