const AccessTokenKey = 'access-token'

export const saveAccessToken = (token: string) => {
	localStorage.setItem(AccessTokenKey, token)
}

export const clearAccessToken = () => {
	localStorage.removeItem(AccessTokenKey)
}

export const getAccessToken = () => {
	return localStorage.getItem(AccessTokenKey)
}

export const hasAccessToken = () => {
	return getAccessToken() !== null
}
