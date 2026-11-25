import type { RecordModel } from 'pocketbase'

export type ContactStatus = 'novo' | 'em_atendimento' | 'concluido'

export interface ContactRecord extends RecordModel {
  name: string
  contact: string
  need: string
  status: ContactStatus
  created: string
  updated: string
}

export interface NewContact {
  name: string
  contact: string
  need: string
}
