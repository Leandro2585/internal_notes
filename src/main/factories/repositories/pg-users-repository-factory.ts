import { PgUsersRepository } from '@infra/database/repositories'

export const makePgUsersRepository = (): PgUsersRepository => {
	return new PgUsersRepository()
}