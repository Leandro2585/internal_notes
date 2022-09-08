import { LoadProfileController } from '@application/controllers'
import { makeLoadProfileService } from '@main/factories/services'

export const makeLoadProfileController = (): LoadProfileController => {
	const service = makeLoadProfileService()
	return new LoadProfileController(service)
}