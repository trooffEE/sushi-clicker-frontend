import { ref } from 'vue'
import { useLoadingStore } from '@/stores/loading'
import { ofetch } from 'ofetch'
import { defineStore } from 'pinia'
import { useToastStore } from './toast'
import type { Response } from '@/types/response'

export enum HTTP_STATUS_CODE {
  ENTITY_CONFLUCTED = 409,
  TOKEN_EXPIRED = 401,
}

const APIBaseUrlDefault = import.meta.env.VITE_DEVELOPMENT ? 'http://localhost:3010/api' : ''
const APIHeadersDefault = {
  Accept: 'application/json',
}

export const useApiStore = defineStore('api', () => {
  const lStore = useLoadingStore()
  const uStore = useToastStore()
  const isTokenRequestInProgress = ref(false)

  const api = ofetch.create({
    baseURL: APIBaseUrlDefault,
    headers: APIHeadersDefault,
    credentials: 'include',
    onRequest({ options }) {
      lStore.incLoadingCounter()
      options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access-token'))
    },
    onResponse() {
      lStore.decLoadingCounter()
    },
    onRequestError() {
      lStore.decLoadingCounter()
    },
    onResponseError(_) {
      lStore.decLoadingCounter()

      const isLoginRequest = `${_.options.baseURL}/auth/login` === _.request
      const isRefreshToken = `${_.options.baseURL}/auth/refresh-token` === _.request

      console.log(isRefreshToken)
      if (isLoginRequest || isRefreshToken) {
        return
      }

      if (_.response.status === HTTP_STATUS_CODE.TOKEN_EXPIRED && !isTokenRequestInProgress.value) {
        isTokenRequestInProgress.value = true
        ofetch<Response<{ AccessToken: string }>>('/auth/refresh-token', {
          headers: _.options.headers,
          baseURL: _.options.baseURL,
          credentials: _.options.credentials,
        })
          .then(response => {
            localStorage.setItem('access-token', response.Payload.AccessToken)
          })
          // if error - we force to reload client app, because - refresh token wasn't able to proved access token
          .catch(() => {
            localStorage.setItem('access-token', '')
            if (window.location.href !== '/auth') {
              // window.location.href = '/auth'
            }
          })
          .finally(() => (isTokenRequestInProgress.value = false))
      }

      if (_.response.status !== HTTP_STATUS_CODE.TOKEN_EXPIRED) {
        uStore.makeErrorToast(_.response._data)
      }
    },
    retryStatusCodes: [HTTP_STATUS_CODE.TOKEN_EXPIRED],
    retryDelay: 500,
    retry: 1,
  })

  return {
    api,
  }
})
