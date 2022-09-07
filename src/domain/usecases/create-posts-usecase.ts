import { PostModel } from '@domain/models'

export interface CreatePostsUseCase {
  execute(input: CreatePostsUseCase.Input): Promise<CreatePostsUseCase.Output>
}

export namespace CreatePostsUseCase {
  export type Input = {
    user_id: number
    post_id?: number
    post?: {
      description: string
    }
  }

  export type Output = {
    post: PostModel | undefined 
  }
}