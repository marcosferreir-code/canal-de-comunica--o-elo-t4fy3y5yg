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
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#8A651C]">
            Jornada de aproximação
          </p>
          <h2
            id="journey-title"
            className="mt-4 text-4xl font-extrabold uppercase tracking-[-0.04em] text-[#17324F] sm:text-5xl"
          >
            Quem somos
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#5B7186]">
            Cinco etapas numeradas aproximam você, servidor do Legislativo Municipal Catarinense, da
            construção da ELO — cada uma no seu ritmo.
          </p>
        </div>

        <ol className="relative mt-14 space-y-6 lg:space-y-0">
          <span
            aria-hidden="true"
            className="absolute left-[2.1rem] top-4 bottom-4 hidden w-0.5 bg-[#D9C08A] sm:block lg:left-1/2 lg:-translate-x-1/2"
          />
          {journeySteps.map((step, index) => {
            const Icon = step.icon
            const isLeft = index % 2 === 0
            return (
              <li
                key={step.id}
                className={`reveal relative lg:grid lg:grid-cols-2 lg:gap-16 ${index > 0 ? 'lg:pt-12' : ''}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-[1.45rem] top-8 z-10 flex size-11 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#C99A3C] bg-white text-sm font-extrabold text-[#8A651C] shadow-[0_4px_12px_rgba(23,50,79,0.12)] sm:left-[2.1rem] lg:left-1/2"
                >
                  {index + 1}
                </span>
                <div
                  className={`ml-12 sm:ml-16 lg:ml-0 ${isLeft ? 'lg:col-start-1 lg:pr-10' : 'lg:col-start-2 lg:pl-10'}`}
                >
                  <article className="journey-card group relative overflow-hidden rounded-[1.75rem] border border-[#DCE6EE] bg-[#EAF1F7] p-6 transition-[transform,box-shadow] duration-200 motion-safe:hover:-translate-y-1 sm:p-7">
                    <span className="absolute right-5 top-5 text-xs font-extrabold tracking-[0.18em] text-[#8A651C]">
                      Etapa {index + 1}
                    </span>
                    <span className="flex size-14 items-center justify-center rounded-full bg-[#17324F] text-[#E5B95C] shadow-sm">
                      <Icon className="size-7" aria-hidden="true" />
                    </span>
                    <h3 className="mt-7 pr-16 text-lg font-extrabold uppercase leading-tight text-[#17324F]">
                      {step.title}
                    </h3>
                    <div className="mt-1">{step.content}</div>
                  </article>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
