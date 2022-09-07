import { LoadPostByIdRepository, LoadPostsRepository } from '@data/protocols/repositories'
import { NotFoundError } from '@domain/errors'
import { PostTypes } from '@domain/models'
import { CreateCommentUseCase } from '@domain/usecases/create-comment-usecase'
import { CommentEntity, UserEntity } from '@infra/database/entities'
import { mockedPostEntity } from '@tests/domain/mocks'
import { mock, MockProxy } from 'jest-mock-extended'

export interface CreateCommentRepository {
  create(input: CreateCommentRepository.Input): Promise<CreateCommentRepository.Output>
}

export namespace CreateCommentRepository {
  export type Input = { 
    comment: string
    user_id: number
    post_id: number
  }

  export type Output = {
    comment: CommentEntity
  }
}

export interface LoadUserByIdRepository {
  loadById(input: LoadUserByIdRepository.Input): Promise<LoadUserByIdRepository.Output>
}
export namespace LoadUserByIdRepository {
  export type Input = { user_id: number }

  export type Output = { user: UserEntity }
}

export class CreateCommentService implements CreateCommentUseCase {
	constructor (
    private readonly postsRepository: LoadPostByIdRepository, 
		// private readonly usersRepository: LoadUserByIdRepository, 
		// private readonly commentsRepository: CreateCommentRepository
	) {}
	async execute({ post_id }: CreateCommentUseCase.Input): Promise<CreateCommentUseCase.Output> {
		const { post: existing_post } = await this.postsRepository.loadById({ post_id })
		if(existing_post == undefined) throw new NotFoundError('posts')
		await Promise.resolve(null)
		return {
			comment: {
				post_id: 1,
				username: 'string',
				comment: 'string',
				type: PostTypes.ORIGINAL,
				created_at: '',
				updated_at: ''
			}
		}
	}
}

describe('create comment usecase', () => {
	let sut: CreateCommentService
	let postsRepository: MockProxy<LoadPostByIdRepository>

	beforeAll(() => {
		postsRepository = mock()
		postsRepository.loadById.mockResolvedValue({ post: mockedPostEntity() })
	})

	beforeEach(() => {
		sut = new CreateCommentService(postsRepository)
	})

	test('should call LoadPostById with correct input', async () => {
		await sut.execute({ comment: 'any_comment', post_id: 1, user_id: 1 })

		expect(postsRepository.loadById).toHaveBeenCalledWith({ post_id: 1 })
		expect(postsRepository.loadById).toHaveBeenCalledTimes(1)
	})

	test('should throw NotFoundError if post not exists', async () => {
		postsRepository.loadById.mockResolvedValueOnce({ post: undefined })
		const promise = sut.execute({ comment: 'any_comment', post_id: 2, user_id: 1 })

		await expect(promise).rejects.toThrow(new NotFoundError('posts'))
	})
})