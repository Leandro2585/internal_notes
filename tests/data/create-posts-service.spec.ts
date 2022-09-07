import { CreatePostsUseCase } from '@domain/usecases'
import { MockProxy } from 'jest-mock-extended'
import { LoadPostsRepository } from '@data/protocols/repositories'

export class CreatePostsService implements CreatePostsUseCase {
	execute(input: CreatePostsUseCase.Input): Promise<CreatePostsUseCase.Output> {
		throw new Error('Method not implemented.')
	}
}

describe('create posts service', () => {
	let sut: CreatePostsService
	let postsRepository: MockProxy<LoadPostsRepository>

	beforeEach(() => {
		sut = new CreatePostsService()
	})

	test('should call LoadPostByIdRepository when post_id is provided', () => {

	})
})