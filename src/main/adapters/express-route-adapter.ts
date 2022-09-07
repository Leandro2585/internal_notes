import { Request, Response } from 'express'
import { Controller } from '@application/protocols'

export const adaptRoute = (controller: Controller) => {
	return async (request: Request, response: Response) => {
		const httpRequest = {
			...(request.body || {}),
			...(request.headers || {}),
			...(request.query || {}),
			...(request.params || {})
		}
		const { data, status_code } = await controller.handle(httpRequest)
		const json = [200, 204].includes(status_code) ? data : { error: data.message }
		response.status(status_code).json(json)
	}
}