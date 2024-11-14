import { ofetch } from 'ofetch'

export enum HTTP_STATUS_CODE {
  ENTITY_CONFLUCTED = 409,
  TOKEN_EXPIRED = 401,
}

const APIBaseUrlDefault = import.meta.env.VITE_DEVELOPMENT
  ? 'http://localho.st:3010/api'
  : ''
const APIHeadersDefault = {
  Accept: 'application/json',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': '*',
}

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
    if (_.response.status === HTTP_STATUS_CODE.TOKEN_EXPIRED) {
      console.log(_.request)
      ofetch(_.options.baseURL + '/auth/refresh-token')
    }
  },
})
