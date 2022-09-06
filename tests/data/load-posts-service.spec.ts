import { mock, MockProxy } from 'jest-mock-extended'

import { LoadAllPostsRepository } from '@data/protocols/repositories'
import { LoadPostsService } from '@data/services'
import { mockedPost } from '@tests/domain/mocks'


describe('Load Posts Service', () => {
	let postsRepository: MockProxy<LoadAllPostsRepository>
	let sut: LoadPostsService

	beforeAll(() => {
		postsRepository = mock()
		postsRepository.loadAll.mockResolvedValue({ results: [mockedPost()] })
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