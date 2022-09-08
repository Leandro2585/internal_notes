import { CreateCommentUseCaseSpy, randomCharactersGenerator } from '../fakes'
import { ExcessiveCharactersError, RequiredFieldError } from '@application/errors'
import { CreateCommentController } from '@application/controllers'
import { Controller } from '@application/protocols'

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

	test('should return RequiredFieldError when user_id is not provided', async () => {
		const result = await sut.handle({ user_id: undefined, post_id: 1, comment: 'any_comment' })

		expect(result).toEqual({
			status_code: 400,
			data: new RequiredFieldError('user_id')
		})
	})

	test('should return RequiredFieldError when comment is not provided', async () => {
		const result = await sut.handle({ user_id: 1, post_id: 1, comment: undefined })

		expect(result).toEqual({
			status_code: 400,
			data: new RequiredFieldError('comment')
		})
	})

	test('should return RequiredFieldError when post_id is not provided', async () => {
		const result = await sut.handle({ user_id: 1, post_id: undefined, comment: 'any_comment' })

		expect(result).toEqual({
			status_code: 400,
			data: new RequiredFieldError('post_id')
		})
	})
})