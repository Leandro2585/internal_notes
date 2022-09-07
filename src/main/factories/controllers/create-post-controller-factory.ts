import { CreatePostController } from '@application/controllers'
import { makeCreatePostService } from '@main/factories/services'

export const makeCreatePostController = (): CreatePostController => {
	const service = makeCreatePostService()
	return new CreatePostController(service)
}