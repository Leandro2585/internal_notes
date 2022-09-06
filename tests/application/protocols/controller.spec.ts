import { Controller, HttpResponse } from '@application/protocols'

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