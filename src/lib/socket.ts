import { getAccessToken } from './accessToken'

export const createNewWebSocketConnection = () => {
	const socket = new WebSocket(`ws://localhost:3010/ws?token=${getAccessToken()}`)
	if (!socket) return

	socket.onopen = () => {
		console.log('Successfly connected to /ws')
	}

	socket.onerror = (error) => {
		console.log('Something went wrong on ', error)
	}

	socket.onclose = (error) => {
		console.log("Bye-bye i'm closing", error)
	}

	socket.onclose = (error) => {
		console.log("Bye-bye i'm closing", error)
	}
}
