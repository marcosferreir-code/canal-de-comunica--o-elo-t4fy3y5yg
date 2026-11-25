import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, LogIn } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
import { isAuthenticated, signIn } from '@/services/auth'

const schema = z.object({
  email: z.email('Informe um e-mail válido.'),
  password: z.string().min(1, 'Informe sua senha.'),
})

type Values = z.infer<typeof schema>

export default function Login() {
  usePageTitle('Entrar')
  const navigate = useNavigate()
  const location = useLocation()
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  })
  const { isSubmitting } = form.formState

  useEffect(() => {
    if (isAuthenticated()) navigate('/painel', { replace: true })
  }, [navigate])

  async function onSubmit(values: Values) {
    try {
      await signIn(values.email, values.password)
      toast.success('Acesso liberado. Bem-vindo à equipe ELO.')
      const from = (location.state as { from?: string } | null)?.from
      navigate(from === '/painel' ? from : '/painel', { replace: true })
    } catch {
      toast.error('E-mail ou senha incorretos.')
    }
  }

  return (
    <AuthShell
      eyebrow="Área da equipe ELO"
      title="Acesse o painel"
      description="Entre para acompanhar e responder os contatos recebidos."
    >
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
                    enterKeyHint="next"
                    className="min-h-12 rounded-xl border-[#C9D5DF] focus-visible:ring-[#C99A3C]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#A92F24]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-[#17324F]">Senha</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="password"
                    autoComplete="current-password"
                    className="min-h-12 rounded-xl border-[#C9D5DF] focus-visible:ring-[#C99A3C]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#A92F24]" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Link
              to="/esqueci-senha"
              className="rounded-sm text-sm font-bold text-[#5B7186] underline decoration-[#C99A3C] decoration-2 underline-offset-4 hover:text-[#17324F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A3C]"
            >
              Esqueci minha senha
            </Link>
          </div>
          <Button
            type="submit"
            aria-disabled={isSubmitting}
            className="min-h-13 w-full rounded-xl bg-[#17324F] font-bold text-white hover:bg-[#1E4266]"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 animate-spin" aria-hidden="true" />
            ) : (
              <LogIn className="mr-2" aria-hidden="true" />
            )}
            {isSubmitting ? 'Entrando…' : 'Entrar'}
          </Button>
        </form>
      </Form>
    </AuthShell>
  )
}
