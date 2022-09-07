import { Controller, HttpResponse } from '@application/protocols'
import { CreateCommentUseCaseSpy, randomCharactersGenerator } from '../fakes'
import { CreateCommentUseCase } from '@domain/usecases'
import { CommentModel } from '@domain/models'
import { success } from '@application/helper'
import { ExcessiveCharactersError } from '@application/errors'

export class CreateCommentController extends Controller {
	constructor (private readonly createCommentUseCase: CreateCommentUseCase) { super() }

	async execute({ comment, post_id, user_id }: CreateCommentController.Request): Promise<HttpResponse<CreateCommentController.Response>> {
		const { comment: created_comment } = await this.createCommentUseCase.execute({ comment, post_id: Number(post_id), user_id: Number(user_id) })
		return success({ comment: created_comment })
	}
  
	validate({ comment }: CreateCommentController.Request): Error | undefined {
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

describe('create comment controller', () => {
	let sut: CreateCommentController
	let createCommentsUseCaseSpy: CreateCommentUseCaseSpy

	beforeAll(() => {
		createCommentsUseCaseSpy = new CreateCommentUseCaseSpy()
	})

	beforeEach(() => {
		sut = new CreateCommentController(createCommentsUseCaseSpy)
	})

	test('should extend controller protocol', () => expect(sut).toBeInstanceOf(Controller))

	test('should call CreateCommentUseCase with correct input', async () => {
		await sut.handle({ comment: 'any_comment', user_id: '1', post_id: '1' })

		expect(createCommentsUseCaseSpy.input).toEqual({
			user_id: 1,
			post_id: 1,
			comment: 'any_comment'
		})
	})

	test('should throw ExcessiveCharactersError when comment field exceed 777 characters', async () => {
		const result = await sut.handle({ user_id: 1, post_id: 1, comment: randomCharactersGenerator(778) })

		expect(result).toEqual({
			status_code: 400,
			data: new ExcessiveCharactersError('comment', 777)
		})
	})
})