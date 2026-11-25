import { useEffect, useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'

import { AuthShell } from '@/components/AuthShell'
import { Button } from '@/components/ui/button'
import { usePageTitle } from '@/hooks/use-page-title'
import { confirmEmailVerification } from '@/services/auth'

export default function VerifyEmail() {
  usePageTitle('Verificar e-mail')
  const [params] = useSearchParams()
  const token = params.get('token') ?? ''
  const [state, setState] = useState<'loading' | 'success' | 'error'>(token ? 'loading' : 'error')

  useEffect(() => {
    if (!token) return
    confirmEmailVerification(token)
      .then(() => setState('success'))
      .catch(() => setState('error'))
  }, [token])

  return (
    <AuthShell
      eyebrow="Confirmação de conta"
      title="Verificação de e-mail"
      description="Confirmamos a autenticidade do endereço associado à sua conta."
    >
      {state === 'loading' ? (
        <div className="flex items-center justify-center gap-3 rounded-2xl bg-[#EAF1F7] p-6 font-bold text-[#17324F]">
          <Loader2 className="animate-spin" aria-hidden="true" />
          Verificando…
        </div>
      ) : state === 'success' ? (
        <div role="status" className="rounded-2xl bg-[#E8F6EF] p-6 text-center text-[#236247]">
          <Check className="mx-auto size-9" aria-hidden="true" />
          <p className="mt-3 font-bold">E-mail verificado com sucesso.</p>
          <Button asChild className="mt-6 bg-[#17324F] hover:bg-[#1E4266]">
            <Link to="/entrar">Entrar no painel</Link>
          </Button>
        </div>
      ) : (
        <div role="alert" className="rounded-2xl bg-[#FCECEA] p-6 text-center text-[#8C2C23]">
          <p className="font-bold">Este link de verificação é inválido ou expirou.</p>
          <Button asChild variant="outline" className="mt-6 bg-white">
            <Link to="/entrar">Voltar para entrar</Link>
          </Button>
        </div>
      )}
    </AuthShell>
  )
}
