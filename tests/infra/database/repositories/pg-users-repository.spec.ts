import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'
import { UserEntity } from '@infra/database/entities'
import { PostgresConnection } from '@infra/database/helpers'
import { makeFakeDatabase } from '../helpers/mock-database'
import { LoadUserByIdRepository } from '@data/protocols/repositories'
import { PostgresRepository } from '@infra/database/protocols'

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

	test('should return user with the same user_id provided', async () => {
		await pgUsersRepository.save({
			id: 1,
			name: 'USER',
			created_at: new Date('2022-08-30 16:32:02'),
			updated_at: new Date('2022-08-30 16:32:02'),
		})
		const result = await sut.loadById({ user_id: 1 })
		
		expect(result).toMatchObject({
			user: {
				id: 1,
				name: 'USER',
				created_at: new Date('2022-08-30 16:32:02'),
				updated_at: new Date('2022-08-30 16:32:02'),
			}
		})
	})
})