import { LoadAllPostsRepository } from '@data/protocols/repositories'
import { LoadPostsUseCase } from '@domain/usecases'

export class LoadPostsService implements LoadPostsUseCase {
	constructor(private readonly postsRepository: LoadAllPostsRepository){}

	async execute(input: LoadPostsUseCase.Input): Promise<LoadPostsUseCase.Output> {
		const { results } = await this.postsRepository.loadAll(input)
		return {
			current_page: input.page,
			results
		}
	}
}