import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Loader2, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { AuthShell } from '@/components/AuthShell'
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
import { requestPasswordReset } from '@/services/auth'

const schema = z.object({ email: z.email('Informe um e-mail válido.') })
type Values = z.infer<typeof schema>

export default function ForgotPassword() {
  usePageTitle('Recuperar senha')
  const [sent, setSent] = useState(false)
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: { email: '' },
  })
  const { isSubmitting } = form.formState

  async function onSubmit(values: Values) {
    try {
      await requestPasswordReset(values.email)
      setSent(true)
      toast.success('Pedido de recuperação enviado.')
    } catch {
      toast.error('Não foi possível solicitar a recuperação agora.')
    }
  }

  return (
    <AuthShell
      eyebrow="Acesso da equipe"
      title="Recupere sua senha"
      description="Informe o e-mail da sua conta para receber as instruções."
    >
      {sent ? (
        <div role="status" className="rounded-2xl bg-[#E8F6EF] p-6 text-center text-[#236247]">
          <Check className="mx-auto size-9" aria-hidden="true" />
          <p className="mt-3 font-bold">Confira sua caixa de entrada.</p>
          <p className="mt-2 text-sm">Se a conta existir, as instruções chegarão por e-mail.</p>
          <Button asChild variant="outline" className="mt-6 border-[#A8D3BF] bg-white">
            <Link to="/entrar">Voltar para entrar</Link>
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form
            noValidate
            onSubmit={(event) =>
              isSubmitting ? event.preventDefault() : form.handleSubmit(onSubmit)(event)
            }
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-[#17324F]">E-mail</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="email"
                      autoComplete="username"
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
              className="min-h-13 w-full rounded-xl bg-[#17324F] font-bold hover:bg-[#1E4266]"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 animate-spin" aria-hidden="true" />
              ) : (
                <Mail className="mr-2" aria-hidden="true" />
              )}
              {isSubmitting ? 'Enviando…' : 'Enviar instruções'}
            </Button>
          </form>
        </Form>
      )}
    </AuthShell>
  )
}
