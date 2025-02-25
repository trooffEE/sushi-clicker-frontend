import type { AuthZodSchemaType } from '@/components/forms/validation/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApiStore } from './api'
import type { Response } from '@/types/response'
import { clearAccessToken, hasAccessToken, saveAccessToken } from '@/lib/accessToken'
import { endpoint } from '@/api/endpoints'

export const useAuthStore = defineStore('auth', () => {
	const aStore = useApiStore()
	const isAuthenticated = ref(Boolean(hasAccessToken()))

	const login = async (payload: AuthZodSchemaType) => {
		return aStore
			.api<Response<{ AccessToken: string }>>(endpoint.auth.login, {
				method: 'POST',
				body: payload,
			})
			.then((data) => {
				saveAccessToken(data.Payload.AccessToken)
				isAuthenticated.value = true
			})
	}

	const register = async (payload: AuthZodSchemaType) => {
		return aStore
			.api<Response<{ AccessToken: string }>>(endpoint.auth.register, {
				method: 'POST',
				body: payload,
			})
			.then((data) => {
				saveAccessToken(data.Payload.AccessToken)
				isAuthenticated.value = true
			})
	}

	const refresh = async () => {
		return aStore
			.api('/auth/refresh-token')
			.then((response) => saveAccessToken(response.Payload.AccessToken))
			.catch(() => {
				clearAccessToken()
				if (window.location.pathname !== '/auth') {
					window.location.href = '/auth'
				}
			})
	}

	return {
		isAuthenticated,
		login,
		register,
		refresh,
	}
})
