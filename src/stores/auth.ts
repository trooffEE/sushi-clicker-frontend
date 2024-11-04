import type { AuthZodSchemaType } from '@/components/forms/validation/auth'
import { api } from '@/lib/api'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    async login(payload: AuthZodSchemaType) {
      api('/login', {
        method: 'POST',
        body: payload,
      })
    },
  },
})
