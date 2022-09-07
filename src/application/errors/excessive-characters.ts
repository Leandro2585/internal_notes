export class ExcessiveCharacters extends Error {
	constructor(fieldName: string, max: number) {
		super(`${fieldName} field has too many characters. The maximum allowed for it is ${max}`)
		this.name = 'ExcessiveCharacters'
	}
}