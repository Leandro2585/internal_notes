import { PgPostsRepository } from '@infra/database/repositories'

export const makePgPostsRepository = (): PgPostsRepository => {
	return new PgPostsRepository()
}