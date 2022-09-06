import { getRepository } from 'typeorm'

import { LoadAllPostsRepository } from '@data/protocols/repositories'
import { PostEntity } from '@infra/database/entities'

export class PgPostsRepository implements LoadAllPostsRepository {
	async loadAll({ page, final_date, initial_date, user_id }: LoadAllPostsRepository.Input): Promise<LoadAllPostsRepository.Output> {
		const postsRepository = getRepository(PostEntity)
		const query = await postsRepository
			.createQueryBuilder('tb_post')
			.skip(page - 1)
			.take(10)
		user_id && query.where('tb_post.user_id = :user_id', { user_id })
		initial_date && query.where('tb_post.created_at >= :initial_date', { initial_date: new Date(initial_date).toISOString() })
		final_date && query.where('tb_post.created_at < :final_date', { final_date: new Date(final_date).toISOString() })
		const results = await query.getMany()
		return { results }
	}
}