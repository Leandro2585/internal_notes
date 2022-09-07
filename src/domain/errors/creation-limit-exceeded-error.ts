export class CreationLimitExceeded extends Error {
	constructor(){
		super('Post limit reached')
		this.name = 'CreationLimitExceeded'
	}
} 