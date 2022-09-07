import { ServerError } from '@application/errors'
import { Controller, HttpResponse } from '@application/protocols'

class ControllerStub extends Controller {
	result: HttpResponse = {
		status_code: 200,
		data: 'any_data'
	}

	async execute (httpRequest: any): Promise<HttpResponse> {
		return this.result
	}
  
	validate(httpRequest: any): Error | undefined {
		return
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

	test('should return 500 if execute throws', async () => {
		const error = new Error('execute_error')
		jest.spyOn(sut, 'execute').mockRejectedValueOnce(error)
		const httpResponse = await sut.handle('any_value')

		expect(httpResponse).toEqual({
			status_code: 500,
			data: new ServerError(error)
		})
	})

	test('should return 500 if execute throws a non error object', async () => {
		jest.spyOn(sut, 'execute').mockRejectedValueOnce('execute_error')
		const httpResponse = await sut.handle('any_value')

		expect(httpResponse).toEqual({
			status_code: 500,
			data: new ServerError(undefined)
		})
	})

	test('should thows Error when validate returns Error', async () => {
		jest.spyOn(sut, 'validate').mockReturnValueOnce(new Error('validation_error'))
		const httpResponse = await sut.handle('any_value')

		expect(httpResponse).toEqual({
			status_code: 400,
			data: new Error('validation_error')
		})
	})
})