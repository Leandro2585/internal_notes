import { Controller, HttpResponse } from '@application/protocols'
import { LoadProfileUseCase } from '@domain/usecases'
import { success } from '@application/helper'
import { ProfileModel } from '@domain/models'
import { RequiredFieldError } from '@application/errors'

export class LoadProfileController extends Controller {
	constructor(private readonly loadProfileUseCase: LoadProfileUseCase){ super() }

	async execute({ user_id, page }: LoadProfileController.Request): Promise<HttpResponse<LoadProfileController.Response>> {
		const { profile } = await this.loadProfileUseCase.execute({ user_id: Number(user_id), page: page ? Number(page) : undefined })
		return success({ profile })
	}

	validate({ user_id }: LoadProfileController.Request): Error | undefined {
		if(!user_id) return new RequiredFieldError('user_id')
		return
	}
}

export namespace LoadProfileController {
  export type Request = {
    user_id: number
    page?: number
  }

  export type Response = {
    profile: ProfileModel
  }
}