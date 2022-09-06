import { badRequest, serverError } from '@application/helper'
import { HttpResponse } from '@application/protocols'
import { Validator } from './validators'


interface IController {
  execute(httpRequest: any): Promise<HttpResponse>
  handle(httpRequest: any): Promise<HttpResponse>
  buildValidators(httpRequest: any): Validator[]
}

abstract class Controller implements IController {
	abstract execute(httpRequest: any): Promise<HttpResponse>

	buildValidators(httpRequest: any): Validator[] {
		return []
	}

	async handle(httpRequest: any): Promise<HttpResponse> {
		// const error = this.validate(httpRequest)
		// if (error !== undefined) {
		// 	return badRequest(error)
		// }
		try {
			return await this.execute(httpRequest)
		} catch (error) {
			return serverError(error)
		}
	}

	// private validate (httpRequest: any): Error | undefined {
	// 	const validators = this.buildValidators(httpRequest)
	// 	return new ValidationComposite(validators).validate()
	// }
}

class ControllerStub extends Controller {
	result: HttpResponse = {
		status_code: 200,
		data: 'any_data'
	}

	async execute (httpRequest: any): Promise<HttpResponse> {
		return this.result
	}
}

describe('controller', () => {
	let sut: ControllerStub

	beforeEach(() => {
		sut = new ControllerStub()
	})

	test('should return same result as execute', async () => {
		const httpResponse = await sut.handle('any_value')

		expect(httpResponse).toEqual(sut.result)
	})
})