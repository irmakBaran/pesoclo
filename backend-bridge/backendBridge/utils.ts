import type { IApiError } from './types'

export class ApiError extends Error {
  public status: number
  public statusText: string
  public response?: {
    error_id?: string
    error_type?: string
    error_code?: string
    error_message?: string
  }

  constructor(error: IApiError) {
    super()
    this.message = `${error.status} ${error.statusText}`
    this.status = error.status
    this.statusText = error.statusText
    this.response = error.response
  }
}
