import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowRight,
  BellRing,
  CalendarCheck2,
  Check,
  FileCheck2,
  Lightbulb,
  Loader2,
  MessageCircleMore,
  Send,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { extractFieldErrors } from '@/lib/pocketbase/errors'
import { createContact } from '@/services/contacts'
import { usePageTitle } from '@/hooks/use-page-title'

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome com pelo menos 2 caracteres.'),
  contact: z
    .string()
    .trim()
    .refine((value) => {
      const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      const phone = value.replace(/\D/g, '').length >= 8
      return email || phone
    }, 'Informe um e-mail válido ou telefone com pelo menos 8 dígitos.'),
  need: z.string().trim().min(10, 'Conte um pouco mais: use pelo menos 10 caracteres.'),
})

type ContactFormValues = z.infer<typeof contactSchema>

const services = [
  {
    title: 'Avisos oficiais',
    description: 'Comunicados e avisos da Fundação, direto da fonte.',
    icon: BellRing,
    number: '01',
  },
  {
    title: 'Convocações',
    description: 'Convocações e prazos importantes, sem se perder.',
    icon: CalendarCheck2,
    number: '02',
  },
  {
    title: 'Inscrições',
    description: 'Faça sua inscrição em eventos e processos da ELO.',
    icon: FileCheck2,
    number: '03',
  },
  {
    title: 'Sugestões',
    description: 'Envie ideias e sugestões para melhorar o canal.',
    icon: Lightbulb,
    number: '04',
  },
]

function scrollToContact() {
  document.getElementById('contato')?.scrollIntoView({ block: 'start', behavior: 'smooth' })
}

export default function Index() {
  usePageTitle('Canal de Comunicação Institucional')
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: { name: '', contact: '', need: '' },
  })
  const { isSubmitting } = form.formState

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current)
    }
  }, [])

  async function onSubmit(values: ContactFormValues) {
    try {
      await createContact(values)
      form.reset()
      setSubmitted(true)
      toast.success('Contato recebido pela ELO.')
      resetTimer.current = setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      const fieldErrors = extractFieldErrors(error)
      const knownFields: Array<keyof ContactFormValues> = ['name', 'contact', 'need']
      let hasFieldError = false

      for (const field of knownFields) {
        if (fieldErrors[field]) {
          form.setError(field, { message: fieldErrors[field] }, { shouldFocus: !hasFieldError })
          hasFieldError = true
        }
      }

      if (!hasFieldError) {
        toast.error('Não foi possível enviar agora. Tente novamente em instantes.')
      }
    }
  }

  return (
    <>
      <section id="inicio" className="relative scroll-mt-24 overflow-hidden bg-white">
        <div className="elo-arc" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="relative z-10 max-w-5xl">
            <p className="hero-cascade hero-delay-1 text-xs font-extrabold uppercase tracking-[0.24em] text-[#8A651C] sm:text-sm">
              Canal de comunicação ELO
            </p>
            <h1 className="hero-cascade hero-delay-2 mt-6 max-w-5xl text-5xl font-extrabold uppercase leading-[0.96] tracking-[-0.055em] text-[#17324F] sm:text-6xl lg:text-[5.35rem]">
              Um canal claro para a ELO se comunicar
            </h1>
            <p className="hero-cascade hero-delay-3 mt-8 max-w-3xl text-lg font-medium leading-relaxed text-[#5B7186] sm:text-xl">
              Avisos, convocações, inscrições e sugestões — tudo em um só lugar, direto da Fundação.
            </p>
            <div className="hero-cascade hero-delay-4 mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                type="button"
                onClick={scrollToContact}
                className="min-h-14 rounded-full bg-[#17324F] px-8 text-base font-bold text-white shadow-[0_10px_24px_rgba(23,50,79,0.18)] hover:bg-[#1E4266]"
              >
                Enviar meu contato
                <ArrowRight aria-hidden="true" className="ml-2 size-5" />
              </Button>
              <span className="text-sm font-semibold text-[#5B7186]">
                Um ponto de entrada simples, oficial e direto.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="destaque-title">
        <div className="reveal mx-auto max-w-7xl overflow-hidden rounded-[2rem] border-l-[0.45rem] border-[#C99A3C] bg-[#10283F] shadow-[0_18px_45px_rgba(16,40,63,0.18)]">
          <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[11rem_1px_1fr] lg:items-center lg:gap-10 lg:px-14 lg:py-12">
            <div className="flex items-center justify-center">
              <span className="flex size-24 items-center justify-center rounded-full border border-[#E5B95C]/50 bg-white/5 text-[#E5B95C]">
                <MessageCircleMore className="size-12" strokeWidth={1.7} aria-hidden="true" />
              </span>
            </div>
            <div className="hidden h-32 bg-[#C99A3C] lg:block" aria-hidden="true" />
            <div>
              <h2
                id="destaque-title"
                className="text-3xl font-extrabold leading-tight tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl"
              >
                Falar com a ELO exige
                <span className="block text-[#E5B95C]">um canal oficial.</span>
              </h2>
              <p className="mt-5 max-w-3xl leading-relaxed text-[#E7EEF4]">
                Aqui você recebe avisos oficiais, convocações, faz sua inscrição e envia sugestões —
                com transparência e resposta acompanhada.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="servicos"
        className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
        aria-labelledby="services-title"
      >
        <div className="mx-auto max-w-7xl">
          <div className="reveal max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#8A651C]">
              Serviços em destaque
            </p>
            <h2
              id="services-title"
              className="mt-4 text-4xl font-extrabold uppercase tracking-[-0.04em] text-[#17324F] sm:text-5xl"
            >
              Informação e escuta em um só lugar
            </h2>
          </div>
          <ul role="list" className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <li key={service.title} className="reveal">
                  <article className="service-card group relative min-h-full overflow-hidden rounded-[1.75rem] border border-[#DCE6EE] bg-[#EAF1F7] p-6 transition-[transform,box-shadow] duration-200 motion-safe:hover:-translate-y-1">
                    <span className="absolute right-5 top-5 text-xs font-extrabold tracking-[0.18em] text-[#8A651C]">
                      {service.number}
                    </span>
                    <span className="flex size-14 items-center justify-center rounded-full bg-[#17324F] text-[#E5B95C] shadow-sm">
                      <Icon className="size-7" aria-hidden="true" />
                    </span>
                    <h3 className="mt-7 text-lg font-extrabold uppercase leading-tight text-[#17324F]">
                      {service.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-[#506B82]">{service.description}</p>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section
        id="contato"
        className="scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8"
        aria-labelledby="contact-title"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="reveal pt-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#8A651C]">
              Seu contato é o primeiro passo
            </p>
            <h2
              id="contact-title"
              className="mt-4 text-4xl font-extrabold uppercase leading-tight tracking-[-0.04em] text-[#17324F] sm:text-5xl"
            >
              Fale com a ELO
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#5B7186]">
              Conte o que você precisa — a equipe responde por aqui.
            </p>
            <div className="mt-9 rounded-2xl border-l-4 border-[#C99A3C] bg-[#EAF1F7] p-6">
              <p className="font-bold text-[#17324F]">Portal como referência central.</p>
              <p className="mt-2 text-sm leading-relaxed text-[#506B82]">
                Um caminho simples para conhecer a ELO, manifestar interesse e iniciar um
                relacionamento institucional.
              </p>
            </div>
          </div>

          <div className="reveal min-h-[34rem] rounded-[2rem] border border-[#DCE6EE] border-l-[0.45rem] border-l-[#C99A3C] bg-white p-6 shadow-[0_18px_55px_rgba(23,50,79,0.10)] sm:p-9">
            {submitted ? (
              <div
                className="confirm-card flex min-h-[28rem] flex-col items-center justify-center text-center"
                role="status"
              >
                <span className="flex size-20 items-center justify-center rounded-full bg-[#E8F6EF] text-[#2E7D5B]">
                  <Check className="size-10" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <h3 className="mt-7 text-3xl font-extrabold uppercase tracking-[-0.035em] text-[#17324F]">
                  Recebido!
                </h3>
                <p className="mt-3 text-lg text-[#5B7186]">Em breve entraremos em contato.</p>
              </div>
            ) : (
              <Form {...form}>
                <form
                  noValidate
                  onSubmit={(event) =>
                    isSubmitting ? event.preventDefault() : form.handleSubmit(onSubmit)(event)
                  }
                  className="space-y-6"
                >
                  <p className="text-sm text-[#5B7186]">Todos os campos são obrigatórios.</p>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-[#17324F]">Nome</FormLabel>
                        <FormControl>
                          <Input
                            required
                            autoComplete="name"
                            enterKeyHint="next"
                            placeholder="Como podemos chamar você?"
                            className="min-h-12 rounded-xl border-[#C9D5DF] bg-[#F9FBFC] focus-visible:ring-[#C99A3C]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[#A92F24]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-[#17324F]">Contato</FormLabel>
                        <FormControl>
                          <Input
                            required
                            type="text"
                            autoComplete="email"
                            enterKeyHint="next"
                            placeholder="E-mail ou telefone/WhatsApp"
                            className="min-h-12 rounded-xl border-[#C9D5DF] bg-[#F9FBFC] focus-visible:ring-[#C99A3C]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[#A92F24]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="need"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-[#17324F]">
                          O que você precisa?
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            required
                            autoComplete="off"
                            enterKeyHint="send"
                            placeholder="Conte sua dúvida, interesse ou sugestão."
                            className="min-h-32 resize-y rounded-xl border-[#C9D5DF] bg-[#F9FBFC] focus-visible:ring-[#C99A3C]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[#A92F24]" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    aria-disabled={isSubmitting}
                    className="min-h-14 w-full rounded-xl bg-[#17324F] text-base font-bold text-white hover:bg-[#1E4266]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 size-5 animate-spin" aria-hidden="true" />
                        Enviando contato…
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 size-5" aria-hidden="true" />
                        Enviar contato
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </section>

      <aside className="px-4 pb-20 sm:px-6 lg:px-8" aria-label="Nota institucional">
        <div className="mx-auto max-w-7xl rounded-2xl border-l-4 border-[#C99A3C] bg-[#EAF1F7] px-6 py-5 text-sm leading-relaxed text-[#425F77] sm:px-8">
          <strong className="text-[#17324F]">Canal de demonstração:</strong> os dados enviados nesta
          versão são de exemplo e ficam registrados no painel interno da ELO.
        </div>
      </aside>
    </>
  )
}
