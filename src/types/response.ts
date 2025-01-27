export type Response<T extends object | number | string | Record<string, any>> =
  {
    Success: boolean
    Payload: T
    Code: number
  }
