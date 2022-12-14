import { Controller, HttpResponse } from '@application/protocols'
import { CreatePostsUseCase } from '@domain/usecases'
import { PostModel } from '@domain/models'
import { success } from '@application/helper'
import { ExcessiveCharactersError, OnlyRequiredFieldError, RequiredFieldError } from '@application/errors'

export class CreatePostController extends Controller {
	constructor (private readonly createPostsUseCase: CreatePostsUseCase) { super() }

	async execute({ user_id, post, post_id }: CreatePostController.Request): Promise<HttpResponse<CreatePostController.Response>> {
		const response = await this.createPostsUseCase.execute({ user_id: Number(user_id), post_id: post_id ? Number(post_id) : undefined, post: post ?? undefined })
		return success(response)
	}

	validate({ post, post_id, user_id }: CreatePostController.Request): Error | undefined {
		if(!user_id) return new RequiredFieldError('user_id')
		if((post && post_id) || (!post && !post_id)) return new OnlyRequiredFieldError(['post', 'post_id'])
		if(post?.description && post?.description.length >= 777) return new ExcessiveCharactersError('description', 777)
		return undefined
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