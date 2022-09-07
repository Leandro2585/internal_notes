
import { getConnection, getRepository, getConnectionManager, Connection, ObjectType, createConnection, Repository, ObjectLiteral } from 'typeorm'

import { ConnectionNotFoundError } from '@infra/database/helpers'

export class PostgresConnection {
	private static instance?: PostgresConnection
	private connection?: Connection | undefined

	private constructor () {}

	static getInstance (): PostgresConnection {
		if (PostgresConnection.instance === undefined) {
			PostgresConnection.instance = new PostgresConnection()
		}
		return PostgresConnection.instance
	}

	async connect (): Promise<void> {
		this.connection = getConnectionManager().has('default')
			? getConnection()
			: await createConnection()
	}

	async disconnect (): Promise<void> {
		if (this.connection === undefined) throw new ConnectionNotFoundError()
		await getConnection().close()
		this.connection = undefined
	}

	getRepository<Entity extends  ObjectLiteral> (entity: ObjectType<Entity>): Repository<Entity> {
		if (this.connection === undefined) throw new ConnectionNotFoundError()
		return getRepository(entity)
	}
}