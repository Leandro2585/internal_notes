import { Router } from 'express'

import { adaptRoute } from '@main/adapters'
import { makeLoadPostsController } from '@main/factories/controllers'

export default (router: Router): void => {
	router.get('/posts', adaptRoute(makeLoadPostsController()))
}