import { LoadProfileController } from '@application/controllers'
import { RequiredFieldError } from '@application/errors'
import { Controller } from '@application/protocols'
import { LoadProfileUseCaseSpy } from '../fakes'

describe('load profile controller', () => {
	let sut: LoadProfileController
	let loadProfileUseCaseSpy: LoadProfileUseCaseSpy

	beforeAll(() => {
		loadProfileUseCaseSpy = new LoadProfileUseCaseSpy()
	})

	beforeEach(() => {
		sut = new LoadProfileController(loadProfileUseCaseSpy)
	})

	test('should extend controller', () => {
		expect(sut).toBeInstanceOf(Controller)
	})

	test('should return RequiredFieldError when user_id is not provided', async () => {
		const result = await sut.handle({ user_id: undefined, page: 1 })

		expect(result).toEqual({
			status_code: 400,
			data: new RequiredFieldError('user_id')
		})
	})

	test('should call load profile usecase with correct input', async () => {
		await sut.handle({
			user_id: '1',
			page: '1'
		})
    
		expect(loadProfileUseCaseSpy.input).toEqual({ 
			page: 1, 
			user_id: 1
		})
	})

	test('should call load profile usecase without page field', async () => {
		await sut.handle({
			user_id: '1'
		})
    
		expect(loadProfileUseCaseSpy.input).toEqual({ 
			user_id: 1,
			page: undefined
		})
	})
})