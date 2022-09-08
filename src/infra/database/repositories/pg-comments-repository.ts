import { CreateCommentRepository } from '@data/protocols/repositories'
import { PostgresRepository } from '@infra/database/protocols'
import { CommentEntity } from '@infra/database/entities'

export class PgCommentsRepository extends PostgresRepository implements CreateCommentRepository {
	async create({ comment, post_id, user_id }: CreateCommentRepository.Input): Promise<CreateCommentRepository.Output> {
		const commentsRepository = this.getRepository(CommentEntity)
		const created_comment = commentsRepository.create({ comment, user_id, post_id })
		const saved_comment = await commentsRepository.save(created_comment)
		return { comment: saved_comment }
	}
}
