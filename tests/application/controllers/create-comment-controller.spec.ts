import { success } from '@application/helper'
import { Controller, HttpResponse } from '@application/protocols'
import { CreateCommentUseCaseSpy } from '../fakes'

export class CreateCommentController extends Controller {
	constructor () { super() }

	async execute(httpRequest: CreateCommentController.Request): Promise<HttpResponse<CreateCommentController.Response>> {
		return success({})
	}
  
	validate(httpRequest: CreateCommentController.Request): Error | undefined {
		return
	}
}

export namespace CreateCommentController {
  export type Request = {}

  export type Response = {}
}

describe('create comment controller', () => {
	let sut: CreateCommentController
	let createCommentsUseCaseSpy: CreateCommentUseCaseSpy

	beforeEach(() => {
		sut = new CreateCommentController()
	})

	test('should extend controller protocol', () => expect(sut).toBeInstanceOf(Controller))
})