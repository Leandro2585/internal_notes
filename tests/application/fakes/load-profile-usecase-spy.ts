import { LoadProfileUseCase } from '@domain/usecases'
import { mockedProfileModel } from '@tests/domain/mocks'

export class LoadProfileUseCaseSpy implements LoadProfileUseCase {
	input: LoadProfileUseCase.Input = {
		page: 1,
		user_id: 0
	}
	output: LoadProfileUseCase.Output = {
		profile: mockedProfileModel()
	}
	async execute(input: LoadProfileUseCase.Input): Promise<LoadProfileUseCase.Output> {
		await Promise.resolve(null)
		Object.assign(this.input, { ...input })
		return this.output
	}
}