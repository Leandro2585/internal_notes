import { CreateCommentUseCase } from '@domain/usecases'
import { mockedCommentModel } from '@tests/domain/mocks'

export class CreateCommentUseCaseSpy implements CreateCommentUseCase {
	input: CreateCommentUseCase.Input = {
		user_id: 0,
		post_id: 0,
		comment: ''
	}
	output: CreateCommentUseCase.Output = {
		comment: mockedCommentModel()
	}
	async execute(input: CreateCommentUseCase.Input): Promise<CreateCommentUseCase.Output> {
		await Promise.resolve(null)
		this.input = input
		return this.output
	}

}