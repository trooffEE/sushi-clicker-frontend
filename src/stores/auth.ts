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

  const refresh = async () => {
    return (
      aStore
        .api('/auth/refresh-token')
        .then(response => {
          console.log(response)
          localStorage.setItem('access-token', response.Payload.AccessToken)
        })
        // if error - we force to reload client app, because - refresh token wasn't able to proved access token
        .catch(error => {
          console.log(error)
          localStorage.setItem('access-token', '')
          window.location.href = '/auth'
        })
    )
  }

  return {
    isAuthenticated,
    login,
    register,
    refresh,
  }
})
