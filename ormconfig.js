const root = process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'

module.exports = {
	name: 'default',
	type: 'postgres',
	host: 'localhost',
	username: 'postgres',
	password: '12345678',
	database: 'internal_notes',
	port: 5432,
	entities: [
		`./${root}/infra/database/entities/*.ts`
	],
	migrations: [
		`./${root}/infra/database/migrations/*.ts`
	],
	cli: {
		migrationsDir: `./${root}/infra/database/migrations`
	}
}