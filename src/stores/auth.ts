import type { AuthZodSchemaType } from '@/components/forms/validation/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApiStore } from './api'
import type { Response } from '@/types/response'

export const useAuthStore = defineStore('auth', () => {
  const aStore = useApiStore()
  const isAuthenticated = ref(Boolean(localStorage.getItem('access-token')))

  const login = async (payload: AuthZodSchemaType) => {
    return aStore
      .api<Response<{ AccessToken: string }>>('/auth/login', {
        method: 'POST',
        body: payload,
      })
      .then(data => {
        localStorage.setItem('access-token', data.Payload.AccessToken)
        isAuthenticated.value = true
      })
  }

  const register = async (payload: AuthZodSchemaType) => {
    return aStore.api('/auth/register', {
      method: 'POST',
      body: payload,
    })
  }

  return {
    isAuthenticated,
    login,
    register,
  }
})
