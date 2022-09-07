import { Router } from 'express'

import { adaptRoute } from '@main/adapters'
import { makeCreatePostController, makeLoadPostsController } from '@main/factories/controllers'

export default (router: Router): void => {
	router.get('/posts', adaptRoute(makeLoadPostsController()))
	router.post('/posts', adaptRoute(makeCreatePostController()))
}