import { PostModel } from '@domain/models'

export interface LoadPostsUseCase {
  execute(input: LoadPostsUseCase.Input): Promise<LoadPostsUseCase.Output>
}

export namespace LoadPostsUseCase {
  export type Input = {
    page: number
    user_id?: number
  }

  export type Output = {
    current_page: number
    results: PostModel[]
  }
}