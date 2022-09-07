import { getRepository } from 'typeorm'
import { UserEntity } from '../entities'

export const generateUser = async (id: number) => {
	const repository = getRepository(UserEntity)
	const user = await repository.create({
		name: `USER ${id}`
	})
	await repository.save(user)
}
