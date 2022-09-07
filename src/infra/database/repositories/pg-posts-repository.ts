import { CreatePostRepository, LoadPostByIdRepository, LoadPostsRepository } from '@data/protocols/repositories'
import { PostgresRepository } from '@infra/database/protocols'
import { PostEntity } from '@infra/database/entities'

export class PgPostsRepository extends PostgresRepository implements LoadPostsRepository, LoadPostByIdRepository {
	async loadById({ post_id }: LoadPostByIdRepository.Input): Promise<LoadPostByIdRepository.Output> {
		const postsRepository = this.getRepository(PostEntity)
		return await postsRepository.findOne({ where: { id: post_id }})
	}

	async load({ page, final_date, initial_date, user_id }: LoadPostsRepository.Input): Promise<LoadPostsRepository.Output> {
		const postsRepository = this.getRepository(PostEntity)
		const query = postsRepository
			.createQueryBuilder('tb_post')
			.skip((page - 1) * 10)
			.take(10)
		user_id && query.andWhere('tb_post.user_id = :user_id', { user_id })
		initial_date && query.andWhere('tb_post.created_at >= :initial_date', { initial_date: new Date(initial_date).toISOString() })
		final_date && query.andWhere('tb_post.created_at <= :final_date', { final_date: new Date(new Date(final_date).setDate(new Date(final_date).getDate() + 1)).toISOString() })
		const results = await query.getMany()
		return { results }
	}
}