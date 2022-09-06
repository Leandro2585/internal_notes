import { newDb } from 'pg-mem'
import { getRepository } from 'typeorm'

import { mockedPost } from '@tests/domain/mocks/mock-posts'
import { PostEntity } from '@infra/database/entities'
import { PgPostsRepository } from '@infra/database/repositories'

describe('Pg Posts Repository', () => {
	test('should return all posts by page', async () => {
		const db = newDb()
		const connection = await db.adapters.createTypeormConnection({
			type: 'postgres',
			entities: []
		})
		await connection.synchronize()
		const pgPostsRepository = getRepository(PostEntity)
		await pgPostsRepository.save({
			description: 'any_description',
			created_at: new Date(),
			updated_at: new Date()
		})
		const sut = new PgPostsRepository()
		const { results } = await sut.loadAll({ page: 1 })
    
		expect(results).toEqual([mockedPost()])
	})
})