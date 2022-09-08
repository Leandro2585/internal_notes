import { mock, MockProxy } from 'jest-mock-extended'

import { CreateCommentRepository, LoadPostByIdRepository, LoadUserByIdRepository } from '@data/protocols/repositories'
import { mockedCommentEntity, mockedPostEntity, mockedUserEntity } from '@tests/domain/mocks'
import { CreateCommentService } from '@data/services'
import { NotFoundError } from '@domain/errors'

describe('create comment service', () => {
	let sut: CreateCommentService
	let postsRepository: MockProxy<LoadPostByIdRepository>
	let usersRepository: MockProxy<LoadUserByIdRepository>
	let commentsRepository: MockProxy<CreateCommentRepository>

	beforeAll(() => {
		postsRepository = mock()
		usersRepository = mock()
		commentsRepository = mock()
		postsRepository.loadById.mockResolvedValue({ post: mockedPostEntity() })
		usersRepository.loadById.mockResolvedValue({ user: mockedUserEntity() })
		commentsRepository.create.mockResolvedValue({ comment: mockedCommentEntity() })
	})

	beforeEach(() => {
		sut = new CreateCommentService(postsRepository, usersRepository, commentsRepository)
	})

	test('should call LoadPostById with correct input', async () => {
		await sut.execute({ comment: 'any_comment', post_id: 1, user_id: 1 })

		expect(postsRepository.loadById).toHaveBeenCalledWith({ post_id: 1 })
		expect(postsRepository.loadById).toHaveBeenCalledTimes(1)
	})

	test('should throw NotFoundError if post not exists', async () => {
		postsRepository.loadById.mockResolvedValueOnce({ post: undefined })
		const promise = sut.execute({ comment: 'any_comment', post_id: 2, user_id: 1 })

		await expect(promise).rejects.toThrow(new NotFoundError('original posts'))
	})

	test('should call LoadUserById with correct input', async () => {
		await sut.execute({ comment: 'any_comment', post_id: 1, user_id: 1 })

		expect(usersRepository.loadById).toHaveBeenCalledWith({ user_id: 1 })
		expect(usersRepository.loadById).toHaveBeenCalledTimes(1)
	})

	test('should throw NotFoundError if user not exists', async () => {
		usersRepository.loadById.mockResolvedValueOnce({ user: undefined })
		const promise = sut.execute({ comment: 'any_comment', post_id: 1, user_id: 2 })

		await expect(promise).rejects.toThrow(new NotFoundError('users'))
	})

	test('should call CreateCommentRepository with correct input', async () => {
		await sut.execute({ user_id: 1, post_id: 1, comment: 'any_comment' })

		expect(commentsRepository.create).toHaveBeenCalledWith({ user_id: 1, post_id: 1, comment: 'any_comment' })
		expect(commentsRepository.create).toHaveBeenCalledTimes(1)
	})
})