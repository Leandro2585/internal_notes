import { CreatePostRepository, LoadPostByIdRepository, LoadPostsRepository } from '@data/protocols/repositories'
import { emptyPostEntity } from '@domain/helpers'
import { CreatePostsUseCase } from '@domain/usecases'
import { formatDate } from '@domain/helpers'
import { PostTypes } from '@domain/models'
import { PostEntity } from '@infra/database/entities'
import { CreationLimitExceeded, NotFoundError } from '@domain/errors'

export class CreatePostsService {
	constructor (private readonly postsRepository: LoadPostByIdRepository & CreatePostRepository & LoadPostsRepository ) {}

	async execute({ user_id, post, post_id }: CreatePostsUseCase.Input): Promise<CreatePostsUseCase.Output> {
		let created_post: PostEntity = emptyPostEntity()
		const current_date = new Date().toISOString().split('T')[0]
		const { results } = await this.postsRepository.load({ page: 1, user_id, final_date: current_date, initial_date: current_date })
		if (results.length == 5) throw new CreationLimitExceeded()
		if (post_id) {
			const { post: selected_post }= await this.postsRepository.loadById({ post_id })
			if(selected_post == undefined) throw new NotFoundError('posts')
			const { post: new_post } = await this.postsRepository.create({ description: selected_post.description, user_id, type: PostTypes.REPOST })
			created_post = new_post
		} else if (post) {
			const { post: new_post } = await this.postsRepository.create({ description: post.description, user_id, type: PostTypes.ORIGINAL })
			created_post = new_post
		}
		return { 
			post: {
				...created_post, 
				created_at: formatDate(created_post.created_at),
				updated_at: formatDate(created_post.updated_at),
			}
		}
	}
}
