import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'

import { PgCommentsRepository } from '@infra/database/repositories'
import { PostgresRepository } from '@infra/database/protocols'
import { PostgresConnection } from '@infra/database/helpers'
import { makeFakeDatabase } from '../helpers/mock-database'
import { CommentEntity } from '@infra/database/entities'

describe('pg comments repository', () => {
	let sut: PgCommentsRepository
	let pgCommentRepository: Repository<CommentEntity>
	let connection: PostgresConnection
	let backup: IBackup

	beforeAll(async () => {
		connection = PostgresConnection.getInstance()
		const database = makeFakeDatabase([CommentEntity])
		backup = (await database).backup()
		pgCommentRepository = connection.getRepository(CommentEntity)
	})

	afterAll(async () => {
		connection.disconnect()
	})

	beforeEach(() => {
		backup.restore()
		sut = new PgCommentsRepository()
	})
  
	test('should extend postgres repository', () => {
		expect(sut).toBeInstanceOf(PostgresRepository)
	})

	test('should create a new comment', async () => {
		const result = await sut.create({ comment: 'any_comment', post_id: 1, user_id: 1 })
    
		expect(result).toMatchObject({
			comment: {
				id: 1,
				user_id: 1,
				post_id: 1,
				comment: 'any_comment'
			}
		})
	})
})