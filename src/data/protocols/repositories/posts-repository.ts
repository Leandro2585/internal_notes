import { PostEntity } from '@infra/database/entities'

export interface LoadPostsRepository {
  load(input: LoadPostsRepository.Input): Promise<LoadPostsRepository.Output>
}

export namespace LoadPostsRepository {
  export type Input = { page: number, user_id?: number, initial_date?: string, final_date?: string }

  export type Output = { results: PostEntity[] }
}
