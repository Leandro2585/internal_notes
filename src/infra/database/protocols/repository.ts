import { ObjectType, Repository } from 'typeorm'

import { PostgresConnection } from '@infra/database/helpers'

export abstract class PostgresRepository {
	constructor(private readonly connection: PostgresConnection = PostgresConnection.getInstance()) {}

	getRepository<Entity> (entity: ObjectType<Entity>): Repository<any> {
		return this.connection.getRepository(entity)
	}
}