import { PgPostsRepository } from '@infra/database/repositories'

export const makePgLoadPostsRepository = (): PgPostsRepository => {
	return new PgPostsRepository()
}