import { CreatePostsService } from '@data/services'
import { makePgPostsRepository } from '@main/factories/repositories'

export const makeCreatePostService = (): CreatePostsService => {
	const repository = makePgPostsRepository()
	return new CreatePostsService(repository)
}