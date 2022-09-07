import { Router } from 'express'

import { makeCreateCommentController } from '@main/factories/controllers'
import { adaptRoute } from '@main/adapters'

export default (router: Router): void => {
	router.get('/comments', adaptRoute(makeCreateCommentController()))
}