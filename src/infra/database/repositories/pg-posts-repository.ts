import { getRepository, FindManyOptions,  } from 'typeorm'

import { LoadAllPostsRepository } from '@data/protocols/repositories'
import { PostEntity } from '@infra/database/entities'

export class PgPostsRepository implements LoadAllPostsRepository {
	async loadAll({ page, final_date, initial_date, user_id }: LoadAllPostsRepository.Input): Promise<LoadAllPostsRepository.Output> {
		const filters = {}
		initial_date && Object.assign(filters, { before: new Date(initial_date).toISOString() })
		final_date && Object.assign(filters, { after: new Date(final_date).toISOString() })
		const postsRepository = getRepository(PostEntity)
		const results = await postsRepository
			.createQueryBuilder()
			.skip(page)
			.take(10)
			.andWhere('createdAt >= :after')
			.andWhere('createdAt < :before')
			.setParameters(filters)
			.getRawMany()
		return results
	}
}