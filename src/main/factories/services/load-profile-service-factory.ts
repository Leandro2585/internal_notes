import { LoadProfileService } from '@data/services'
import { makePgPostsRepository, makePgUsersRepository } from '@main/factories/repositories'

export const makeLoadProfileService = (): LoadProfileService => {
	const userRepository = makePgUsersRepository()
	const postRepository = makePgPostsRepository()
	return new LoadProfileService(userRepository, postRepository)
}