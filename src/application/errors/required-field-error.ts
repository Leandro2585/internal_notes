export class RequiredFieldError extends Error {
	constructor(fieldName: string) {
		super(`Missing ${fieldName} field, but it is required`)
		this.name = 'RequiredFieldError'
	}
}