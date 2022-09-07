import { CreateCommentRepository, LoadPostByIdRepository, LoadUserByIdRepository } from '@data/protocols/repositories'
import { CreateCommentUseCase } from '@domain/usecases'
import { NotFoundError } from '@domain/errors'
import { formatDate } from '@domain/helpers'

export class CreateCommentService implements CreateCommentUseCase {
	constructor (
    private readonly postsRepository: LoadPostByIdRepository, 
		private readonly usersRepository: LoadUserByIdRepository,
		private readonly commentsRepository: CreateCommentRepository
	) {}
	async execute({ post_id, user_id, comment }: CreateCommentUseCase.Input): Promise<CreateCommentUseCase.Output> {
		const { post: existing_post } = await this.postsRepository.loadById({ post_id })
		if(existing_post == undefined) throw new NotFoundError('posts')
		const { user: existing_user } = await this.usersRepository.loadById({ user_id })
		if(existing_user == undefined) throw new NotFoundError('users')
		const { comment: created_comment } = await this.commentsRepository.create({ comment, post_id, user_id })
		return {
			comment: {
				post_id,
				username: existing_user.name,
				comment: created_comment.comment,
				type: existing_post.type,
				created_at: formatDate(created_comment.created_at),
				updated_at: formatDate(created_comment.updated_at)
			}
		}
	}
}