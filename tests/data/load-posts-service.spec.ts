import { mock, MockProxy } from 'jest-mock-extended'

import { PostModel } from '@domain/models'
import { LoadPostsUseCase } from '@domain/usecases'

export interface LoadAllPostsRepository {
  loadAll(input: LoadAllPostsRepository.Input): Promise<LoadAllPostsRepository.Output>
}

export namespace LoadAllPostsRepository {
  export type Input = { page: number }

  export type Output = { results: PostModel[] }
}

export class LoadPostsService implements LoadPostsUseCase {
	constructor(private readonly postsRepository: LoadAllPostsRepository){}

	async execute(input: LoadPostsUseCase.Input): Promise<LoadPostsUseCase.Output> {
		const { results } = await this.postsRepository.loadAll({ page: input.page })
		return {
			currentPage: input.page,
			results
		}
	}
}

describe('Load Posts Service', () => {
	let mockedPost: PostModel
	let postsRepository: MockProxy<LoadAllPostsRepository>
	let sut: LoadPostsService

	beforeAll(() => {
		postsRepository = mock()
		mockedPost = { 
			id: 1, 
			description: 'any_description', 
			created_at: '2022-09-06T02:07:12.642Z', 
			updated_at: '2022-09-06T02:07:39.695Z'
		}
		postsRepository.loadAll.mockResolvedValue({ results: [mockedPost] })
	})

	beforeEach(() => {
		sut = new LoadPostsService(postsRepository)
	})

	test('should call LoadAllPostsRepository with correct input', async () => {
		await sut.execute({ page: 1 })

		expect(postsRepository.loadAll).toHaveBeenCalledWith({ page: 1 })
		expect(postsRepository.loadAll).toHaveBeenCalledTimes(1)
	})

	test('should return correct results on success', async () => {
		const response = await sut.execute({ page: 1 })

		expect(response).toMatchObject({
			results: [mockedPost],
			currentPage: 1
		})
	})
})