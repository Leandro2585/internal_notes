import { CreatePostRepository, LoadPostByIdRepository } from '@data/protocols/repositories'
import { emptyPostEntity } from '@domain/helpers'
import { CreatePostsUseCase } from '@domain/usecases'
import { formatDate } from '@domain/helpers'
import { PostTypes } from '@domain/models'
import { PostEntity } from '@infra/database/entities'
import { NotFoundError } from '@domain/errors'

export class CreatePostsService {
	constructor (private readonly postsRepository: LoadPostByIdRepository & CreatePostRepository) {}

	async execute({ user_id, post, post_id }: CreatePostsUseCase.Input): Promise<CreatePostsUseCase.Output> {
		let created_post: PostEntity = emptyPostEntity()
		if (post_id) {
			const { post: selected_post }= await this.postsRepository.loadById({ post_id })
			if(selected_post == undefined) throw new NotFoundError()
			created_post = (await this.postsRepository.create({ description: selected_post.description, user_id, type: PostTypes.REPOST })).post
		} else if (post) {
			created_post = (await this.postsRepository.create({ ...post, user_id, type: PostTypes.ORIGINAL })).post
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
