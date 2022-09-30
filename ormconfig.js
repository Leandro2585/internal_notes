const root = process.env.TS_NODE_DEV === undefined ? 'build' : 'src'

module.exports = {
	name: "default",
    type: "postgres",
    host: process.env.POSTGRES_HOST || "internal_notes_db_container",
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USERNAME || "postgres",
    password: process.env.POSTGRES_PASSWORD || "12345678",
    database: process.env.DB_NAME || "internal_notes",
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
