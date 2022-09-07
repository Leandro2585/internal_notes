import { LoadPostByIdRepository } from '@data/protocols/repositories'
import { NotFoundError } from '@domain/errors'
import { PostTypes } from '@domain/models'
import { CreateCommentUseCase } from '@domain/usecases/create-comment-usecase'
import { CommentEntity, UserEntity } from '@infra/database/entities'
import { mockedCommentEntity, mockedPostEntity, mockedUserEntity } from '@tests/domain/mocks'
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

  export type Output = { user: UserEntity | undefined }
}

export class CreateCommentService implements CreateCommentUseCase {
	constructor (
    private readonly postsRepository: LoadPostByIdRepository, 
		private readonly usersRepository: LoadUserByIdRepository,
		private readonly commentsRepository: CreateCommentRepository
	) {}
	async execute({ post_id, user_id, comment }: CreateCommentUseCase.Input): Promise<CreateCommentUseCase.Output> {
		const { post: existing_post } = await this.postsRepository.loadById({ post_id })
		if(existing_post == undefined) throw new NotFoundError('posts')
		const { user: existing_user } = await this.usersRepository.loadById({ user_id })
		if(existing_user == undefined) throw new NotFoundError('users')
		await this.commentsRepository.create({ comment, post_id, user_id })
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

		await expect(promise).rejects.toThrow(new NotFoundError('posts'))
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