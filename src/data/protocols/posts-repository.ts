import { PostModel } from '@domain/models'

export interface LoadAllPostsRepository {
  loadAll(input: LoadAllPostsRepository.Input): Promise<LoadAllPostsRepository.Output>
}

export namespace LoadAllPostsRepository {
  export type Input = { page: number, userId?: number }

  export type Output = { results: PostModel[] }
}
