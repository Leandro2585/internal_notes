import { CountPostsRepository, LoadPostsRepository, LoadUserByIdRepository } from '@data/protocols/repositories'
import { NotFoundError } from '@domain/errors'
import { formatDate } from '@domain/helpers'
import { PostModel } from '@domain/models'
import { LoadProfileUseCase } from '@domain/usecases'

export class LoadProfileService implements LoadProfileUseCase {
	constructor (private readonly userRepository: LoadUserByIdRepository, private readonly postRepository: LoadPostsRepository & CountPostsRepository) {}

	async execute({ user_id, page = 1 }: LoadProfileUseCase.Input): Promise<LoadProfileUseCase.Output> {
		const { user } = await this.userRepository.loadById({ user_id })
		if(user == undefined) throw new NotFoundError('users')
		const { total_posts } = await this.postRepository.count({ user_id })
		const { results } = await this.postRepository.load({ page, limit: 5, user_id })
		const recent_posts: PostModel[] = results?.map(post => ({
			...post,
			created_at: formatDate(post.created_at),
			updated_at: formatDate(post.updated_at),
		}))
		return {
			username: user.name,
			created_at: formatDate(user.created_at),
			total_posts,
			recent_posts,
		}
	}

}