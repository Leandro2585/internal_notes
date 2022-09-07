
export class NotFoundError extends Error {
	constructor () {
		super('Register not found.')
		this.name = 'NotFoundError'
	}
}