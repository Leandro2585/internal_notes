import { mock, MockProxy } from 'jest-mock-extended'

import { LoadAllPostsRepository } from '@data/protocols'
import { LoadPostsService } from '@data/services'
import { PostModel } from '@domain/models'


describe('Load Posts Service', () => {
	let mockedPost: PostModel
	let postsRepository: MockProxy<LoadAllPostsRepository>
	let sut: LoadPostsService

	beforeAll(() => {
		postsRepository = mock()
		mockedPost = { 
			id: 1, 
			description: 'any_description', 
			created_at: '2022-09-06T02:07:12.642Z', 
			updated_at: '2022-09-06T02:07:39.695Z'
		}
		postsRepository.loadAll.mockResolvedValue({ results: [mockedPost] })
	})

	beforeEach(() => {
		sut = new LoadPostsService(postsRepository)
	})

	test('should call LoadAllPostsRepository with correct input', async () => {
		await sut.execute({ page: 1 })

		expect(postsRepository.loadAll).toHaveBeenCalledWith({ page: 1 })
		expect(postsRepository.loadAll).toHaveBeenCalledTimes(1)
	})

	test('should return correct results on success', async () => {
		const response = await sut.execute({ page: 1 })

		expect(response).toMatchObject({
			results: [mockedPost],
			currentPage: 1
		})
	})

})