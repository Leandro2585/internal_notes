import { Controller, HttpResponse } from '@application/protocols'
import { CreatePostsUseCase } from '@domain/usecases'
import { PostModel } from '@domain/models'
import { success } from '@application/helper'

export class CreatePostController extends Controller {
	constructor (private readonly createPostsUseCase: CreatePostsUseCase) { super() }

	async execute({ user_id, post, post_id }: CreatePostController.Request): Promise<HttpResponse<CreatePostController.Response>> {
		const response = await this.createPostsUseCase.execute({ user_id: Number(user_id), post_id: post_id ? Number(post_id) : undefined, post: post ?? undefined })
		return success(response)
	}
}

export namespace CreatePostController {
  export type Request = {
    user_id: number
    post_id?: number
    post?: {
      description: string
    }
  }

  export type Response = { post: PostModel } 
}