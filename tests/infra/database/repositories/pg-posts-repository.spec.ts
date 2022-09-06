import { IBackup, newDb } from 'pg-mem'
import { getConnection, getRepository, Repository } from 'typeorm'

import { PgPostsRepository } from '@infra/database/repositories'
import { mockedPost } from '@tests/domain/mocks/mock-posts'
import { PostEntity } from '@infra/database/entities'
import { PostTypes } from '@domain/models'

describe('Pg Posts Repository', () => {
	let sut: PgPostsRepository
	let pgPostRepository: Repository<PostEntity>
	let backup: IBackup

	beforeAll(async () => {
		const db = newDb()
		const connection = await db.adapters.createTypeormConnection({
			type: 'postgres',
			entities: [PostEntity]
		})
		await connection.synchronize()
		backup = db.backup()
		pgPostRepository = getRepository(PostEntity)
		
	})

	afterAll(async () => {
		await getConnection().close()
	})

	beforeEach(() => {
		backup.restore()
		sut = new PgPostsRepository()
	})

	test('should return all posts by page', async () => {
		await pgPostRepository.save({
			user_id: 1,
			description: 'any_description',
			created_at: new Date('2022-08-30 16:32:02'),
			updated_at: new Date('2022-08-30 16:32:02')
		})
		const { results } = await sut.loadAll({ page: 1 })
    
		expect(results).toEqual([mockedPost()])
	})

	test('should return only posts of user', async () => {
		await pgPostRepository.save({
			user_id: 2,
			description: 'any_description',
			created_at: new Date('2022-08-30 16:32:02'),
			updated_at: new Date('2022-08-30 16:32:02'),
		})
		await pgPostRepository.save({
			user_id: 1,
			description: 'other_post',
			created_at: new Date('2022-08-30 16:32:02'),
			updated_at: new Date('2022-08-30 16:32:02'),
		})

		const { results } = await sut.loadAll({ page: 1, user_id: 1 })

		expect(results).toMatchObject([{ description: 'other_post', user_id: 1 }])
	})

	test('should return only posts with created_at field more than initial_date', async () => {
		await pgPostRepository.save({
			user_id: 1,
			description: 'most_recent_post',
			created_at: new Date('2022-08-30 16:32:02'),
			updated_at: new Date('2022-08-30 16:32:02'),
		})
		await pgPostRepository.save({
			user_id: 1,
			description: 'old_post',
			created_at: new Date('2022-07-30 16:32:02'),
			updated_at: new Date('2022-07-30 16:32:02'),
		})
		const { results } = await sut.loadAll({ page: 1, initial_date: '2022-08-01'})
		
		expect(results).toEqual([{
			id: 1,
			user_id: 1,
			description: 'most_recent_post',
			type: PostTypes.ORIGINAL,
			created_at: new Date('2022-08-30 16:32:02'),
			updated_at: new Date('2022-08-30 16:32:02'),
		}])
	})

	test('should return only posts with created_at field less than final_date', async () => {
		await pgPostRepository.save({
			user_id: 1,
			description: 'most_recent_post',
			created_at: new Date('2022-08-30 16:32:02'),
			updated_at: new Date('2022-08-30 16:32:02'),
		})
		await pgPostRepository.save({
			user_id: 1,
			description: 'old_post',
			created_at: new Date('2022-07-30 16:32:02'),
			updated_at: new Date('2022-07-30 16:32:02'),
		})
		const { results } = await sut.loadAll({ page: 1, final_date: '2022-08-01'})
		
		expect(results).toEqual([{
			id: 2,
			user_id: 1,
			description: 'old_post',
			type: PostTypes.ORIGINAL,
			created_at: new Date('2022-07-30 16:32:02'),
			updated_at: new Date('2022-07-30 16:32:02'),
		}])
	})
})