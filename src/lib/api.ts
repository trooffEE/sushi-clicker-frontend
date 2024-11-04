import { ofetch } from 'ofetch'

const TOKEN_EXPIRED_STATUS_CODE = 401

export const api = ofetch.create({
  baseURL: import.meta.env.VITE_DEVELOPMENT ? 'http://localhost:3010/api' : '',
  onRequest(data) {
    const statusCode = data.response?.status

    if (statusCode === TOKEN_EXPIRED_STATUS_CODE) {
      // logic to create token before continue and reavoke code execution
    }
  },
})
