import { mock, MockProxy } from 'jest-mock-extended'
import { CreatePostRepository, LoadPostByIdRepository } from '@data/protocols/repositories'
import { mockedPostEntity, mockEmptyPostEntity } from '@tests/domain/mocks'
import { CreatePostsUseCase } from '@domain/usecases'
import { PostEntity } from '@infra/database/entities'
import { formatDate } from '@domain/helpers'
import { PostTypes } from '@domain/models'

export class CreatePostsService {
	constructor (private readonly postsRepository: LoadPostByIdRepository & CreatePostRepository) {}

	async execute({ user_id, post, post_id }: CreatePostsUseCase.Input): Promise<CreatePostsUseCase.Output> {
		let created_post: PostEntity = mockEmptyPostEntity()
		if (post_id) {
			const { post: { description } } = await this.postsRepository.loadById({ post_id })
			created_post = await (await this.postsRepository.create({ description, user_id, type: PostTypes.REPOST })).post
		} else if (post) {
			created_post = (await this.postsRepository.create({ ...post, user_id, type: PostTypes.ORIGINAL })).post
		}
		return { 
			post: {
				...created_post, 
				created_at: formatDate(created_post.created_at),
				updated_at: formatDate(created_post.updated_at),
			}
		}
	}
}

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