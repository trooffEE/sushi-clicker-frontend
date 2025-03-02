import { defineStore } from 'pinia'
import { useWebSocket } from '@vueuse/core'
import { getAccessToken } from '@/lib/accessToken'
import { watch } from 'vue'

export const useWebSocketClient = defineStore('websocketClient', () => {
	const {
		status,
		data,
		send: wsSend,
		close,
	} = useWebSocket(`ws://localhost:3010/ws?token=${getAccessToken()}`, {
		autoReconnect: {
			retries: 3,
			delay: 200,
			onFailed() {
				console.error('Failed to reconnect to socket')
			},
		},
	})

	const send = (payload) => {
		const serializedPayload = JSON.stringify(payload)
		wsSend(serializedPayload)
	}

	watch(
		() => data.value,
		(d) => {
			console.log(d)
		},
	)

	return {
		data,
		send,
		status,
		close,
	}
})
