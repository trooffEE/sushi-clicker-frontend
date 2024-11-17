import { ofetch } from 'ofetch'

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

let isTokenRequestInProgress = false

export const api = ofetch.create({
  baseURL: APIBaseUrlDefault,
  headers: APIHeadersDefault,
  credentials: 'include',
  onRequest({ options }) {
    options.headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token'),
    )
  },
  onResponseError(_) {
    const isLoginRequest = _.options.baseURL + '/auth/login' === _.request
    if (isLoginRequest) {
      return
    }

    if (
      _.response.status === HTTP_STATUS_CODE.TOKEN_EXPIRED &&
      !isTokenRequestInProgress
    ) {
      isTokenRequestInProgress = true
      ofetch('/auth/refresh-token', {
        headers: _.options.headers,
        baseURL: _.options.baseURL,
        credentials: _.options.credentials,
      })
        .then(response => {
          localStorage.setItem('token', response.AccessToken)
        })
        .finally(() => (isTokenRequestInProgress = false))
    }
  },
  retryStatusCodes: [HTTP_STATUS_CODE.TOKEN_EXPIRED],
  retryDelay: 500,
  retry: 1,
})
