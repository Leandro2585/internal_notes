import { LoadPostsUseCase } from '@domain/usecases'
import { mockedPostModel } from '@tests/domain/mocks'

export class LoadPostsUseCaseSpy implements LoadPostsUseCase {
	input: LoadPostsUseCase.Input = {
		page: 0,
		user_id: undefined,
		initial_date: undefined,
		final_date: undefined
	}
	output: LoadPostsUseCase.Output = {
		current_page: 1,
		results: [mockedPostModel()]
	}
	async execute(input: LoadPostsUseCase.Input): Promise<LoadPostsUseCase.Output> {
		await Promise.resolve(null)
		Object.assign(this.input, { ...input })
		return this.output
	}
}