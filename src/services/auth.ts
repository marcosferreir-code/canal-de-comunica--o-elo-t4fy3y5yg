import type { RecordModel } from 'pocketbase'

import pb from '@/lib/pocketbase/client'

export interface EloUser extends RecordModel {
  email: string
  name: string
  avatar: string
}

const users = pb.collection<EloUser>('users')

export function signIn(email: string, password: string) {
  return users.authWithPassword(email, password)
}

export function signOut() {
  pb.authStore.clear()
}

export function requestPasswordReset(email: string) {
  return users.requestPasswordReset(email)
}

export function confirmPasswordReset(token: string, password: string) {
  return users.confirmPasswordReset(token, password, password)
}

export function confirmEmailVerification(token: string) {
  return users.confirmVerification(token)
}

export function requestEmailChange(email: string) {
  return users.requestEmailChange(email)
}

export function confirmEmailChange(token: string, password: string) {
  return users.confirmEmailChange(token, password)
}

export function getCurrentUser() {
  return pb.authStore.record as EloUser | null
}

export function isAuthenticated() {
  return pb.authStore.isValid
}

export { pb }
