import { LoadPostsRepository } from '@data/protocols/repositories'
import { LoadPostsUseCase } from '@domain/usecases'
import { formatDate } from '@domain/helpers'
import { PostModel } from '@domain/models'

export class LoadPostsService implements LoadPostsUseCase {
	constructor(private readonly postsRepository: LoadPostsRepository){}

	async execute(input: LoadPostsUseCase.Input): Promise<LoadPostsUseCase.Output> {
		const { results } = await this.postsRepository.load(input)
		const formattedResults: PostModel[] = results.map(result => ({
			...result,
			created_at: formatDate(result.created_at),
			updated_at: formatDate(result.updated_at),
		}))
		return {
			current_page: input.page,
			results: formattedResults
		}
	}
}