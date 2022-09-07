import { success } from '@application/helper'
import { PostModel } from '@domain/models'
import { LoadPostsUseCase } from '@domain/usecases'
import { Controller, HttpResponse } from '@application/protocols'

export class LoadPostsController extends Controller {
	constructor (private readonly loadPosts: LoadPostsUseCase){ super() }

	async execute(httpRequest: LoadPostsController.Request): Promise<HttpResponse<LoadPostsController.Response>> {
		const { page, initial_date, final_date, user_id } = httpRequest
		const response = await this.loadPosts.execute({ page: Number(page), initial_date, final_date, user_id: user_id ? Number(user_id) : undefined })
		return success(response)
	}
}

export namespace LoadPostsController {
  export type Request = { page: number, user_id?: number, initial_date?: string, final_date?: string }

  export type Response = { current_page: number, results: PostModel[] }
}