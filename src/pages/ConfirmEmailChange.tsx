import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Loader2, MailCheck } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
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
import { confirmEmailChange, signOut } from '@/services/auth'

const schema = z.object({ password: z.string().min(1, 'Informe sua senha atual.') })
type Values = z.infer<typeof schema>

export default function ConfirmEmailChange() {
  usePageTitle('Confirmar novo e-mail')
  const [params] = useSearchParams()
  const token = params.get('token') ?? ''
  const [state, setState] = useState<'form' | 'success' | 'error'>(token ? 'form' : 'error')
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: { password: '' },
  })
  const { isSubmitting } = form.formState

  async function onSubmit(values: Values) {
    try {
      await confirmEmailChange(token, values.password)
      signOut()
      setState('success')
    } catch {
      setState('error')
    }
  }

  return (
    <AuthShell
      eyebrow="Segurança da conta"
      title="Confirme o novo e-mail"
      description="Informe sua senha atual para concluir a alteração do endereço."
    >
      {state === 'success' ? (
        <div role="status" className="rounded-2xl bg-[#E8F6EF] p-6 text-center text-[#236247]">
          <Check className="mx-auto size-9" aria-hidden="true" />
          <p className="mt-3 font-bold">E-mail alterado. Entre novamente.</p>
          <Button asChild className="mt-6 bg-[#17324F] hover:bg-[#1E4266]">
            <Link to="/entrar">Entrar</Link>
          </Button>
        </div>
      ) : state === 'error' ? (
        <div role="alert" className="rounded-2xl bg-[#FCECEA] p-6 text-center text-[#8C2C23]">
          <p className="font-bold">Não foi possível confirmar. O link pode ter expirado.</p>
          <Button asChild variant="outline" className="mt-6 bg-white">
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-[#17324F]">Senha atual</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="password"
                      autoComplete="current-password"
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
                <MailCheck className="mr-2" aria-hidden="true" />
              )}
              {isSubmitting ? 'Confirmando…' : 'Confirmar alteração'}
            </Button>
          </form>
        </Form>
      )}
    </AuthShell>
  )
}
