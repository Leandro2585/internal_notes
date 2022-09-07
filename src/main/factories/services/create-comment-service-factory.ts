import { CreateCommentService } from '@data/services'
import { makePgCommentsRepository, makePgPostsRepository, makePgUsersRepository } from '@main/factories/repositories'

export const makeCreateCommentService = (): CreateCommentService => {
	const postRepository = makePgPostsRepository()
	const userRepository = makePgUsersRepository()
	const commentRepository = makePgCommentsRepository()
	return new CreateCommentService(postRepository, userRepository, commentRepository)
}