export type Response<T extends object | number | string | Record<string, any> | null> = {
	Success: boolean
	Payload: T
	Code: number
}
