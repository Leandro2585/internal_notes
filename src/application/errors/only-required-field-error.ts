export class OnlyRequiredFieldError extends Error {
	constructor(fields: string[]) {
		super(`Only one of these fields [${fields}] must be sent`)
		this.name = 'OnlyRequiredFieldError'
	}
}