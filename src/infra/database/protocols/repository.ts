import { ObjectLiteral, ObjectType, Repository } from 'typeorm'

import { PostgresConnection } from '@infra/database/helpers'

export abstract class PostgresRepository {
	constructor(private readonly connection: PostgresConnection = PostgresConnection.getInstance()) {}

	getRepository<Entity extends ObjectLiteral> (entity: ObjectType<Entity>): Repository<Entity> {
		return this.connection.getRepository(entity)
	}
}