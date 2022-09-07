
export class NotFoundError extends Error {
	constructor (tableName?: string) {
		super(`Register of ${tableName} not found.`)
		this.name = 'NotFoundError'
	}
}