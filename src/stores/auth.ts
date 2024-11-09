import type { AuthZodSchemaType } from '@/components/forms/validation/auth'
import { api, HTTP_STATUS_CODE } from '@/lib/api'
import { defineStore } from 'pinia'
import { useToastStore } from './toast'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    async login(payload: AuthZodSchemaType) {
      return api<undefined>('/auth/login', {
        method: 'POST',
        body: payload,
      })
    },
    async register(payload: AuthZodSchemaType) {
      return api('/auth/register', {
        method: 'POST',
        body: payload,
      }).catch(err => {
        if (err.status === HTTP_STATUS_CODE.ENTITY_CONFLUCTED) {
          const { makeErrorAPIToast } = useToastStore()
          makeErrorAPIToast(err.data)
        }
      })
    },
  },
})
