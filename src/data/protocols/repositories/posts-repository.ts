import { PostModel } from '@domain/models'

export interface LoadAllPostsRepository {
  loadAll(input: LoadAllPostsRepository.Input): Promise<LoadAllPostsRepository.Output>
}

export namespace LoadAllPostsRepository {
  export type Input = { page: number, user_id?: number, initial_date?: string, final_date?: string }

  export type Output = { results: PostModel[] }
}
