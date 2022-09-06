import { LoadAllPostsRepository } from '@data/protocols/repositories'
import { PostModel } from '@domain/models'
import { LoadPostsUseCase } from '@domain/usecases'

export class LoadPostsService implements LoadPostsUseCase {
	constructor(private readonly postsRepository: LoadAllPostsRepository){}

	async execute(input: LoadPostsUseCase.Input): Promise<LoadPostsUseCase.Output> {
		const { results } = await this.postsRepository.loadAll(input)
		const formattedResults: PostModel[] = results.map(result => ({
			...result,
			created_at: new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(result.created_at)),
			updated_at: new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(result.updated_at)),
		}))
		return {
			current_page: input.page,
			results: formattedResults
		}
	}
}