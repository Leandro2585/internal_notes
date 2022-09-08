import { mock, MockProxy } from 'jest-mock-extended'

import { CountPostsRepository, LoadPostsRepository, LoadUserByIdRepository } from '@data/protocols/repositories'
import { mockedPostEntity, mockedUserEntity } from '@tests/domain/mocks'
import { NotFoundError } from '@domain/errors'
import { LoadProfileService } from '@data/services'

describe('load profile service', () => {
	let sut: LoadProfileService
	let postsRepository: MockProxy<LoadPostsRepository & CountPostsRepository>
	let usersRepository: MockProxy<LoadUserByIdRepository>

	beforeAll(() => {
		postsRepository = mock()
		usersRepository = mock()
		postsRepository.load.mockResolvedValue({ results: [mockedPostEntity()] })
		postsRepository.count.mockResolvedValue({ total_posts: 1 })
		usersRepository.loadById.mockResolvedValue({ user: mockedUserEntity() })
	})

	beforeEach(() => {
		sut = new LoadProfileService(usersRepository, postsRepository)
	})

	test('should call LoadPostsRepository with correct input', async () => {
		await sut.execute({ user_id: 1 })

		expect(postsRepository.load).toHaveBeenCalledWith({ user_id: 1, page: 1, limit: 5 })
		expect(postsRepository.load).toHaveBeenCalledTimes(1)
	})

	test('should throw NotFoundError if user not exists', async () => {
		usersRepository.loadById.mockResolvedValueOnce({ user: undefined })
		const promise = sut.execute({ user_id: 1 })

		await expect(promise).rejects.toThrow(new NotFoundError('users'))
	})
})