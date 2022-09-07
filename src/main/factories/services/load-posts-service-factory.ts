import { LoadPostsService } from '@data/services'
import { makePgLoadPostsRepository } from '@main/factories/repositories'

export const makeLoadPostsService = (): LoadPostsService => {
	const repository = makePgLoadPostsRepository()
	return new LoadPostsService(repository)
}