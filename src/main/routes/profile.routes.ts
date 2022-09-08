import { adaptRoute } from '@main/adapters'
import { makeLoadProfileController } from '@main/factories/controllers'
import { Router } from 'express'

export default (router: Router): void => {
	router.get('/profile', adaptRoute(makeLoadProfileController()))
}