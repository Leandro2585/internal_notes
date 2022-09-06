import { PostModel } from '@domain/models'

export interface LoadPostsUseCase {
  execute(input: LoadPostsUseCase.Input): Promise<LoadPostsUseCase.Output>
}

export namespace LoadPostsUseCase {
  export type Input = {
    page: number
    me: boolean
  }

  export type Output = {
    posts: PostModel[]
  }
}