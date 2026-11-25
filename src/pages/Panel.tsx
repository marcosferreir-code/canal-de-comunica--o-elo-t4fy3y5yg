import { useEffect, useMemo, useState } from 'react'
import {
  CheckCircle2,
  Clock3,
  Inbox,
  Loader2,
  LogOut,
  Mail,
  Search,
  UserRound,
  UsersRound,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { StatusBadge, statusLabels } from '@/components/StatusBadge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { usePageTitle } from '@/hooks/use-page-title'
import { useRealtime } from '@/hooks/use-realtime'
import { listContacts, updateContactStatus } from '@/services/contacts'
import { getCurrentUser, signOut } from '@/services/auth'
import type { ContactRecord, ContactStatus } from '@/types/contact'

type FilterStatus = 'todos' | ContactStatus

const filters: Array<{ value: FilterStatus; label: string }> = [
  { value: 'todos', label: 'Todos' },
  { value: 'novo', label: 'Novos' },
  { value: 'em_atendimento', label: 'Em atendimento' },
  { value: 'concluido', label: 'Concluídos' },
]

const summary = [
  {
    status: 'novo' as const,
    label: 'Novos',
    icon: Inbox,
    className: 'bg-[#FFF4D8] text-[#6F4C08]',
  },
  {
    status: 'em_atendimento' as const,
    label: 'Em atendimento',
    icon: Clock3,
    className: 'bg-[#E8F2FB] text-[#1E527C]',
  },
  {
    status: 'concluido' as const,
    label: 'Concluídos',
    icon: CheckCircle2,
    className: 'bg-[#E8F6EF] text-[#236247]',
  },
]

function sortNewest(records: ContactRecord[]) {
  return [...records].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export default function Panel() {
  usePageTitle('Painel de contatos')
  const navigate = useNavigate()
  const user = getCurrentUser()
  const [contacts, setContacts] = useState<ContactRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [filter, setFilter] = useState<FilterStatus>('todos')
  const [search, setSearch] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    listContacts()
      .then((records) => {
        if (active) setContacts(sortNewest(records))
      })
      .catch(() => {
        if (active) setLoadError(true)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  useRealtime<ContactRecord>('contacts', (event) => {
    setContacts((current) => {
      if (event.action === 'delete') return current.filter((item) => item.id !== event.record.id)
      const without = current.filter((item) => item.id !== event.record.id)
      return sortNewest([event.record, ...without])
    })
  })

  const counts = useMemo(
    () => ({
      novo: contacts.filter((item) => item.status === 'novo').length,
      em_atendimento: contacts.filter((item) => item.status === 'em_atendimento').length,
      concluido: contacts.filter((item) => item.status === 'concluido').length,
    }),
    [contacts],
  )

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('pt-BR')
    return contacts.filter((item) => {
      const matchesStatus = filter === 'todos' || item.status === filter
      const matchesName = !query || item.name.toLocaleLowerCase('pt-BR').includes(query)
      return matchesStatus && matchesName
    })
  }, [contacts, filter, search])

  async function changeStatus(record: ContactRecord, status: ContactStatus) {
    if (status === record.status || updatingId) return
    const previousStatus = record.status
    setUpdatingId(record.id)
    setContacts((current) =>
      current.map((item) => (item.id === record.id ? { ...item, status } : item)),
    )
    try {
      const updated = await updateContactStatus(record.id, status)
      setContacts((current) =>
        sortNewest(current.map((item) => (item.id === updated.id ? updated : item))),
      )
      toast.success('Status atualizado')
    } catch {
      setContacts((current) =>
        current.map((item) => (item.id === record.id ? { ...item, status: previousStatus } : item)),
      )
      toast.error('Não foi possível atualizar o status.')
    } finally {
      setUpdatingId(null)
    }
  }

  function logout() {
    signOut()
    navigate('/entrar', { replace: true })
    toast.success('Sessão encerrada.')
  }

  const initials = (user?.name || user?.email || 'ELO')
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-7 border-b border-[#DCE6EE] pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#8A651C]">
              Equipe ELO
            </p>
            <h1 className="mt-3 text-4xl font-extrabold uppercase tracking-[-0.04em] text-[#17324F] sm:text-5xl">
              Painel de Contatos
            </h1>
            <p className="mt-3 text-[#5B7186]">Acompanhe cada conversa, da chegada à conclusão.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/conta"
              className="flex min-h-12 items-center gap-3 rounded-full border border-[#DCE6EE] bg-white py-2 pl-2 pr-4 hover:border-[#C99A3C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A3C]"
            >
              <Avatar className="size-9 bg-[#17324F] text-white">
                <AvatarFallback className="bg-[#17324F] text-xs font-bold text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="max-w-44 text-sm font-bold text-[#17324F]">
                {user?.name || 'Equipe ELO'}
              </span>
            </Link>
            <Button
              type="button"
              variant="outline"
              onClick={logout}
              className="min-h-12 rounded-full border-[#C9D5DF] px-5 font-bold text-[#17324F] hover:bg-[#EAF1F7]"
            >
              <LogOut className="mr-2 size-4" aria-hidden="true" />
              Sair
            </Button>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto pb-2">
          <ul role="list" className="grid min-w-[42rem] grid-cols-3 gap-4">
            {summary.map((item) => {
              const Icon = item.icon
              return (
                <li
                  key={item.status}
                  className="rounded-2xl border border-[#DCE6EE] bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-[#5B7186]">{item.label}</p>
                      <p className="mt-1 text-3xl font-extrabold text-[#17324F]">
                        {counts[item.status]}
                      </p>
                    </div>
                    <span
                      className={`flex size-11 items-center justify-center rounded-full ${item.className}`}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-[#DCE6EE] bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-[#17324F]">Contatos recebidos</h2>
              <p role="status" className="mt-1 text-sm text-[#5B7186]">
                {filtered.length} {filtered.length === 1 ? 'contato exibido' : 'contatos exibidos'}
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
              <div>
                <span className="mb-2 block text-sm font-bold text-[#17324F]">
                  Filtrar por status
                </span>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por status">
                  {filters.map((item) => (
                    <Button
                      key={item.value}
                      type="button"
                      variant="outline"
                      aria-pressed={filter === item.value}
                      onClick={() => setFilter(item.value)}
                      className={`min-h-10 rounded-full px-4 text-sm font-bold ${filter === item.value ? 'border-[#17324F] bg-[#17324F] text-white hover:bg-[#1E4266] hover:text-white' : 'border-[#D1DCE5] text-[#506B82] hover:bg-[#EAF1F7]'}`}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="min-w-64">
                <Label htmlFor="search-contacts" className="mb-2 block font-bold text-[#17324F]">
                  Buscar por nome
                </Label>
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#5B7186]"
                    aria-hidden="true"
                  />
                  <Input
                    id="search-contacts"
                    type="search"
                    enterKeyHint="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Digite um nome"
                    className="min-h-11 rounded-xl border-[#C9D5DF] pl-9 focus-visible:ring-[#C99A3C]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          {loading ? (
            <div className="space-y-4" aria-label="Carregando contatos">
              {[0, 1, 2].map((item) => (
                <Skeleton key={item} className="min-h-52 w-full rounded-[1.75rem]" />
              ))}
            </div>
          ) : loadError ? (
            <div
              role="alert"
              className="rounded-[1.75rem] border border-[#E8C2BE] bg-[#FCECEA] p-10 text-center text-[#8C2C23]"
            >
              <p className="font-bold">Não foi possível carregar os contatos.</p>
              <p className="mt-2 text-sm">Atualize a página ou entre novamente.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-[#B8C8D5] bg-[#EAF1F7]/70 p-12 text-center">
              <UsersRound className="mx-auto size-10 text-[#5B7186]" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-extrabold text-[#17324F]">
                Nenhum contato por aqui ainda.
              </h3>
              <p className="mt-2 text-[#5B7186]">Altere os filtros ou aguarde um novo envio.</p>
            </div>
          ) : (
            <ul role="list" className="space-y-4">
              {filtered.map((record) => (
                <li
                  key={record.id}
                  className="rounded-[1.75rem] border border-[#DCE6EE] bg-white p-5 shadow-[0_8px_24px_rgba(23,50,79,0.06)] sm:p-7"
                >
                  <article className="grid gap-6 lg:grid-cols-[1fr_15rem] lg:items-start">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="break-words text-xl font-extrabold text-[#17324F]">
                          {record.name}
                        </h3>
                        <StatusBadge status={record.status} />
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#5B7186]">
                        <span className="inline-flex items-center gap-2 break-all">
                          <Mail className="size-4 shrink-0" aria-hidden="true" />
                          {record.contact}
                        </span>
                        <time dateTime={record.created}>{formatDate(record.created)}</time>
                      </div>
                      <p className="mt-5 whitespace-pre-wrap break-words border-l-2 border-[#C99A3C] pl-4 leading-relaxed text-[#334F67]">
                        {record.need}
                      </p>
                    </div>
                    <div>
                      <Label
                        htmlFor={`status-${record.id}`}
                        className="mb-2 block font-bold text-[#17324F]"
                      >
                        Atualizar status
                      </Label>
                      <Select
                        value={record.status}
                        onValueChange={(value) => changeStatus(record, value as ContactStatus)}
                        disabled={updatingId === record.id}
                      >
                        <SelectTrigger
                          id={`status-${record.id}`}
                          className="min-h-11 w-full rounded-xl border-[#C9D5DF] focus:ring-[#C99A3C]"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(statusLabels) as ContactStatus[]).map((status) => (
                            <SelectItem key={status} value={status}>
                              {statusLabels[status]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {updatingId === record.id && (
                        <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#5B7186]">
                          <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                          Gravando…
                        </p>
                      )}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
