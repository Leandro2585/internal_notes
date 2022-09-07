import '../../../main/configs/module-alias'
import { PostgresConnection } from '../helpers'
import { generateUser } from './user-seed'

async function generateSeeds() {
	PostgresConnection.getInstance().connect().then(() => {
		[1,2,3,4].map(async (id) => {
			await generateUser(id)
		})
	})
}

generateSeeds()
	.then(() => console.log('seeds creation successfull'))
	.finally(() => {
		setTimeout(() => process.exit(), 4000)
	})