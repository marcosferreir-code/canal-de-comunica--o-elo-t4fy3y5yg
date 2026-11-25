import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Mail } from 'lucide-react'
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
import { usePageTitle } from '@/hooks/use-page-title'
import { getCurrentUser, requestEmailChange } from '@/services/auth'

const schema = z.object({ email: z.email('Informe um e-mail válido.') })
type Values = z.infer<typeof schema>

export default function Account() {
  usePageTitle('Minha conta')
  const user = getCurrentUser()
  const [sent, setSent] = useState(false)
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: { email: '' },
  })
  const { isSubmitting } = form.formState

  async function onSubmit(values: Values) {
    try {
      await requestEmailChange(values.email)
      setSent(true)
      form.reset()
      toast.success('Confirmação enviada ao novo e-mail.')
    } catch {
      toast.error('Não foi possível solicitar a troca de e-mail.')
    }
  }

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#8A651C]">
          Equipe ELO
        </p>
        <h1 className="mt-4 text-4xl font-extrabold uppercase tracking-[-0.04em] text-[#17324F]">
          Minha conta
        </h1>
        <div className="mt-8 rounded-[2rem] border border-[#DCE6EE] border-l-4 border-l-[#C99A3C] bg-white p-7 shadow-sm sm:p-9">
          <p className="text-sm font-semibold text-[#5B7186]">E-mail atual</p>
          <p className="mt-1 font-bold text-[#17324F]">{user?.email}</p>
          <h2 className="mt-8 text-xl font-extrabold text-[#17324F]">
            Solicitar alteração de e-mail
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#5B7186]">
            Enviaremos um link de confirmação ao novo endereço. Ao concluir, sua sessão será
            encerrada.
          </p>
          {sent && (
            <p
              role="status"
              className="mt-5 rounded-xl bg-[#E8F6EF] p-4 font-semibold text-[#236247]"
            >
              Confira o novo e-mail para concluir a alteração.
            </p>
          )}
          <Form {...form}>
            <form
              noValidate
              onSubmit={(event) =>
                isSubmitting ? event.preventDefault() : form.handleSubmit(onSubmit)(event)
              }
              className="mt-6 space-y-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[#17324F]">Novo e-mail</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="email"
                        autoComplete="email"
                        spellCheck={false}
                        className="min-h-12 rounded-xl focus-visible:ring-[#C99A3C]"
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
                className="min-h-12 rounded-xl bg-[#17324F] font-bold hover:bg-[#1E4266]"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 animate-spin" aria-hidden="true" />
                ) : (
                  <Mail className="mr-2" aria-hidden="true" />
                )}
                {isSubmitting ? 'Enviando…' : 'Enviar confirmação'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}
