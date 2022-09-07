import { success } from '@application/helper'
import { Controller, HttpResponse } from '@application/protocols'
import { LoadPostsUseCase } from '@domain/usecases'
import { LoadPostsUseCaseSpy } from '../fakes/load-posts-usecase-spy'

export class LoadPostsController extends Controller {
	constructor (private readonly loadPosts: LoadPostsUseCase){ super() }

	async execute(httpRequest: any): Promise<HttpResponse> {
		const { page, initial_date, final_date, user_id } = httpRequest
		await this.loadPosts.execute({ page, initial_date, final_date, user_id })
		return success('test')
	}
}

describe('load posts controller', () => {
	let loadPostsUseCaseSpy: LoadPostsUseCaseSpy
	let request: { page: number }
	let sut: LoadPostsController

	beforeAll(() => {
		request = { page: 1 }
		loadPostsUseCaseSpy = new LoadPostsUseCaseSpy()
	})

	beforeEach(() => {
		sut = new LoadPostsController(loadPostsUseCaseSpy)
	})

	test('should extend controller', () => {
		expect(sut).toBeInstanceOf(Controller)
	})

	test('should call load posts usecase with correct input', async () => {
		await sut.handle(request)
    
		expect(loadPostsUseCaseSpy.input).toEqual({ page: 1, user_id: undefined, initial_date: undefined, final_date: undefined })
	})
})