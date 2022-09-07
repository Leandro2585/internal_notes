import { CreateCommentController } from '@application/controllers'
import { makeCreateCommentService } from '../services/create-comment-service-factory'

export const makeCreateCommentController = () => {
	const service = makeCreateCommentService()
	return new CreateCommentController(service)
}