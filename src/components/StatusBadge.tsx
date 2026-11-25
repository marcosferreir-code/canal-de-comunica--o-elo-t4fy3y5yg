import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ContactStatus } from '@/types/contact'

export const statusLabels: Record<ContactStatus, string> = {
  novo: 'Novo',
  em_atendimento: 'Em atendimento',
  concluido: 'Concluído',
}

const statusStyles: Record<ContactStatus, string> = {
  novo: 'border-[#E6C477] bg-[#FFF4D8] text-[#6F4C08]',
  em_atendimento: 'border-[#AFC9E1] bg-[#E8F2FB] text-[#1E527C]',
  concluido: 'border-[#A8D3BF] bg-[#E8F6EF] text-[#236247]',
}

export function StatusBadge({ status }: { status: ContactStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'min-h-7 rounded-full px-3 py-1 text-xs font-bold tracking-wide',
        statusStyles[status],
        status === 'novo' && 'status-new-once',
      )}
    >
      <span className="mr-1.5 size-1.5 rounded-full bg-current" aria-hidden="true" />
      {statusLabels[status]}
    </Badge>
  )
}
