import { mock, MockProxy } from 'jest-mock-extended'

import { LoadPostsRepository } from '@data/protocols/repositories'
import { LoadPostsService } from '@data/services'
import { mockedPostEntity } from '@tests/domain/mocks'
import { PostTypes } from '@domain/models'


describe('load posts service', () => {
	let postsRepository: MockProxy<LoadPostsRepository>
	let sut: LoadPostsService

	beforeAll(() => {
		postsRepository = mock()
		postsRepository.load.mockResolvedValue({ results: [mockedPostEntity()] })
	})

	beforeEach(() => {
		sut = new LoadPostsService(postsRepository)
	})

	test('should call LoadPostsRepository with correct input', async () => {
		await sut.execute({ page: 1 })

		expect(postsRepository.load).toHaveBeenCalledWith({ page: 1 })
		expect(postsRepository.load).toHaveBeenCalledTimes(1)
	})

	test('should return correct results on success', async () => {
		const response = await sut.execute({ page: 1 })

		expect(response).toEqual({
			current_page: 1,
			results: [{
				id: 1,
				user_id: 1,
				description: 'any_description',
				type: PostTypes.ORIGINAL,
				created_at: '30 de agosto de 2022',
				updated_at: '30 de agosto de 2022',
			}],
		})
	})

})