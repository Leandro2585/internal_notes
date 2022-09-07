import { CreateCommentRepository } from '@data/protocols/repositories'
import { PostgresRepository } from '@infra/database/protocols'
import { PostgresConnection } from '@infra/database/helpers'
import { CommentEntity } from '@infra/database/entities'
import { IBackup } from 'pg-mem'
import { makeFakeDatabase } from '../helpers/mock-database'
import { Repository } from 'typeorm'

export class PgCommentsRepository extends PostgresRepository implements CreateCommentRepository {
	async create({ comment, post_id, user_id }: CreateCommentRepository.Input): Promise<CreateCommentRepository.Output> {
		const commentsRepository = this.getRepository(CommentEntity)
		const created_comment = commentsRepository.create({ comment, user_id, post_id })
		await commentsRepository.save(created_comment)
		return { comment: created_comment }
	}
}

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