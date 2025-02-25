import { ref } from 'vue'
import { useLoadingStore } from '@/stores/loading'
import { ofetch } from 'ofetch'
import { defineStore } from 'pinia'
import { useToastStore } from './toast'
import type { Response } from '@/types/response'
import { clearAccessToken, getAccessToken, saveAccessToken } from '@/lib/accessToken'
import { endpoint } from '@/api/endpoints'

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
			const accessToken = getAccessToken()
			options.headers.set('Authorization', `Bearer ${accessToken}`)
			lStore.incLoadingCounter()
		},
		onResponse() {
			lStore.decLoadingCounter()
		},
		onRequestError() {
			lStore.decLoadingCounter()
		},
		onResponseError(_) {
			lStore.decLoadingCounter()

			const isLoginRequest = `${_.options.baseURL}${endpoint.auth.login}` === _.request
			const isRefreshToken = `${_.options.baseURL}${endpoint.auth.refreshToken}` === _.request

			if (isLoginRequest || isRefreshToken) {
				return
			}

			if (_.response.status === HTTP_STATUS_CODE.TOKEN_EXPIRED && !isTokenRequestInProgress.value) {
				isTokenRequestInProgress.value = true
				ofetch<Response<{ AccessToken: string }>>(endpoint.auth.refreshToken, {
					headers: _.options.headers,
					baseURL: _.options.baseURL,
					credentials: _.options.credentials,
				})
					.then((response) => saveAccessToken(response.Payload.AccessToken))
					// if error - we force to reload client app, because - refresh token wasn't able to proved access token
					.catch(() => {
						clearAccessToken()
						if (window.location.pathname !== '/auth') {
							window.location.href = '/auth'
						}
					})
					.finally(() => (isTokenRequestInProgress.value = false))
			}

			if (_.response.status !== HTTP_STATUS_CODE.TOKEN_EXPIRED) {
				uStore.makeErrorToast('', _.response._data.Reason)
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
