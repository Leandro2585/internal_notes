import { LoadPostsService } from '@data/services'
import { makePgPostsRepository } from '@main/factories/repositories'

export const makeLoadPostsService = (): LoadPostsService => {
	const repository = makePgPostsRepository()
	return new LoadPostsService(repository)
}