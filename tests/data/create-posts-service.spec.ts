import { mock, MockProxy } from 'jest-mock-extended'
import { CreatePostRepository, LoadPostByIdRepository, LoadPostsRepository } from '@data/protocols/repositories'
import { mockedPostEntity } from '@tests/domain/mocks'
import { CreatePostsService } from '@data/services'
import { PostTypes } from '@domain/models'
import { CreationLimitExceeded, NotFoundError } from '@domain/errors'

describe('create posts service', () => {
	let sut: CreatePostsService
	let postsRepository: MockProxy<LoadPostByIdRepository & CreatePostRepository & LoadPostsRepository>

	beforeAll(() => {
		postsRepository = mock()
		postsRepository.loadById.mockResolvedValue({ post: mockedPostEntity() })
		postsRepository.create.mockResolvedValue({ post: mockedPostEntity() })
		postsRepository.load.mockResolvedValue({ results: [1,2,3,4].map((o) => mockedPostEntity())})
	})

	beforeEach(() => {
		sut = new CreatePostsService(postsRepository)
	})

	test('should call LoadPostByIdRepository when post_id is provided', async () => {
		await sut.execute({ user_id: 1, post_id: 1 })

		expect(postsRepository.loadById).toHaveBeenCalledWith({ post_id: 1 })
		expect(postsRepository.loadById).toHaveBeenCalledTimes(1)
	})

	test('should call CreatePostRepository to create a new post with repost when post_id is provided', async () => {
		await sut.execute({ user_id: 1, post_id: 1 })

		expect(postsRepository.create).toHaveBeenCalledWith({
			user_id: 1,
			description: 'any_description',
			type: PostTypes.REPOST
		})
		expect(postsRepository.create).toHaveBeenCalledTimes(1)
	})

	test('should create a new post when post_id is not provided', async () => {
		await sut.execute({ user_id: 1, post: { description: 'any_description' }})

		expect(postsRepository.create).toHaveBeenCalledWith({
			user_id: 1,
			description: 'any_description',
			type: PostTypes.ORIGINAL
		})
	})

	test('should thows NotFoundError when no post is found with the same id', async () => {
		postsRepository.loadById.mockResolvedValue({ post: undefined })
		const promise = sut.execute({ user_id: 1, post_id: 1 })

		await expect(promise).rejects.toThrow(new NotFoundError())
	})

	test('should throws CreationLimitExceededError when user create more than 5 posts in the same day', async () => {
		postsRepository.load.mockResolvedValue({ results: [1,2,3,4,5].map((o) => mockedPostEntity())})
		const promise = sut.execute({ user_id: 1, post_id: 1 })

		await expect(promise).rejects.toThrow(new CreationLimitExceeded())
	})
})