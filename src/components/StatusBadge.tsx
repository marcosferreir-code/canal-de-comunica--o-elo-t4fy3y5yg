import { cn } from '@/lib/utils'
import type { ContactStatus } from '@/types/contact'

const statusLabels: Record<ContactStatus, string> = {
  novo: 'Novo',
  em_atendimento: 'Em atendimento',
  concluido: 'Concluído',
}

const statusClasses: Record<ContactStatus, string> = {
  novo: 'border-[#E3C878] bg-[#FFF4D8] text-[#6F4C08]',
  em_atendimento: 'border-[#B4D3EA] bg-[#E8F2FB] text-[#1E527C]',
  concluido: 'border-[#B4DCc8] bg-[#E8F6EF] text-[#236247]',
}

const statusRoles: Record<ContactStatus, string> = {
  novo: 'Pré-cadastro novo, aguardando triagem',
  em_atendimento: 'Pré-cadastro em atendimento pela Comissão de Fundação',
  concluido: 'Pré-cadastro concluído',
}

interface StatusBadgeProps {
  status: ContactStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-extrabold uppercase tracking-wide',
        statusClasses[status],
      )}
    >
      <span role="status">{statusLabels[status]}</span>
      <span className="sr-only">{statusRoles[status]}</span>
    </span>
  )
}

export { statusLabels }
