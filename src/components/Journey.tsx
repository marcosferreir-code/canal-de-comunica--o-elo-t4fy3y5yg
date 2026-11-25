import { CalendarSearch, Ear, Handshake, HeartHandshake, Users, Waypoints } from 'lucide-react'

interface JourneyStep {
  title: string
  description: string
  icon: typeof Waypoints
}

export const journeySteps: JourneyStep[] = [
  {
    title: 'Descoberta',
    description:
      'O servidor ouve falar da ELO e chega ao Canal de Comunicação — o ponto de entrada oficial da Comissão de Fundação.',
    icon: Waypoints,
  },
  {
    title: 'Acompanhamento',
    description: 'Segue o Canal Oficial sem precisar preencher cadastro.',
    icon: Ear,
  },
  {
    title: 'Conhecimento',
    description: 'Conhece a ELO, seus objetivos, propostas e soluções pelo portal.',
    icon: CalendarSearch,
  },
  {
    title: 'Aproximação',
    description: 'Conversa com a Comissão de Fundação pelo WhatsApp Business.',
    icon: Handshake,
  },
  {
    title: 'Manifestação de interesse',
    description:
      'Realiza o pré-cadastro de maneira voluntária e simplificada. (indicação de colega ou QR Code.)',
    icon: HeartHandshake,
  },
  {
    title: 'Participação institucional',
    description: 'Mobilização para a fundação e posterior processo formal de associação.',
    icon: Users,
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
            Da descoberta à fundação
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#5B7186]">
            Seis etapas numeradas aproximam você, servidor do Legislativo Municipal Catarinense, da
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
                key={step.title}
                className={`reveal relative lg:grid lg:grid-cols-2 lg:gap-16 ${index > 0 ? 'lg:pt-12' : ''}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-[1.45rem] top-8 z-10 flex size-11 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#C99A3C] bg-white text-sm font-extrabold text-[#8A651C] shadow-[0_4px_12px_rgba(23,50,79,0.12)] sm:left-[2.1rem] lg:left-1/2"
                >
                  {index + 1}
                </span>
                <div
                  className={`ml-12 sm:ml-16 lg:ml-0 ${isLeft ? 'lg:col-start-1 lg:pr-10 lg:text-right' : 'lg:col-start-2 lg:pl-10'}`}
                >
                  <article className="journey-card group relative overflow-hidden rounded-[1.75rem] border border-[#DCE6EE] bg-[#EAF1F7] p-6 transition-[transform,box-shadow] duration-200 motion-safe:hover:-translate-y-1">
                    <span className="absolute right-5 top-5 text-xs font-extrabold tracking-[0.18em] text-[#8A651C]">
                      Etapa {index + 1}
                    </span>
                    <span
                      className={`flex size-14 items-center justify-center rounded-full bg-[#17324F] text-[#E5B95C] shadow-sm ${isLeft ? 'lg:ml-auto' : ''}`}
                    >
                      <Icon className="size-7" aria-hidden="true" />
                    </span>
                    <h3 className="mt-7 pr-16 text-lg font-extrabold uppercase leading-tight text-[#17324F]">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-[#506B82]">{step.description}</p>
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
