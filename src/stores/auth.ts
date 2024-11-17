import type { AuthZodSchemaType } from '@/components/forms/validation/auth'
import { api } from '@/lib/api'
import { defineStore } from 'pinia'
import { useToastStore } from './toast'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const { makeErrorAPIToast } = useToastStore()
  const isAuthenticated = ref(false)

  const login = async (payload: AuthZodSchemaType) => {
    return api('/auth/login', {
      method: 'POST',
      body: payload,
    })
      .then(data => {
        localStorage.setItem('token', data.AccessToken)
      })
      .catch((err: { data: string }) => {
        makeErrorAPIToast(err.data)
      })
  }

  const register = async (payload: AuthZodSchemaType) => {
    return api('/auth/register', {
      method: 'POST',
      body: payload,
    }).catch((err: { data: string }) => makeErrorAPIToast(err.data))
  }

  return {
    isAuthenticated,
    login,
    register,
  }
})
