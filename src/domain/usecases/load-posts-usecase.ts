import { PostModel } from '@domain/models'

export interface LoadPostsUseCase {
  execute(input: LoadPostsUseCase.Input): Promise<LoadPostsUseCase.Output>
}

export namespace LoadPostsUseCase {
  export type Input = {
    page: number
    userId?: number
  }

  export type Output = {
    currentPage: number
    results: PostModel[]
  }
}