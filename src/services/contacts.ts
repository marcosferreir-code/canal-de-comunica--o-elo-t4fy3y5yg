import pb from '@/lib/pocketbase/client'
import type { ContactRecord, ContactStatus, NewContact } from '@/types/contact'

const contacts = pb.collection<ContactRecord>('contacts')

export function listContacts() {
  return contacts.getFullList({ sort: '-created' })
}

export function createContact(input: NewContact) {
  return contacts.create({
    name: input.name,
    contact: input.contact,
    need: input.need,
    status: 'novo',
  })
}

export function updateContactStatus(id: string, status: ContactStatus) {
  return contacts.update(id, { status })
}
