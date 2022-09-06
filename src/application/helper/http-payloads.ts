import { ServerError } from '@application/errors'
import { HttpResponse } from '@application/protocols'

export const success = <T = any>(data: T): HttpResponse<T> => ({
	status_code: 200,
	data
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
	status_code: 400,
	data: error
})

export const serverError = (error: unknown): HttpResponse<Error> => ({
	status_code: 500,
	data: new ServerError(error instanceof Error ? error : undefined)
})