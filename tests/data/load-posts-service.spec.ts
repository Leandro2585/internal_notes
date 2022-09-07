import { mock, MockProxy } from 'jest-mock-extended'

import { LoadAllPostsRepository } from '@data/protocols/repositories'
import { LoadPostsService } from '@data/services'
import { mockedPostEntity } from '@tests/domain/mocks'
import { PostTypes } from '@domain/models'


describe('Load Posts Service', () => {
	let postsRepository: MockProxy<LoadAllPostsRepository>
	let sut: LoadPostsService

	beforeAll(() => {
		postsRepository = mock()
		postsRepository.loadAll.mockResolvedValue({ results: [mockedPostEntity()] })
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