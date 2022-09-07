import { PostModel, PostTypes } from '@domain/models'

export interface CreatePostsUseCase {
  execute(input: CreatePostsUseCase.Input): Promise<CreatePostsUseCase.Output>
}

export namespace CreatePostsUseCase {
  export type Input = {
    user_id: number
    post_id?: number
    post?: {
      description: string
      type: PostTypes
    }
  }

  export type Output = {
    post: PostModel
  }
}