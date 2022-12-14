import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'

import { PostgresConnection } from '@infra/database/helpers'
import { PostgresRepository } from '@infra/database/protocols'
import { PgPostsRepository } from '@infra/database/repositories'
import { mockedPostEntity } from '@tests/domain/mocks'
import { makeFakeDatabase } from '../helpers/mock-database'
import { PostEntity } from '@infra/database/entities'
import { PostTypes } from '@domain/models'

describe('pg posts repository', () => {
	let sut: PgPostsRepository
	let pgPostRepository: Repository<PostEntity>
	let connection: PostgresConnection
	let backup: IBackup

	beforeAll(async () => {
		connection = PostgresConnection.getInstance()
		const database = makeFakeDatabase([PostEntity])
		backup = (await database).backup()
		pgPostRepository = connection.getRepository(PostEntity)
  	})

	afterAll(async () => {
		connection.disconnect()
	})

	beforeEach(() => {
		backup.restore()
		sut = new PgPostsRepository()
	})
  
	test('should extend postgres repository', () => {
		expect(sut).toBeInstanceOf(PostgresRepository)
	})

	describe('load()', () => {    
		test('should return all posts by page', async () => {
			await pgPostRepository.save({
				user_id: 1,
				description: 'any_description',
				created_at: new Date('2022-08-30 16:32:02'),
				updated_at: new Date('2022-08-30 16:32:02')
			})
			const { results } = await sut.load({ page: 1 })
        
			expect(results).toEqual([mockedPostEntity()])
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
    
			const { results } = await sut.load({ page: 1, user_id: 1 })
    
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
			const { results } = await sut.load({ page: 1, initial_date: '2022-08-01'})
        
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
			const { results } = await sut.load({ page: 1, final_date: '2022-08-01'})
        
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
	
	describe('loadById()', () => {
		test('should return post with the same post_id provided', async () => {
			await pgPostRepository.save({
				user_id: 1,
				description: 'most_recent_post',
				created_at: new Date('2022-08-30 16:32:02'),
				updated_at: new Date('2022-08-30 16:32:02'),
			})
			const result = await sut.loadById({ post_id: 1 })
		
			expect(result).toMatchObject({
				post: {
					id: 1,
					user_id: 1,
					description: 'most_recent_post',
					type: PostTypes.ORIGINAL,
					created_at: new Date('2022-08-30 16:32:02'),
					updated_at: new Date('2022-08-30 16:32:02'),
				}
			})
		})
	})

	describe('create()', () => {
		test('should create a new repost', async () => {
			const result = await sut.create({ description: 'any_description', type: PostTypes.REPOST, user_id: 1 })
      
			expect(result).toMatchObject({
				post: {
					id: 1,
					user_id: 1,
					description: 'any_description', 
					type: PostTypes.REPOST, 
				}
			})
		})
	})

	describe('count()', () => {
		test('should return total_posts', async () => {
			await pgPostRepository.save({
				user_id: 1,
				description: 'most_recent_post',
				created_at: new Date('2022-08-30 16:32:02'),
				updated_at: new Date('2022-08-30 16:32:02'),
			})
			await pgPostRepository.save({
				user_id: 1,
				description: 'most_recent_post',
				created_at: new Date('2022-08-30 16:32:02'),
				updated_at: new Date('2022-08-30 16:32:02'),
			})
			const result = await sut.count({ user_id: 1 })
      
			expect(result.total_posts).toBe(2)
		})
	})
})