import { CreatePostsUseCaseSpy } from '../fakes/create-post-usecase-spy'
import { CreatePostController } from '@application/controllers'
import { Controller } from '@application/protocols'
import { randomCharactersGenerator } from '../fakes'
import { ExcessiveCharactersError, OnlyRequiredFieldError, RequiredFieldError } from '@application/errors'


describe('create post controller', () => {
	let createPostsUseCaseSpy: CreatePostsUseCaseSpy
	let sut: CreatePostController

	beforeAll(() => {
		createPostsUseCaseSpy = new CreatePostsUseCaseSpy()
	})

	beforeEach(() => {
		sut = new CreatePostController(createPostsUseCaseSpy)
	})

	test('should extend controller protocol', () => expect(sut).toBeInstanceOf(Controller))

	test('should call CreatePostsUseCase with correct input', async () => {
		await sut.handle({ user_id: '1', post_id: '1' })

		expect(createPostsUseCaseSpy.input).toEqual({
			user_id: 1,
			post_id: 1,
			post: undefined
		})
	})

	test('should call CreatePostsUseCase without post_id on input', async () => {
		await sut.handle({ user_id: '1', post_id: '1' })

		expect(createPostsUseCaseSpy.input).toEqual({
			user_id: 1,
			post_id: 1,
			post: undefined
		})
	})

	test('should return created_post on success', async () => {
		await sut.handle({ user_id: 1, post_id: 1 })
    
		expect(createPostsUseCaseSpy.input).toEqual({ 
			user_id: 1, 
			post_id: 1,
			post: undefined 
		})
	})

	test('should return ExcessiveCharactersError when description field exceed 777 characters', async () => {
		const result = await sut.handle({ user_id: 1, post: { description: randomCharactersGenerator(778) }})

		expect(result).toEqual({
			status_code: 400,
			data: new ExcessiveCharactersError('description', 777)
		})
	})

	test('should return RequiredFieldError when user_id is not provided', async () => {
		const result = await sut.handle({ user_id: undefined, post_id: 1 })

		expect(result).toEqual({
			status_code: 400,
			data: new RequiredFieldError('user_id')
		})
	})

	test('should return OnlyRequiredFieldError when both fields [post, post_id] is provided or not provided', async () => {
		const result = await sut.handle({ user_id: 1, post_id: 1, post: { description: 'any_description' } })

		expect(result).toEqual({
			status_code: 400,
			data: new OnlyRequiredFieldError(['post', 'post_id'])
		})
	})

	test('should set undefined to post_id when field is not provided', async () => {
		await sut.handle({ user_id: 1, post: { description: 'any_description' } })

		expect(createPostsUseCaseSpy.input).toMatchObject({
			post_id: undefined
		})
	})
})