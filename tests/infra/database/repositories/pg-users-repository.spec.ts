import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'
import { UserEntity } from '@infra/database/entities'
import { PostgresConnection } from '@infra/database/helpers'
import { makeFakeDatabase } from '../helpers/mock-database'
import { LoadUserByIdRepository } from '@data/protocols/repositories'
import { PostgresRepository } from '../protocols'

export class PgUsersRepository extends PostgresRepository implements LoadUserByIdRepository {
	async loadById({ user_id }: LoadUserByIdRepository.Input): Promise<LoadUserByIdRepository.Output> {
		const usersRepository = this.getRepository(UserEntity)
		const user = await usersRepository.findOne({ where: { id: user_id } })
		return { user }
	}
}

describe('pg users repository', () => {
	let sut: PgUsersRepository
	let pgUsersRepository: Repository<UserEntity>
	let connection: PostgresConnection
	let backup: IBackup

	beforeAll(async () => {
		connection = PostgresConnection.getInstance()
		const database = makeFakeDatabase([UserEntity])
		backup = (await database).backup()
		pgUsersRepository = connection.getRepository(UserEntity)
  	})

	afterAll(async () => {
		connection.disconnect()
	})

	beforeEach(() => {
		backup.restore()
		sut = new PgUsersRepository()
	})
  
	test('should extend postgres repository', () => {
		expect(sut).toBeInstanceOf(PostgresRepository)
	})
})