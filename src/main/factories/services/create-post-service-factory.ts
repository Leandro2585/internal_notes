import { CreatePostsService } from '@data/services'
import { makePgLoadPostsRepository } from '@main/factories/repositories'

export const makeCreatePostService = (): CreatePostsService => {
	const repository = makePgLoadPostsRepository()
	return new CreatePostsService(repository)
}