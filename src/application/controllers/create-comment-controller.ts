import { ExcessiveCharactersError, RequiredFieldError } from '@application/errors'
import { Controller, HttpResponse } from '@application/protocols'
import { CreateCommentUseCase } from '@domain/usecases'
import { CommentModel } from '@domain/models'
import { success } from '@application/helper'

export class CreateCommentController extends Controller {
	constructor (private readonly createCommentUseCase: CreateCommentUseCase) { super() }

	async execute({ comment, post_id, user_id }: CreateCommentController.Request): Promise<HttpResponse<CreateCommentController.Response>> {
		const { comment: created_comment } = await this.createCommentUseCase.execute({ comment, post_id: Number(post_id), user_id: Number(user_id) })
		return success({ comment: created_comment })
	}
  
	validate({ comment, post_id, user_id }: CreateCommentController.Request): Error | undefined {
		if(!comment) return new RequiredFieldError('comment')
		if(!post_id) return new RequiredFieldError('post_id')
		if(!user_id) return new RequiredFieldError('user_id')
		if(comment.length >= 777) return new ExcessiveCharactersError('comment', 777)
		return undefined
	}
}

export namespace CreateCommentController {
  export type Request = {
    comment: string
    user_id: number
    post_id: number
  }

  export type Response = {
    comment: CommentModel
  }
}