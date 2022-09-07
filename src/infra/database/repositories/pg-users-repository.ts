import { LoadUserByIdRepository } from '@data/protocols/repositories'
import { PostgresRepository } from '@infra/database/protocols'
import { UserEntity } from '../entities'

export class PgUsersRepository extends PostgresRepository implements LoadUserByIdRepository {
	async loadById({ user_id }: LoadUserByIdRepository.Input): Promise<LoadUserByIdRepository.Output> {
		const usersRepository = this.getRepository(UserEntity)
		const user = await usersRepository.findOne({ where: { id: user_id } })
		return { user }
	}
}