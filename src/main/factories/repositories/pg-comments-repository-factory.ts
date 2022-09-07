import { PgCommentsRepository } from '@infra/database/repositories'

export const makePgCommentsRepository = (): PgCommentsRepository => {
	return new PgCommentsRepository()
}