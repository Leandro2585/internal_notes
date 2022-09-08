export class ServerError extends Error {
	constructor(error?: Error) {
		super(error?.message ? error.message : 'Server failed. Try again soon')
		this.name = 'ServerError'
		this.stack = error?.stack
	}
}