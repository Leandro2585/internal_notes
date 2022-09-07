import { CreatePostsUseCase } from '@domain/usecases'
import { mockedPostModel } from '@tests/domain/mocks'

export class CreatePostsUseCaseSpy implements CreatePostsUseCase {
	input: CreatePostsUseCase.Input = {
		user_id: 0,
		post_id: 0,
		post: undefined
	}
	output: CreatePostsUseCase.Output = {
		post: mockedPostModel()
	}
	async execute(input: CreatePostsUseCase.Input): Promise<CreatePostsUseCase.Output> {
		await Promise.resolve(null)
		this.input = input 
		return this.output
	}
}