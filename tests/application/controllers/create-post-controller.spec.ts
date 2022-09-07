import { CreatePostsUseCaseSpy } from '../fakes/create-post-usecase-spy'
import { CreatePostController } from '@application/controllers'
import { Controller } from '@application/protocols'
import { randomCharactersGenerator } from '../fakes'
import { ExcessiveCharactersError } from '@application/errors'


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
		await sut.handle({ user_id: '1' })

		expect(createPostsUseCaseSpy.input).toEqual({
			user_id: 1,
			post_id: undefined,
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

	test('should throw ExcessiveCharactersError when description field exceed 777 characters', async () => {
		const result = await sut.handle({ user_id: 1, post: { description: randomCharactersGenerator(778) }})

		expect(result).toEqual({
			status_code: 400,
			data: new ExcessiveCharactersError('description', 777)
		})
	})
})