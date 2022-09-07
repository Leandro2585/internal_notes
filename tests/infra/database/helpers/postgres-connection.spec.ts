import { mocked } from 'ts-jest/utils'
import { createConnection, getConnectionManager, getConnection, getRepository } from 'typeorm'

import { ConnectionNotFoundError, PostgresConnection } from '@infra/database/helpers'
import { PostEntity } from '@infra/database/entities'

jest.mock('typeorm', () => ({
	Entity: jest.fn(),
	PrimaryGeneratedColumn: jest.fn(),
	Column: jest.fn(),
	CreateDateColumn: jest.fn(),
	UpdateDateColumn: jest.fn(),
	createConnection: jest.fn(),
	getConnection: jest.fn(),
	getRepository: jest.fn(),
	getConnectionManager: jest.fn()
}))

describe('postgres connection', () => {
	let createQueryRunnerSpy: jest.Mock
	let createConnectionSpy: jest.Mock
	let closeSpy: jest.Mock
	let getRepositorySpy: jest.Mock
	let getConnectionManagerSpy: jest.Mock
	let getConnectionSpy: jest.Mock
	let sut: PostgresConnection

	beforeAll(() => {
		getConnectionManagerSpy = jest.fn().mockReturnValue({
			has: jest.fn().mockReturnValue(true)
		})
		getRepositorySpy = jest.fn().mockReturnValue('any_repository')
		createConnectionSpy = jest.fn().mockResolvedValue({
			createQueryRunner: createQueryRunnerSpy
		})
		closeSpy = jest.fn()
		mocked(createConnection).mockImplementation(createConnectionSpy)
		getConnectionSpy = jest.fn().mockReturnValue({
			close: closeSpy
		})
		mocked(getConnectionManager).mockImplementation(getConnectionManagerSpy)
		mocked(getConnection).mockImplementation(getConnectionSpy)
		mocked(getRepository).mockImplementation(getRepositorySpy)
	})

	beforeEach(() => {
		sut = PostgresConnection.getInstance()
	})

	test('should have only one instance', () => {
		const sut2 = PostgresConnection.getInstance()
		
		expect(sut).toBe(sut2)
	})

	test('should create a new connection', async () => {
		getConnectionManagerSpy.mockReturnValue({ has: jest.fn().mockReturnValue(false) })
		await sut.connect()

		expect(createConnectionSpy).toHaveBeenCalledWith()
		expect(createConnectionSpy).toHaveBeenCalledTimes(1)
	})

	test('should use an existing connection', async () => {
		await sut.disconnect()
		await sut.connect()

		expect(getConnectionSpy).toHaveBeenCalledWith()
		expect(getConnectionSpy).toHaveBeenCalledTimes(1)
	})

	test('should close connection', async () => {
		await sut.connect()
		await sut.disconnect()

		expect(closeSpy).toHaveBeenCalledWith()
		expect(closeSpy).toHaveBeenCalledTimes(1)
	})

	test('should return ConnectionNotFoundError on disconnect if connection is not found', async () => {
		const promise = sut.disconnect()

		expect(closeSpy).not.toHaveBeenCalled()
		await expect(promise).rejects.toThrow(new ConnectionNotFoundError())
	})

	test('should get repository', async () => {
		await sut.connect()
		const repository = sut.getRepository(PostEntity)

		expect(getRepositorySpy).toHaveBeenCalledWith(PostEntity)
		expect(getRepositorySpy).toHaveBeenCalledTimes(1)
		expect(repository).toBe('any_repository')
		await sut.disconnect()
	})

	test('should return ConnectionNotFoundError on getRepository if connection is not found', async () => {
		expect(getRepositorySpy).not.toHaveBeenCalled()
		expect(() => sut.getRepository(PostEntity)).toThrow(new ConnectionNotFoundError())
	})
})