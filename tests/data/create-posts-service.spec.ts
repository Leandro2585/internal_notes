import { mock, MockProxy } from 'jest-mock-extended'
import { CreatePostRepository, LoadPostByIdRepository } from '@data/protocols/repositories'
import { mockedPostEntity } from '@tests/domain/mocks'
import { CreatePostsService } from './services/create-posts-service'
import { PostTypes } from '@domain/models'

describe('create posts service', () => {
	let sut: CreatePostsService
	let postsRepository: MockProxy<LoadPostByIdRepository & CreatePostRepository>

	beforeAll(() => {
		postsRepository = mock()
		postsRepository.loadById.mockResolvedValue({ post: mockedPostEntity() })
		postsRepository.create.mockResolvedValue({ post: mockedPostEntity() })
	})

	beforeEach(() => {
		sut = new CreatePostsService(postsRepository)
	})

	test('should call LoadPostByIdRepository when post_id is provided', async () => {
		await sut.execute({ user_id: 1, post_id: 1 })

		expect(postsRepository.loadById).toHaveBeenCalledWith({ post_id: 1 })
		expect(postsRepository.loadById).toHaveBeenCalledTimes(1)
	})

	test('should create a new post when post_id is not provided', async () => {
		await sut.execute({ user_id: 1, post: { description: 'any_description' }})

		expect(postsRepository.create).toHaveBeenCalledWith({
			user_id: 1,
			description: 'any_description',
			type: PostTypes.ORIGINAL
		})
	})
})