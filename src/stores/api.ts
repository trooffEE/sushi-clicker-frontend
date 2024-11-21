import { ref } from 'vue'
import { useLoadingStore } from '@/stores/loading'
import { ofetch } from 'ofetch'
import { defineStore } from 'pinia'
import { useToastStore } from './toast'

export enum HTTP_STATUS_CODE {
  ENTITY_CONFLUCTED = 409,
  TOKEN_EXPIRED = 401,
}

const APIBaseUrlDefault = import.meta.env.VITE_DEVELOPMENT
  ? 'http://localhost:3010/api'
  : ''
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
      options.headers.set(
        'Authorization',
        'Bearer ' + localStorage.getItem('access-token'),
      )
    },
    onResponse() {
      lStore.decLoadingCounter()
    },
    onResponseError(_) {
      lStore.decLoadingCounter()

      const isLoginRequest = _.options.baseURL + '/auth/login' === _.request
      if (isLoginRequest) {
        return
      }

      if (
        _.response.status === HTTP_STATUS_CODE.TOKEN_EXPIRED &&
        !isTokenRequestInProgress.value
      ) {
        isTokenRequestInProgress.value = true
        ofetch('/auth/refresh-token', {
          headers: _.options.headers,
          baseURL: _.options.baseURL,
          credentials: _.options.credentials,
        })
          .then(response =>
            localStorage.setItem('access-token', response.AccessToken),
          )
          // if error - we force to reload client app, because - refresh token wasn't able to proved access token
          .catch(() => (window.location.href = '/auth'))
          .finally(() => (isTokenRequestInProgress.value = false))
      }

      if (_.response.status !== HTTP_STATUS_CODE.TOKEN_EXPIRED) {
        uStore.makeErrorAPIToast(_.response._data)
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
