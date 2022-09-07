import { LoadPostsController } from '@application/controllers'
import { makeLoadPostsService } from '@main/factories/services'

export const makeLoadPostsController = (): LoadPostsController => {
	const service = makeLoadPostsService()
	return new LoadPostsController(service)
}