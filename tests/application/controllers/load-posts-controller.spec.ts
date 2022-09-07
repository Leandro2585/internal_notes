import { Controller } from '@application/protocols'
import { LoadPostsController } from '@application/controllers'
import { LoadPostsUseCaseSpy } from '../fakes/load-posts-usecase-spy'

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
    
		expect(loadPostsUseCaseSpy.input).toEqual({ 
			page: 1, 
			user_id: undefined, 
			initial_date: undefined,
			final_date: undefined 
		})
	})

	test('should call load posts usecase with correct data structure', async () => {
		await sut.handle({
			user_id: '1',
			page: '1'
		})
    
		expect(loadPostsUseCaseSpy.input).toEqual({ 
			page: 1, 
			user_id: 1, 
			initial_date: undefined,
			final_date: undefined 
		})
	})
})