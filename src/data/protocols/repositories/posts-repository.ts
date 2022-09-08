import { PostTypes } from '@domain/models'
import { PostEntity } from '@infra/database/entities'

export interface LoadPostsRepository {
  load(input: LoadPostsRepository.Input): Promise<LoadPostsRepository.Output>
}

export namespace LoadPostsRepository {
  export type Input = { page: number, user_id?: number, initial_date?: string, final_date?: string, limit?: number }

  export type Output = { results: PostEntity[] }
}

export interface LoadPostByIdRepository {
  loadById(input: LoadPostByIdRepository.Input): Promise<LoadPostByIdRepository.Output>
}

export namespace LoadPostByIdRepository {
  export type Input = { post_id: number }

  export type Output = { post: PostEntity | undefined }
}

export interface CreatePostRepository {
  create(input: CreatePostRepository.Input): Promise<CreatePostRepository.Output>
}

export namespace CreatePostRepository {
  export type Input = {
    user_id: number
    description: string
    type: PostTypes
  }

  export type Output = {
    post: PostEntity
  }
}