import { ofetch } from 'ofetch'

const HTTP_STATUS_CODE_TOKEN_EXPIRED_STATUS_CODE = 401

const HTTP_STATUS_CODE_ENTITY_CONFLICT = 409

export enum HTTP_STATUS_CODE {
  ENTITY_CONFLUCTED = HTTP_STATUS_CODE_ENTITY_CONFLICT,
}

export const api = ofetch.create({
  baseURL: import.meta.env.VITE_DEVELOPMENT ? 'http://localhost:3010/api' : '',
  onResponse(data) {
    const statusCode = data.response?.status

    if (statusCode === HTTP_STATUS_CODE_TOKEN_EXPIRED_STATUS_CODE) {
      // logic to create token before continue and reavoke code execution
    }
  },
})
