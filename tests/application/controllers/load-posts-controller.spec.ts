import { success } from '@application/helper'
import { Controller, HttpResponse } from '@application/protocols'

export class LoadPostsController extends Controller {
	async execute(httpRequest: any): Promise<HttpResponse> {
		await new Promise(resolve => resolve(null))
		return success('test')
	}
}

describe('load posts controller', () => {
	let sut: LoadPostsController

	beforeEach(() => {
		sut = new LoadPostsController()
	})

	test('should extend controller', () => {
		expect(sut).toBeInstanceOf(Controller)
	})
})