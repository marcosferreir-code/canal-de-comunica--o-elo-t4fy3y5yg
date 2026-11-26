import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Check, Loader2, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { EloSymbol } from '@/components/EloSymbol'
import { Channels } from '@/components/Channels'
import { Journey, MANIFESTATION_TEXT } from '@/components/Journey'
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

function scrollToPrecadastro() {
  document.getElementById('pre-cadastro')?.scrollIntoView({ block: 'start', behavior: 'smooth' })
}

export default function Index() {
  usePageTitle('Canal de Comunicação ELO')
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
      toast.success('Pré-cadastro recebido pela Comissão de Fundação da ELO.')
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
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
            <div className="max-w-5xl">
              <p className="hero-cascade hero-delay-1 text-xs font-extrabold uppercase tracking-[0.24em] text-[#8A651C] sm:text-sm">
                CANAL DE COMUNICAÇÃO ELO
              </p>
              <h1 className="hero-cascade hero-delay-2 mt-6 max-w-5xl text-5xl font-extrabold uppercase leading-[0.96] tracking-[-0.055em] text-[#17324F] sm:text-6xl lg:text-[5.35rem]">
                Queremos falar com você!
              </h1>
              <p className="hero-cascade hero-delay-3 mt-8 max-w-3xl text-lg font-medium leading-relaxed text-[#5B7186] sm:text-xl">
                Somos a Comissão de Fundação da Associação denominada União do Legislativo Municipal
                Catarinense — <strong className="font-bold text-[#17324F]">ELO</strong>.
              </p>
              <p className="hero-cascade hero-delay-3 mt-5 max-w-3xl text-lg font-medium leading-relaxed text-[#5B7186] sm:text-xl">
                É um espaço de cooperação, compartilhamento de conhecimentos, troca de experiências
                e construção de soluções coletivas para os desafios do Legislativo Municipal.
              </p>
              <div className="hero-cascade hero-delay-4 mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  onClick={scrollToPrecadastro}
                  className="min-h-14 rounded-full bg-[#17324F] px-8 text-base font-bold text-white shadow-[0_10px_24px_rgba(23,50,79,0.18)] hover:bg-[#1E4266]"
                >
                  Quero Participar
                  <ArrowRight aria-hidden="true" className="ml-2 size-5" />
                </Button>
                <span className="text-sm font-semibold text-[#5B7186]">
                  Pré-cadastro voluntário e simplificado — leva menos de um minuto.
                </span>
              </div>
            </div>

            <div className="hero-cascade hero-delay-4 mx-auto w-full max-w-[19rem] motion-safe:sm:max-w-[21rem] lg:max-w-none">
              <EloSymbol className="h-auto w-full" />
              <p className="mt-3 text-center text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#5B7186] sm:text-xs">
                Conexão · Cooperação · Pertencimento
              </p>
            </div>
          </div>
        </div>
      </section>

      <Journey />

      <section
        id="pre-cadastro"
        className="scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8"
        aria-labelledby="pre-cadastro-title"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="reveal pt-4">
            <h2
              id="pre-cadastro-title"
              className="text-4xl font-extrabold uppercase leading-tight tracking-[-0.04em] text-[#17324F] sm:text-5xl"
            >
              Pré-cadastro — Manifestação de interesse
            </h2>
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
                  Pré-cadastro recebido!
                </h3>
                <p className="mt-3 text-lg text-[#5B7186]">
                  A Comissão de Fundação vai entrar em contato.
                </p>
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
                  <p className="text-lg leading-relaxed text-[#5B7186]">{MANIFESTATION_TEXT}</p>
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
                          Sua manifestação de interesse
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            required
                            autoComplete="off"
                            enterKeyHint="send"
                            placeholder="Conte como gostaria de participar da fundação da ELO."
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
                        Enviando pré-cadastro…
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 size-5" aria-hidden="true" />
                        Enviar pré-cadastro
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </section>

      <Channels />

      <aside className="px-4 pb-20 sm:px-6 lg:px-8" aria-label="Nota institucional">
        <div className="mx-auto max-w-7xl rounded-2xl border-l-4 border-[#C99A3C] bg-[#EAF1F7] px-6 py-5 text-sm leading-relaxed text-[#425F77] sm:px-8">
          <strong className="text-[#17324F]">Canal de demonstração:</strong> os dados enviados nesta
          versão são de exemplo e ficam registrados no painel interno da Comissão de Fundação da
          ELO.
        </div>
      </aside>
    </>
  )
}
